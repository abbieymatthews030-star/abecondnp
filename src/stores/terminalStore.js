import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useTerminalStore = create(
  persist(
    (set) => ({
      history: [],
      output: [],
      currentCommand: '',
      historyIndex: -1,
      
      addCommand: (command) =>
        set((state) => ({
          history: [...state.history, command],
          historyIndex: -1,
        })),
      
      addOutput: (line) =>
        set((state) => ({
          output: [...state.output, line],
        })),
      
      clearOutput: () => set({ output: [] }),
      
      setCurrentCommand: (cmd) => set({ currentCommand: cmd }),
      
      navigateHistory: (direction) =>
        set((state) => {
          let newIndex = state.historyIndex + direction
          if (newIndex < -1) newIndex = -1
          if (newIndex >= state.history.length) newIndex = state.history.length - 1
          
          const command =
            newIndex === -1 ? '' : state.history[newIndex]
          return {
            historyIndex: newIndex,
            currentCommand: command,
          }
        }),
    }),
    {
      name: 'terminal-storage',
    }
  )
)