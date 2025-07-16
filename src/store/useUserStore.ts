// store/useUserStore.ts
import { create } from 'zustand'

export interface Usuario {
  id: number
  nome: string
  email: string
  telefone: string // obrigatório
  avatar_url: string
  papel: string
}

interface UserStore {
  user: Usuario | null
  setUser: (user: Usuario) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
