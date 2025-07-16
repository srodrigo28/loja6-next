// lib/autoLogin.ts

import { supabase } from '@/lib/supabaseClient'
import { useUserStore } from '@/store/useUserStore'

export async function carregarSessaoUsuario() {
  const { data: sessionData, error: sessionError } = await supabase.auth.getUser()

  if (sessionError || !sessionData?.user) {
    console.warn("Nenhum usuário logado.")
    return
  }

  const { user } = sessionData

  const { data: usuarioDB, error: errorPerfil } = await supabase
    .from('usuarios')
    .select('nome, telefone, email, avatar_url, papel')
    .eq('user_id', user.id)
    .single()

  if (errorPerfil || !usuarioDB) {
    console.error("Erro ao buscar dados do usuário:", errorPerfil)
    return
  }

  // Atribui ao Zustand
  const setUser = useUserStore.getState().setUser
  setUser(usuarioDB)
}