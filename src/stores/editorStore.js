import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useEditorStore = create(
  persist(
    (set) => ({
      files: {},
      activeFileId: null,
      openTabs: [],
      unsavedFiles: new Set(),
      
      createFile: (id, name, language = 'plaintext', content = '') =>
        set((state) => ({
          files: {
            ...state.files,
            [id]: {
              id,
              name,
              language,
              content,
              created: new Date(),
            },
          },
        })),
      
      updateFile: (id, content) =>
        set((state) => {
          const newFiles = { ...state.files }
          if (newFiles[id]) {
            newFiles[id].content = content
          }
          return { files: newFiles }
        }),
      
      openTab: (id) =>
        set((state) => ({
          activeFileId: id,
          openTabs: state.openTabs.includes(id)
            ? state.openTabs
            : [...state.openTabs, id],
        })),
      
      closeTab: (id) =>
        set((state) => {
          const newTabs = state.openTabs.filter((tab) => tab !== id)
          return {
            openTabs: newTabs,
            activeFileId:
              state.activeFileId === id
                ? newTabs[newTabs.length - 1] || null
                : state.activeFileId,
          }
        }),
      
      deleteFile: (id) =>
        set((state) => {
          const { [id]: _, ...rest } = state.files
          return {
            files: rest,
            openTabs: state.openTabs.filter((tab) => tab !== id),
            activeFileId: state.activeFileId === id ? null : state.activeFileId,
          }
        }),
    }),
    {
      name: 'editor-storage',
    }
  )
)