'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface HeaderProps {
  nome: string
  avatar_url?: string | null
  papel?: string | null
  onLogout: () => void
}

export default function Header({ nome, avatar_url, papel, onLogout }: HeaderProps) {
  const router = useRouter()

  const podeVerPainelAdmin = papel === 'admin' || papel === 'superadmin'

  return (
    <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold text-slate-700">Painel do Usuário</h1>
      <div className="flex items-center gap-4">
        {podeVerPainelAdmin && (
          <button
            onClick={() => router.push('/admin')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-sm"
          >
            Admin
          </button>
        )}

        <span className="text-gray-800 font-medium hidden sm:block">{nome}</span>
        <Image
          src={avatar_url || '/default-avatar.png'}
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full border object-cover"
        />
        <button
          onClick={onLogout}
          className="ml-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
        >
          Sair
        </button>
      </div>
    </header>
  )
}
