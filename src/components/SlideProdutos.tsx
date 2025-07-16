'use client'

import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface Produto {
  id: number
  nome: string
  descricao: string
  preco: number
  imagem_principal: string
}

interface SlideProdutosProps {
  titulo: string
  produtos: Produto[]
}

export default function SlideProdutos({ titulo, produtos }: SlideProdutosProps) {
  return (
    <section className="w-full mt-10 px-6">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">{titulo}</h2>

      <div className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 scrollbar-hide">
        {produtos.map((produto, i) => (
          <motion.div
            key={produto.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="min-w-[250px] snap-start shrink-0"
          >
            <Card className="h-[360px] w-[250px] shadow-md hover:shadow-lg transition">
              <div className="relative w-full h-[200px]">
                <Image
                  src={produto.imagem_principal}
                  alt={produto.nome}
                  fill
                  className="object-cover rounded-t"
                />
              </div>
              <div className="p-4 flex flex-col justify-between h-[160px]">
                <h3 className="text-base font-semibold truncate">{produto.nome}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{produto.descricao}</p>
                <p className="mt-2 text-blue-600 font-bold text-sm">
                  R$ {produto.preco.toFixed(2)}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
