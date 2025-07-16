import { create } from 'zustand'

interface Usuario {
  id: number
  nome: string | null
  email: string
  senha: string
  created_at: string | null
  user_id: string | null
  papel: string
  empresa_ref: number | null
  telefone: string | null
  avatar_url: string
}

interface AuthState {
  usuario: Usuario | null
  setUsuario: (user: Usuario) => void
  limparUsuario: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,
  setUsuario: (user) => set({ usuario: user }),
  limparUsuario: () => set({ usuario: null })
}))
