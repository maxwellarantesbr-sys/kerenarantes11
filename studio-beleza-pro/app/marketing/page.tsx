'use client'

import { useState } from 'react'
import { Plus, Edit2, Trash2, Copy, Gift, MessageSquare } from 'lucide-react'

export default function MarketingPage() {
  const [tab, setTab] = useState<'cupons' | 'fidelidade' | 'automacoes'>('cupons')

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Marketing</h1>
        <p className="text-dark-600">Gerencie campanhas, cupons, fidelidade e automações</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dark-200">
        {['cupons', 'fidelidade', 'automacoes'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t as any)}
            className={`px-6 py-3 font-medium border-b-2 transition-colors ${
              tab === t
                ? 'border-accent-500 text-accent-500'
                : 'border-transparent text-dark-600 hover:text-dark-900'
            }`}
          >
            {t === 'cupons' ? '🎟️ Cupons' : t === 'fidelidade' ? '💎 Fidelidade' : '🤖 Automações'}
          </button>
        ))}
      </div>

      {/* Cupons */}
      {tab === 'cupons' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg font-medium hover:bg-accent-600">
              <Plus size={18} />
              Novo Cupom
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                codigo: 'PROMO10',
                tipo: 'Percentual',
                valor: '10%',
                validade: '30/06/2024',
                usos: '45/100',
                status: 'ativo',
              },
              {
                codigo: 'DESCONTO50',
                tipo: 'Valor Fixo',
                valor: 'R$ 50',
                validade: '15/06/2024',
                usos: '18/50',
                status: 'ativo',
              },
            ].map((cupom, idx) => (
              <div key={idx} className="card border-2 border-accent-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-lg font-bold text-dark-900">{cupom.codigo}</h4>
                    <p className="text-sm text-dark-600">{cupom.tipo}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                    {cupom.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-dark-600">Desconto</p>
                    <p className="text-lg font-bold text-accent-500">{cupom.valor}</p>
                  </div>
                  <div>
                    <p className="text-xs text-dark-600">Válido até</p>
                    <p className="text-lg font-bold text-dark-900">{cupom.validade}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-dark-600 mb-2">Usos</p>
                  <div className="w-full bg-dark-200 rounded-full h-2">
                    <div
                      className="bg-accent-500 h-2 rounded-full"
                      style={{ width: `${(45 / 100) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-dark-600 mt-1">{cupom.usos}</p>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-accent-500 text-accent-500 rounded-lg hover:bg-accent-50 transition-colors">
                    <Copy size={16} />
                    Copiar
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-dark-300 text-dark-600 rounded-lg hover:bg-dark-50 transition-colors">
                    <Edit2 size={16} />
                    Editar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fidelidade */}
      {tab === 'fidelidade' && (
        <div className="space-y-6">
          <div className="flex justify-end">
            <button className="flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg font-medium hover:bg-accent-600">
              <Plus size={18} />
              Nova Premiação
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <Gift size={24} className="text-yellow-500" />
                <span className="text-2xl font-bold text-dark-900">500</span>
              </div>
              <p className="text-sm text-dark-700 mb-2">Pontos para Desconto 10%</p>
              <p className="text-xs text-dark-600">234 clientes resgatados</p>
            </div>

            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <Gift size={24} className="text-purple-500" />
                <span className="text-2xl font-bold text-dark-900">1000</span>
              </div>
              <p className="text-sm text-dark-700 mb-2">Pontos para Desconto 20%</p>
              <p className="text-xs text-dark-600">89 clientes resgatados</p>
            </div>

            <div className="card">
              <div className="flex items-start justify-between mb-4">
                <Gift size={24} className="text-pink-500" />
                <span className="text-2xl font-bold text-dark-900">2000</span>
              </div>
              <p className="text-sm text-dark-700 mb-2">Serviço Grátis</p>
              <p className="text-xs text-dark-600">12 clientes resgatados</p>
            </div>
          </div>
        </div>
      )}

      {/* Automações */}
      {tab === 'automacoes' && (
        <div className="space-y-6">
          <div className="space-y-4">
            {[
              {
                nome: 'Confirmação de Agendamento',
                descricao: 'Enviado imediatamente após agendar',
                canal: 'SMS + WhatsApp',
                status: 'ativo',
              },
              {
                nome: 'Lembrete 24h Antes',
                descricao: 'Enviado 24 horas antes do agendamento',
                canal: 'SMS + WhatsApp',
                status: 'ativo',
              },
              {
                nome: 'Lembrete 2h Antes',
                descricao: 'Enviado 2 horas antes do atendimento',
                canal: 'SMS + WhatsApp',
                status: 'inativo',
              },
              {
                nome: 'Mensagem Pós Atendimento',
                descricao: 'Enviada 1 hora após término do atendimento',
                canal: 'SMS + WhatsApp',
                status: 'ativo',
              },
              {
                nome: 'Mensagem de Aniversário',
                descricao: 'Enviada no dia do aniversário do cliente',
                canal: 'WhatsApp + Email',
                status: 'ativo',
              },
            ].map((auto, idx) => (
              <div key={idx} className="card border-l-4 border-accent-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-dark-900 mb-1">{auto.nome}</h4>
                    <p className="text-sm text-dark-600 mb-2">{auto.descricao}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                        {auto.canal}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded font-semibold ${
                          auto.status === 'ativo'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-dark-200 text-dark-700'
                        }`}
                      >
                        {auto.status}
                      </span>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-dark-100 rounded-lg transition-colors">
                    <Edit2 size={20} className="text-dark-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
