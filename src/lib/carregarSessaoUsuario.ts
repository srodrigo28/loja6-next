// lib/carregarSessaoUsuario.ts

'use client'

import { supabase } from './supabaseClient'
import { useUserStore } from '@/store/useUserStore'

export async function carregarSessaoUsuario() {
  try {
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) return

    const { data: usuarioDB, error: errorPerfil } = await supabase
      .from('usuarios')
      .select('id, nome, email, telefone, avatar_url, papel')
      .eq('user_id', data.user.id)
      .single()

    if (usuarioDB && !errorPerfil) {
      const setUser = useUserStore.getState().setUser
      setUser(usuarioDB)
    }
  } catch (err) {
    console.error('Erro ao carregar sessão:', err)
  }
}
