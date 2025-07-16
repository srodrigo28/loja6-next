// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { useUserStore } from '@/store/useUserStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  const router = useRouter()
  const setUser = useUserStore((state) => state.setUser)

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')

  const handleLogin = async () => {
    setErro('')

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    })

    if (error || !data.user) {
      setErro('Credenciais inválidas.')
      return
    }

    const { data: usuarioData, error: errorPerfil } = await supabase
      .from('usuarios')
      .select('id, nome, email, telefone, avatar_url, papel')
      .eq('user_id', data.user.id)
      .single()

    if (errorPerfil || !usuarioData) {
      setErro('Erro ao carregar dados do perfil.')
      return
    }

    // Armazenar no Zustand (agora com telefone incluso)
    setUser({
      id: usuarioData.id,
      nome: usuarioData.nome,
      email: usuarioData.email,
      telefone: usuarioData.telefone || '',
      avatar_url: usuarioData.avatar_url,
      papel: usuarioData.papel,
    })

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-md w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h1>

        {erro && <p className="text-red-600 text-sm mb-4 text-center">{erro}</p>}

        <Input
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
        <Input
          placeholder="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="mb-6"
        />

        <Button className="w-full" onClick={handleLogin}>
          Entrar
        </Button>
      </div>
    </div>
  )
}
