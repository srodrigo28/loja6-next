'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useAuthStore } from '@/store/useAuthStore'

interface Produto {
  id: number
  nome: string
  descricao: string
  preco: number
  imagem_principal: string
}

export default function HomePage() {
  const { usuario } = useAuthStore()
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [busca, setBusca] = useState('')
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)

  useEffect(() => {
    async function carregarProdutos() {
      const { data, error } = await supabase
        .from('produtos')
        .select('id, nome, descricao, preco, imagem_principal')
        .eq('ativo', true)
        .order('created_at', { ascending: false })

      if (!error) setProdutos(data || [])
    }

    carregarProdutos()
  }, [])

  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground font-sans">
      {/* Header fixo */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-blue-600">
            Minha<span className="text-gray-800">Loja</span>
          </div>

          <Input
            placeholder="Buscar produtos..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
            className="w-full max-w-md mx-4"
          />

          <div className="flex gap-2">
            <Link href="/login">
              {usuario ? (
                <div className="flex items-center gap-4">
                  <Link href="/dashboard">
                    <Button variant="outline">Dashboard</Button>
                  </Link>
                  <Image
                    src={usuario.avatar_url}
                    alt={usuario.nome ?? ''}
                    className="w-10 h-10 rounded-full border"
                  />
                </div>
              ) : (
                <div className="flex gap-2">
                  <Link href="/login">
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link href="/cadastro">
                    <Button>Cadastrar</Button>
                  </Link>
                </div>
              )}
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-6 py-10 mt-10">
        {/* <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">🛍️ Produtos em Destaque</h1> */}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {produtosFiltrados.map((produto, i) => (
            <motion.div
              key={produto.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03, rotate: 0.2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setProdutoSelecionado(produto)}
            >
              <Card
                className="group overflow-hidden flex flex-col h-[460px] 
                bg-white shadow-md hover:shadow-2xl w-80
                transition duration-300 ease-in-out cursor-pointer border border-transparent 
                hover:border-blue-500"
              >
                <div className="relative h-[368px] overflow-hidden">
                  <Image
                    src={produto.imagem_principal}
                    alt={produto.nome}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="h-[92px] px-4 flex items-center justify-center border-t bg-white">
                  <h2 className="text-base font-semibold text-center text-gray-800 truncate">
                    {produto.nome}
                  </h2>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>


        <AnimatePresence>
          {produtoSelecionado && (
            <motion.div
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProdutoSelecionado(null)}
            >
              <motion.div
                className="bg-white max-w-2xl w-full rounded-xl overflow-hidden shadow-lg relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                onClick={e => e.stopPropagation()}
              >
                <div className="relative w-full h-[400px]">
                  <Image
                    src={produtoSelecionado.imagem_principal}
                    alt={produtoSelecionado.nome}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{produtoSelecionado.nome}</h2>
                  <p className="text-gray-700 mb-4">{produtoSelecionado.descricao}</p>
                  <p className="text-blue-600 font-bold text-lg">R$ {produtoSelecionado.preco.toFixed(2)}</p>
                  <Button className="mt-6" onClick={() => setProdutoSelecionado(null)}>
                    Fechar
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      <footer className="bg-white border-t mt-12 text-gray-600 text-sm py-6">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-6">
          <div>
            <h3 className="font-bold text-blue-600 mb-2">MinhaLoja</h3>
            <p>© {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Contato</h4>
            <p>Email: contato@minhaloja.com</p>
            <p>WhatsApp: (69) 99999-9999</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Links úteis</h4>
            <div className='flex flex-col'>
              <Link href="/next-v8.html" className="text-blue-600 hover:underline">
              📄 NextJS Typescript
              </Link>
              <Link href="/doc.html" className="text-blue-600 hover:underline">
              📄 Supabase Banco
              </Link>
              <Link href="/angular.html" className="text-blue-600 hover:underline">
              📄 Angular +17
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
