'use client'

import { carregarSessaoUsuario } from '@/lib/autoLogin'
import { useEffect } from 'react'

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    carregarSessaoUsuario()
  }, [])

  return <>{children}</>
}
