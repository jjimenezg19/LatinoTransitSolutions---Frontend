import { create } from "zustand"

export const useSystemStore = create((set) => ({
  currentUser: {},
  setCurrentUser: (currentUser) => set({ currentUser })
}))
