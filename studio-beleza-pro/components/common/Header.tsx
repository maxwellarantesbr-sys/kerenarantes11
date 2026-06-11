'use client'

import { useState } from 'react'
import { Search, Bell, User, Plus } from 'lucide-react'

export function Header() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-white border-b border-dark-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Buscar clientes, agendamentos, serviços..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-dark-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-4 ml-8">
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg font-medium hover:bg-accent-600 transition-colors"
              title="Novo Agendamento"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Agendar</span>
            </button>
            <button
              className="flex items-center gap-2 px-4 py-2 bg-dark-100 text-dark-900 rounded-lg font-medium hover:bg-dark-200 transition-colors"
              title="Novo Cliente"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Cliente</span>
            </button>
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 text-dark-600 hover:bg-dark-100 rounded-lg transition-colors"
            title="Notificações"
          >
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Menu */}
          <button
            className="flex items-center gap-2 p-2 text-dark-600 hover:bg-dark-100 rounded-lg transition-colors"
            title="Menu Usuário"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-accent-500 to-accent-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
              A
            </div>
            <span className="hidden sm:inline text-sm font-medium text-dark-900">Admin</span>
          </button>
        </div>
      </div>
    </header>
  )
}
