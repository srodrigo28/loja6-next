'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabaseClient'
import { Loader2 } from 'lucide-react'
import { useUserStore } from '@/store/useUserStore'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [loading, setLoading] = useState(false)

  const setUser = useUserStore(state => state.setUser)
  const router = useRouter()

  async function handleLogin() {
    setErro('')
    setLoading(true)

    const { data: authUser, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password: senha
    })

    if (authError || !authUser.user) {
      setErro('Email ou senha inválidos.')
      setLoading(false)
      return
    }

    // Buscar dados do perfil personalizado
    const { data: usuarioData, error: usuarioError } = await supabase
      .from('usuarios')
      .select('*')
      .eq('user_id', authUser.user.id)
      .single()

    if (usuarioError || !usuarioData) {
      setErro('Usuário não encontrado.')
      setLoading(false)
      return
    }

    // Armazenar no Zustand
    setUser({
      id: usuarioData.id,
      nome: usuarioData.nome,
      email: usuarioData.email,
      papel: usuarioData.papel,
      avatar_url: usuarioData.avatar_url
    })

    setLoading(false)
    router.push('/dashboard')
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h1>

        <div className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />

          {erro && <p className="text-sm text-red-500">{erro}</p>}

          <Button onClick={handleLogin} className="w-full" disabled={loading}>
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Entrar'}
          </Button>
        </div>

        <p className="text-center text-sm mt-4">
          Ainda não tem uma conta? <a href="/cadastro" className="text-blue-600 hover:underline">Cadastre-se</a>
        </p>
      </div>
    </main>
  )
}
