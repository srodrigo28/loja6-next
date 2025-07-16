'use client'

import { FC, useCallback, useState } from 'react'
import Image from 'next/image'
import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Produto } from '@/types'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

type Props = {
  titulo?: string
  produtos: Produto[]
}

const options: EmblaOptionsType = {
  loop: true,
  align: 'start',
  dragFree: true
}

const SlideProdutos: FC<Props> = ({ titulo, produtos }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ delay: 3500, stopOnInteraction: false })])
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null)

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  if (!produtos || produtos.length === 0) return null

  return (
    <section className="mt-16 relative">
      {titulo && <h2 className="text-2xl font-bold mb-4 text-blue-700">{titulo}</h2>}

      {/* Carrossel */}
      <div className="overflow-hidden relative" ref={emblaRef}>
        <div className="flex gap-3">
          {produtos.map((produto) => (
            <div
              key={produto.id}
              onClick={() => setProdutoSelecionado(produto)}
              className="min-w-[120px] max-w-[120px] cursor-pointer rounded-lg overflow-hidden shadow hover:shadow-lg transition-all"
            >
              <div className="relative h-24 w-full">
                <Image
                  src={produto.imagem_principal}
                  alt={produto.nome}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Botões de navegação sobrepostos ao carrossel */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 z-20">
          <Button variant="ghost" size="icon" onClick={scrollPrev} className="bg-white/80">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-0 z-20">
          <Button variant="ghost" size="icon" onClick={scrollNext} className="bg-white/80">
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Modal do produto */}
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
              className="bg-white max-w-md w-full rounded-xl overflow-hidden shadow-lg relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={e => e.stopPropagation()}
            >
              <div className="relative w-full h-64">
                <Image
                  src={produtoSelecionado.imagem_principal}
                  alt={produtoSelecionado.nome}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">{produtoSelecionado.nome}</h2>
                <p className="text-gray-700 mb-4">{produtoSelecionado.descricao}</p>
                <p className="text-blue-600 font-bold text-lg">R$ {produtoSelecionado.preco.toFixed(2)}</p>
                <Button className="mt-4" onClick={() => setProdutoSelecionado(null)}>
                  Fechar
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default SlideProdutos
