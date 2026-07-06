import { create } from 'zustand'

export const useFileStore = create((set) => ({
  directoryStructure: {},
  selectedFile: null,
  
  createDirectory: (path, name) =>
    set((state) => ({
      directoryStructure: {
        ...state.directoryStructure,
        [path + '/' + name]: { type: 'directory', children: [] },
      },
    })),
  
  addFile: (path, fileName, content) =>
    set((state) => ({
      directoryStructure: {
        ...state.directoryStructure,
        [path + '/' + fileName]: { type: 'file', content },
      },
    })),
  
  selectFile: (filePath) => set({ selectedFile: filePath }),
}))