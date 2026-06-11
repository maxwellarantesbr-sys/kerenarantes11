'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Eye, Zap, Sparkles } from 'lucide-react'

const servicos = [
  {
    titulo: 'Extensão de Cílios',
    cor: 'orange',
    tecnicas: [
      { nome: 'Fio a Fio Premium', descricao: 'Aplicação individual de fios', preco: 'R$ 150,00', duracao: '1.5h' },
      { nome: 'Volume Clássico', descricao: 'Múltiplos fios por cílio', preco: 'R$ 120,00', duracao: '1h' },
      { nome: 'Mega Volume', descricao: 'Grande volume com múltiplos fios', preco: 'R$ 200,00', duracao: '1.5h' },
      { nome: 'Hybrid', descricao: 'Mistura de fio a fio com volume', preco: 'R$ 180,00', duracao: '1.5h' },
      { nome: 'Manutenção', descricao: 'Retoque de extensões', preco: 'R$ 80,00', duracao: '45min' }
    ]
  },
  {
    titulo: 'Design de Sobrancelhas',
    cor: 'pink',
    tecnicas: [
      { nome: 'Nanoblading Fio a Fio', descricao: 'Técnica semi-permanente', preco: 'R$ 300,00', duracao: '2h' },
      { nome: 'Shadow Brows', descricao: 'Efeito sombreado definido', preco: 'R$ 280,00', duracao: '1.5h' },
      { nome: 'Brow Lamination', descricao: 'Relaxamento e fixação', preco: 'R$ 100,00', duracao: '1h' },
      { nome: 'Design Premium', descricao: 'Design personalizado', preco: 'R$ 250,00', duracao: '1.5h' },
      { nome: 'Henna', descricao: 'Tingimento natural', preco: 'R$ 80,00', duracao: '45min' }
    ]
  },
  {
    titulo: 'Limpeza de Pele',
    cor: 'purple',
    tecnicas: [
      { nome: 'Limpeza Profunda', descricao: 'Limpeza com extração', preco: 'R$ 120,00', duracao: '1h' },
      { nome: 'Dermaplaning', descricao: 'Renovação celular', preco: 'R$ 150,00', duracao: '1h' },
      { nome: 'Lash Lifting', descricao: 'Permanente dos cílios', preco: 'R$ 100,00', duracao: '1h' },
      { nome: 'Peeling Químico', descricao: 'Tratamento com ácidos', preco: 'R$ 180,00', duracao: '1h' }
    ]
  }
]

export default function ServicosPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-orange-500"><ArrowLeft size={24} /></Link>
            <h1 className="text-2xl font-bold">Serviços</h1>
          </div>
          <Link href="/agendar" className="px-4 py-2 bg-orange-500 text-white rounded-lg font-medium">Agendar</Link>
        </div>
      </header>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h2>
          <p className="text-xl text-gray-600">Especializados em cílios, sobrancelhas e limpeza de pele</p>
        </div>

        {servicos.map((servico, idx) => {
          const corMap = {
            orange: { bg: 'bg-orange-50', btn: 'bg-orange-500 hover:bg-orange-600' },
            pink: { bg: 'bg-pink-50', btn: 'bg-pink-500 hover:bg-pink-600' },
            purple: { bg: 'bg-purple-50', btn: 'bg-purple-500 hover:bg-purple-600' }
          }
          const cores = corMap[servico.cor as keyof typeof corMap]

          return (
            <div key={idx} className={`${cores.bg} rounded-2xl p-12 mb-12`}>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">{servico.titulo}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {servico.tecnicas.map((tecnica, tidx) => (
                  <div key={tidx} className="bg-white rounded-xl p-6">
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{tecnica.nome}</h4>
                    <p className="text-gray-600 text-sm mb-4">{tecnica.descricao}</p>
                    <div className="flex justify-between mb-4">
                      <span className="text-2xl font-bold">{tecnica.preco}</span>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">{tecnica.duracao}</span>
                    </div>
                    <Link href={`/agendar?servico=${encodeURIComponent(tecnica.nome)}`} className={`w-full py-2 text-white rounded font-medium text-center block ${cores.btn}`}>Agendar</Link>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </section>

      <footer className="bg-gray-900 text-white py-12 text-center">
        <p className="text-gray-400">&copy; 2024 Kéren Arantes Beauty</p>
      </footer>
    </div>
  )
}
