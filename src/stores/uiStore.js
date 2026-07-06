import { create } from 'zustand'

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  terminalOpen: true,
  activeView: 'explorer', // explorer, search, scm, run, extensions
  theme: 'dark',
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  toggleTerminal: () => set((state) => ({ terminalOpen: !state.terminalOpen })),
  setActiveView: (view) => set({ activeView: view }),
  setTheme: (theme) => set({ theme }),
}))