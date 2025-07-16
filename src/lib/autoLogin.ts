import { supabase } from '@/lib/supabaseClient'
import { useUserStore } from '@/store/useUserStore'

export async function carregarSessaoUsuario() {
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) return

  const { data: usuarioDB, error: erroPerfil } = await supabase
    .from('usuarios')
    .select('id, nome, telefone, email, avatar_url, papel')
    .eq('user_id', data.user.id)
    .single()

  if (erroPerfil || !usuarioDB) return

  // Atribui ao Zustand com todos os campos obrigatórios
  const setUser = useUserStore.getState().setUser
  setUser({
    id: usuarioDB.id,
    nome: usuarioDB.nome,
    telefone: usuarioDB.telefone,
    email: usuarioDB.email,
    avatar_url: usuarioDB.avatar_url,
    papel: usuarioDB.papel
  })
}
