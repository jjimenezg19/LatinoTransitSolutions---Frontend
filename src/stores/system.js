import { create } from "zustand"

export const useSystemStore = create((set) => ({
  isAuth: false,
  setIsAuth: (value) => set((state) => ({ isAuth: value })),
  markersList: [],
  setMarkersList: (value) => set((state) => ({ markersList: value }))
}))
