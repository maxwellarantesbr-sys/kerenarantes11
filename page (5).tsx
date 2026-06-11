'use client'

import { useState } from 'react'
import { Save, Upload, Key, Lock, Shield } from 'lucide-react'

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState<'studio' | 'equipe' | 'servicos' | 'seguranca'>('studio')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Configurações</h1>
        <p className="text-dark-600">Gerencie as configurações do seu studio</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-dark-200 overflow-x-auto">
        {['studio', 'equipe', 'servicos', 'seguranca'].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t as any)}
            className={`px-6 py-3 font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeTab === t
                ? 'border-accent-500 text-accent-500'
                : 'border-transparent text-dark-600 hover:text-dark-900'
            }`}
          >
            {t === 'studio' ? '🏢 Studio' : t === 'equipe' ? '👥 Equipe' : t === 'servicos' ? '✂️ Serviços' : '🔐 Segurança'}
          </button>
        ))}
      </div>

      {/* Studio Settings */}
      {activeTab === 'studio' && (
        <div className="card space-y-6">
          <div>
            <h3 className="subsection-title">Informações do Studio</h3>

            <div className="space-y-4">
              <div>
                <label className="label">Nome do Studio</label>
                <input
                  type="text"
                  defaultValue="Studio Beleza Pro"
                  className="input-field-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">Email</label>
                  <input
                    type="email"
                    defaultValue="contato@studiobelezapro.com"
                    className="input-field-lg"
                  />
                </div>
                <div>
                  <label className="label">Telefone</label>
                  <input
                    type="tel"
                    defaultValue="(11) 98765-4321"
                    className="input-field-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="label">WhatsApp</label>
                  <input
                    type="tel"
                    defaultValue="(11) 98765-4321"
                    className="input-field-lg"
                  />
                </div>
                <div>
                  <label className="label">CNPJ</label>
                  <input
                    type="text"
                    defaultValue="12.345.678/0001-90"
                    className="input-field-lg"
                  />
                </div>
              </div>

              <div>
                <label className="label">Endereço</label>
                <input
                  type="text"
                  defaultValue="Rua das Flores, 123 - São Paulo, SP"
                  className="input-field-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="label">Cidade</label>
                  <input
                    type="text"
                    defaultValue="São Paulo"
                    className="input-field-lg"
                  />
                </div>
                <div>
                  <label className="label">Estado</label>
                  <input
                    type="text"
                    defaultValue="SP"
                    className="input-field-lg"
                  />
                </div>
                <div>
                  <label className="label">CEP</label>
                  <input
                    type="text"
                    defaultValue="01234-567"
                    className="input-field-lg"
                  />
                </div>
              </div>

              {/* Logo Upload */}
              <div>
                <label className="label">Logo do Studio</label>
                <div className="border-2 border-dashed border-dark-300 rounded-lg p-6 text-center hover:border-accent-500 transition-colors cursor-pointer">
                  <Upload size={24} className="mx-auto mb-2 text-dark-400" />
                  <p className="text-sm text-dark-600">Clique para fazer upload da logo</p>
                  <p className="text-xs text-dark-500 mt-1">PNG, JPG até 5MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-dark-200 pt-6">
            <h3 className="subsection-title">Horário de Funcionamento</h3>

            <div className="space-y-3">
              {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((dia, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-4 items-end">
                  <div>
                    <label className="label text-sm">{dia}</label>
                  </div>
                  <div>
                    <input type="time" defaultValue="09:00" className="input-field-lg" />
                  </div>
                  <div>
                    <input type="time" defaultValue={idx === 5 ? '18:00' : idx === 6 ? '09:00' : '19:00'} className="input-field-lg" />
                  </div>
                  {idx === 6 && <span className="text-sm text-dark-600">Fechado</span>}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-accent-500 text-white rounded-lg font-medium hover:bg-accent-600 transition-colors"
          >
            <Save size={18} />
            Salvar Alterações
          </button>

          {saved && (
            <div className="p-4 bg-green-100 text-green-800 rounded-lg flex items-center gap-2">
              <span>✓</span> Configurações salvas com sucesso!
            </div>
          )}
        </div>
      )}

      {/* Equipe */}
      {activeTab === 'equipe' && (
        <div className="card">
          <h3 className="subsection-title">Gerenciar Equipe</h3>
          <p className="text-dark-600 mb-6">Adicione e gerencie profissionais do seu studio</p>

          <div className="space-y-4">
            {['Felipe Silva - Barbeiro', 'André Costa - Barbeiro', 'Marcus Santos - Barbeiro'].map((prof, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-dark-200 rounded-lg">
                <div>
                  <p className="font-medium text-dark-900">{prof}</p>
                  <p className="text-xs text-dark-600">Ativo</p>
                </div>
                <button className="px-4 py-2 text-accent-500 hover:bg-accent-50 rounded-lg transition-colors">
                  Editar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Serviços */}
      {activeTab === 'servicos' && (
        <div className="card">
          <h3 className="subsection-title">Serviços Disponíveis</h3>
          <p className="text-dark-600 mb-6">Configure os serviços oferecidos pelo seu studio</p>

          <div className="space-y-4">
            {[
              { nome: 'Corte', preco: 'R$ 45', duracao: '30 min' },
              { nome: 'Barba', preco: 'R$ 40', duracao: '20 min' },
              { nome: 'Corte + Barba', preco: 'R$ 80', duracao: '50 min' },
            ].map((svc, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 border border-dark-200 rounded-lg">
                <div>
                  <p className="font-medium text-dark-900">{svc.nome}</p>
                  <div className="flex gap-4 mt-1 text-sm text-dark-600">
                    <span>{svc.preco}</span>
                    <span>{svc.duracao}</span>
                  </div>
                </div>
                <button className="px-4 py-2 text-accent-500 hover:bg-accent-50 rounded-lg transition-colors">
                  Editar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Segurança */}
      {activeTab === 'seguranca' && (
        <div className="card space-y-6">
          <div>
            <h3 className="subsection-title">Segurança da Conta</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-dark-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Lock size={20} className="text-dark-600" />
                  <div>
                    <p className="font-medium text-dark-900">Senha</p>
                    <p className="text-sm text-dark-600">Última alteração há 45 dias</p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-dark-300 text-dark-600 rounded-lg hover:bg-dark-50 transition-colors">
                  Alterar
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-dark-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Key size={20} className="text-dark-600" />
                  <div>
                    <p className="font-medium text-dark-900">Autenticação em Dois Fatores</p>
                    <p className="text-sm text-dark-600">Desativada</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-accent-500 text-white rounded-lg hover:bg-accent-600 transition-colors">
                  Ativar
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-dark-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <Shield size={20} className="text-dark-600" />
                  <div>
                    <p className="font-medium text-dark-900">Sessões Ativas</p>
                    <p className="text-sm text-dark-600">1 dispositivo ativo</p>
                  </div>
                </div>
                <button className="px-4 py-2 border border-dark-300 text-dark-600 rounded-lg hover:bg-dark-50 transition-colors">
                  Gerenciar
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-dark-200 pt-6">
            <h3 className="subsection-title">Notificações</h3>

            <div className="space-y-3">
              {[
                { label: 'Novos agendamentos', enabled: true },
                { label: 'Cancelamentos', enabled: true },
                { label: 'Pagamentos recebidos', enabled: true },
                { label: 'Atualizações do sistema', enabled: false },
              ].map((notif, idx) => (
                <label key={idx} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked={notif.enabled}
                    className="w-4 h-4 rounded border-dark-300 text-accent-500"
                  />
                  <span className="text-sm text-dark-700">{notif.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
