'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, User, Phone, Mail } from 'lucide-react'

export default function AgendarPage() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    servico: '',
    data: '',
    horario: '',
    mensagem: ''
  })

  const [submitted, setSubmitted] = useState(false)

  const servicos = [
    'Fio a Fio Premium',
    'Volume Clássico',
    'Mega Volume',
    'Nanoblading Fio a Fio',
    'Shadow Brows',
    'Brow Lamination',
    'Limpeza Profunda',
    'Dermaplaning',
    'Lash Lifting',
  ]

  const horarios = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00'
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Montar mensagem WhatsApp
    const mensagemWhatsApp = `Olá! Gostaria de agendar um serviço:

*Nome:* ${formData.nome}
*Telefone:* ${formData.telefone}
*Email:* ${formData.email}
*Serviço:* ${formData.servico}
*Data:* ${formData.data}
*Horário:* ${formData.horario}
*Mensagem:* ${formData.mensagem}

Obrigado!`

    // Abrir WhatsApp com a mensagem
    const urlWhatsApp = `https://wa.me/5562991504409?text=${encodeURIComponent(mensagemWhatsApp)}`
    window.open(urlWhatsApp, '_blank')
    
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ nome: '', telefone: '', email: '', servico: '', data: '', horario: '', mensagem: '' })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-900">Kéren Arantes</Link>
          <div className="flex gap-4">
            <Link href="/servicos" className="text-orange-500 font-medium">Serviços</Link>
            <Link href="/dashboard" className="text-orange-500 font-medium">Admin</Link>
          </div>
        </div>
      </header>

      <section className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Agende seu Atendimento</h1>
          <p className="text-xl text-gray-600">Escolha o serviço e o melhor horário para você</p>
        </div>

        {submitted && (
          <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg">
            <p className="text-green-800 font-semibold">✓ Redirecionado para WhatsApp! Confirme seu agendamento.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          {/* Nome */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <User size={16} className="inline mr-2" />
              Seu Nome
            </label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Maria Silva"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          {/* Telefone */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <Phone size={16} className="inline mr-2" />
              Seu Telefone/WhatsApp
            </label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(62) 99999-9999"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <Mail size={16} className="inline mr-2" />
              Seu Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Serviço */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Escolha o Serviço *
            </label>
            <select
              name="servico"
              value={formData.servico}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">-- Selecione um serviço --</option>
              {servicos.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          {/* Data */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <Calendar size={16} className="inline mr-2" />
              Data Preferida *
            </label>
            <input
              type="date"
              name="data"
              value={formData.data}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
            <p className="text-xs text-gray-500 mt-1">Seg-Sab, 09:00 às 18:30</p>
          </div>

          {/* Horário */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              <Clock size={16} className="inline mr-2" />
              Horário Preferido *
            </label>
            <select
              name="horario"
              value={formData.horario}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            >
              <option value="">-- Selecione um horário --</option>
              {horarios.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </div>

          {/* Mensagem */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Alguma Observação?
            </label>
            <textarea
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              placeholder="Ex: Primeira vez, alergia a algo específico, etc."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg hover:from-orange-600 hover:to-pink-600 font-bold text-lg transition-all"
          >
            Agendar via WhatsApp →
          </button>

          <p className="text-center text-sm text-gray-600">
            Você será redirecionado para WhatsApp para confirmar o agendamento
          </p>
        </form>

        {/* Info Box */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 text-center">
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <h4 className="font-bold mb-2">Horário</h4>
            <p className="text-sm text-gray-600">Seg-Sab<br />09:00 - 18:30</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <Phone className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <h4 className="font-bold mb-2">Contato</h4>
            <a href="https://wa.me/5562991504409" className="text-sm text-orange-500 font-semibold">(62) 99150-4409</a>
          </div>
          <div className="bg-white rounded-xl p-6 text-center">
            <User className="w-8 h-8 text-orange-500 mx-auto mb-3" />
            <h4 className="font-bold mb-2">Profissional</h4>
            <p className="text-sm text-gray-600">Kéren Arantes</p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-8 mt-20">
        <p className="text-center text-gray-400">&copy; 2024 Kéren Arantes Beauty</p>
      </footer>
    </div>
  )
}
