'use client'

import { useEffect } from 'react'
import { carregarSessaoUsuario } from '@/lib/autoLogin'

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    carregarSessaoUsuario()
  }, [])

  return <>{children}</>
}
