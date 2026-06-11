'use client'

import React from 'react'
import Link from 'next/link'
import { Star, MapPin, Phone, Clock, ArrowRight, Eye, Sparkles, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kéren Arantes</h1>
            <p className="text-sm text-orange-500 font-medium">Beauty & Design</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/5562991504409" target="_blank" rel="noreferrer" className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium">WhatsApp</a>
            <Link href="/agendar" className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-medium">Agendar</Link>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-b from-orange-50 to-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Sua Beleza é Nossa <span className="text-orange-500">Prioridade</span></h2>
              <p className="text-xl text-gray-600 mb-8">Extensão de cílios, design de sobrancelhas, nanoblading e muito mais. Treatments especializados com profissionais experientes.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/agendar" className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 font-semibold text-center flex items-center justify-center gap-2">Agendar Agora <ArrowRight size={20} /></Link>
                <Link href="/servicos" className="px-8 py-3 border-2 border-orange-500 text-orange-500 rounded-lg hover:bg-orange-50 font-semibold text-center">Ver Serviços</Link>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div><p className="text-3xl font-bold text-gray-900">500+</p><p className="text-gray-600">Clientes Felizes</p></div>
                <div><p className="text-3xl font-bold text-gray-900">4.9</p><p className="text-gray-600">Avaliação</p></div>
                <div><p className="text-3xl font-bold text-gray-900">10+</p><p className="text-gray-600">Serviços</p></div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-200 to-pink-200 rounded-2xl h-96 flex items-center justify-center">
              <div className="text-center">
                <Sparkles size={80} className="mx-auto text-orange-500 mb-4" />
                <p className="text-gray-700 font-semibold">Foto do Salão</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Nossos Serviços</h3>
            <p className="text-xl text-gray-600">Especializados em cílios, sobrancelhas e limpeza de pele</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl border-t-4 border-orange-500">
              <Eye size={40} className="text-orange-500 mb-4" />
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Extensão de Cílios</h4>
              <p className="text-gray-600 mb-4">Técnicas variadas: Fio a Fio, Volume, Mega Volume e Hybrid.</p>
              <Link href="/servicos" className="text-orange-500 font-semibold hover:text-orange-600">Ver mais →</Link>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl border-t-4 border-pink-500">
              <Zap size={40} className="text-pink-500 mb-4" />
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Design de Sobrancelhas</h4>
              <p className="text-gray-600 mb-4">Design personalizado com técnicas avançadas para cada rosto.</p>
              <Link href="/servicos" className="text-pink-500 font-semibold hover:text-pink-600">Ver mais →</Link>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl border-t-4 border-purple-500">
              <Sparkles size={40} className="text-purple-500 mb-4" />
              <h4 className="text-2xl font-bold text-gray-900 mb-3">Limpeza & Cuidados</h4>
              <p className="text-gray-600 mb-4">Tratamentos faciais profissionais para pele radiante.</p>
              <Link href="/servicos" className="text-purple-500 font-semibold hover:text-purple-600">Ver mais →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Clock size={32} className="text-orange-500 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">Horário</h4>
              <p className="text-gray-600 mb-2"><strong>Segunda a Sábado</strong><br />09:00 - 18:30</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <MapPin size={32} className="text-orange-500 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">Localização</h4>
              <p className="text-gray-600 mb-2"><strong>Goiânia - GO</strong><br />Brasil</p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <Phone size={32} className="text-orange-500 mb-4" />
              <h4 className="text-xl font-bold text-gray-900 mb-3">Contato</h4>
              <a href="https://wa.me/5562991504409" className="text-orange-500 font-semibold hover:text-orange-600">(62) 99150-4409</a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-orange-500 to-pink-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-white mb-6">Pronta para se sentir linda?</h3>
          <Link href="/agendar" className="px-8 py-4 bg-white text-orange-500 rounded-lg hover:bg-gray-100 font-bold text-lg inline-block">Agendar Agora</Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2024 Kéren Arantes Beauty. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
