// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { useUserStore } from '@/store/useUserStore'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const router = useRouter()

  const setUser = useUserStore((state) => state.setUser)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
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
      .select('*')
      .eq('user_id', data.user.id)
      .single()

    if (errorPerfil || !usuarioData) {
      setErro('Erro ao buscar dados do usuário.')
      return
    }

    setUser({
      id: usuarioData.id,
      nome: usuarioData.nome,
      email: usuarioData.email,
      telefone: usuarioData.telefone,
      avatar_url: usuarioData.avatar_url,
      papel: usuarioData.papel,
    })

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <Image
            src="/logo.svg"
            alt="Logo da Minha Loja"
            width={80}
            height={80}
            className="mx-auto mb-2"
          />
          <h1 className="text-2xl font-bold text-blue-600">Entrar na Minha Loja</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {erro && <p className="text-red-500 text-sm font-medium">{erro}</p>}

          <Button type="submit" className="w-full mt-2">Entrar</Button>
        </form>
      </div>
    </div>
  )
}
