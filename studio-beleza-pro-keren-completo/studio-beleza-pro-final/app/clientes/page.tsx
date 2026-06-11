'use client'

import { useState } from 'react'
import { Search, Plus, Filter, Edit2, Trash2, Phone, Mail, Heart, AlertCircle } from 'lucide-react'

type FilterType = 'all' | 'active' | 'inactive' | 'vip' | 'birthday' | 'debt'

const mockClientes = [
  {
    id: 1,
    nome: 'Carlos Silva',
    email: 'carlos@email.com',
    telefone: '(11) 98765-4321',
    whatsapp: '(11) 98765-4321',
    dataNascimento: '1985-06-15',
    cidade: 'São Paulo',
    estado: 'SP',
    totalGasto: 1200,
    visitas: 15,
    ultimaVisita: '2024-05-20',
    proximaVisita: '2024-06-10',
    isVip: true,
    isAtivo: true,
    temDebito: false,
    servicos: ['Corte', 'Barba', 'Botox'],
  },
  {
    id: 2,
    nome: 'João Oliveira',
    email: 'joao@email.com',
    telefone: '(11) 99876-5432',
    whatsapp: '(11) 99876-5432',
    dataNascimento: '1990-03-22',
    cidade: 'São Paulo',
    estado: 'SP',
    totalGasto: 850,
    visitas: 10,
    ultimaVisita: '2024-05-18',
    proximaVisita: '2024-06-08',
    isVip: false,
    isAtivo: true,
    temDebito: false,
    servicos: ['Corte'],
  },
  {
    id: 3,
    nome: 'Pedro Costa',
    email: 'pedro@email.com',
    telefone: '(11) 98765-1234',
    whatsapp: '(11) 98765-1234',
    dataNascimento: '1988-11-10',
    cidade: 'São Paulo',
    estado: 'SP',
    totalGasto: 600,
    visitas: 7,
    ultimaVisita: '2024-04-15',
    proximaVisita: null,
    isVip: false,
    isAtivo: false,
    temDebito: true,
    servicos: ['Corte', 'Design de Barba'],
  },
]

export default function ClientesPage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [, setSelectedCliente] = useState<number | null>(null)

  const filteredClientes = mockClientes.filter((cliente) => {
    // Apply filter
    if (filter === 'active' && !cliente.isAtivo) return false
    if (filter === 'inactive' && cliente.isAtivo) return false
    if (filter === 'vip' && !cliente.isVip) return false
    if (filter === 'debt' && !cliente.temDebito) return false

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        cliente.nome.toLowerCase().includes(query) ||
        cliente.email.toLowerCase().includes(query) ||
        cliente.telefone.includes(query)
      )
    }

    return true
  })

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Title */}
      <div>
        <h1 className="section-title">Clientes</h1>
        <p className="text-dark-600">Gerencie todos os seus clientes e CRM</p>
      </div>

      {/* Controls */}
      <div className="card space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Buscar por nome, email ou telefone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-dark-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-500"
            />
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="flex items-center gap-2 sm:ml-4">
          <div className="flex border border-dark-300 rounded-lg overflow-hidden">
            {['all', 'active', 'inactive', 'vip', 'debt'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as FilterType)}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-accent-500 text-white'
                    : 'bg-white text-dark-700 hover:bg-dark-50'
                }`}
              >
                {f === 'all' ? 'Todos' : f === 'active' ? 'Ativos' : f === 'inactive' ? 'Inativos' : f === 'vip' ? 'VIP' : 'Débitos'}
              </button>
            ))}
          </div>

          <button className="p-2 hover:bg-dark-100 rounded-lg transition-colors" title="Filtros avançados">
            <Filter size={20} className="text-dark-600" />
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg font-medium hover:bg-accent-600 transition-colors">
            <Plus size={18} />
            <span className="hidden sm:inline">Novo</span>
          </button>
        </div>
      </div>

      {/* Clients Table */}
      <div className="card overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-dark-200">
              <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Cliente</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Contato</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Total Gasto</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Visitas</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Última Visita</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Ações</th>
            </tr>
          </thead>
          <tbody>
            {filteredClientes.map((cliente) => (
              <tr key={cliente.id} className="border-b border-dark-100 hover:bg-dark-50 transition-colors">
                <td className="py-3 px-4 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {cliente.nome.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium text-dark-900">{cliente.nome}</div>
                      <div className="text-xs text-dark-500">{cliente.cidade}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex items-center gap-3">
                    <a href={`tel:${cliente.telefone}`} className="text-dark-600 hover:text-accent-500 transition-colors" title="Ligar">
                      <Phone size={16} />
                    </a>
                    <a href={`mailto:${cliente.email}`} className="text-dark-600 hover:text-accent-500 transition-colors" title="Email">
                      <Mail size={16} />
                    </a>
                  </div>
                </td>
                <td className="py-3 px-4 text-sm font-medium text-dark-900">
                  R$ {cliente.totalGasto.toLocaleString('pt-BR')}
                </td>
                <td className="py-3 px-4 text-sm text-dark-700">{cliente.visitas}</td>
                <td className="py-3 px-4 text-sm text-dark-700">
                  {new Date(cliente.ultimaVisita).toLocaleDateString('pt-BR')}
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex items-center gap-2">
                    {cliente.isVip && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-semibold">
                        <Heart size={12} />
                        VIP
                      </span>
                    )}
                    {cliente.temDebito && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-semibold">
                        <AlertCircle size={12} />
                        Débito
                      </span>
                    )}
                    {!cliente.isAtivo && (
                      <span className="inline-flex px-2 py-1 bg-dark-200 text-dark-700 rounded text-xs font-semibold">
                        Inativo
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-sm">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 text-dark-600 hover:bg-dark-200 rounded transition-colors"
                      title="Editar"
                      onClick={() => setSelectedCliente(cliente.id)}
                    >
                      <Edit2 size={16} />
                    </button>
                    <button className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors" title="Deletar">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card text-center">
          <p className="text-sm text-dark-600 mb-2">Total de Clientes</p>
          <p className="text-3xl font-bold text-dark-900">{mockClientes.length}</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-dark-600 mb-2">Clientes Ativos</p>
          <p className="text-3xl font-bold text-green-600">{mockClientes.filter((c) => c.isAtivo).length}</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-dark-600 mb-2">Clientes VIP</p>
          <p className="text-3xl font-bold text-yellow-600">{mockClientes.filter((c) => c.isVip).length}</p>
        </div>
        <div className="card text-center">
          <p className="text-sm text-dark-600 mb-2">Com Débito</p>
          <p className="text-3xl font-bold text-red-600">{mockClientes.filter((c) => c.temDebito).length}</p>
        </div>
      </div>
    </div>
  )
}
