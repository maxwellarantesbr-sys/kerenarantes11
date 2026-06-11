'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Calendar,
  Users,
  DollarSign,
  Megaphone,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Search,
} from 'lucide-react'

const menuItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    category: 'principal',
  },
  {
    label: 'Agenda',
    href: '/agenda',
    icon: Calendar,
    category: 'principal',
  },
  {
    label: 'Clientes',
    href: '/clientes',
    icon: Users,
    category: 'gestao',
  },
  {
    label: 'Financeiro',
    href: '/financeiro',
    icon: DollarSign,
    category: 'gestao',
  },
  {
    label: 'Marketing',
    href: '/marketing',
    icon: Megaphone,
    category: 'marketing',
  },
  {
    label: 'Relatórios',
    href: '/relatorios',
    icon: BarChart3,
    category: 'relatorios',
  },
  {
    label: 'Configurações',
    href: '/configuracoes',
    icon: Settings,
    category: 'sistema',
  },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <aside
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-dark-900 text-white transition-all duration-300 flex flex-col border-r border-dark-800`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-dark-800 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold text-accent-500">SB Pro</h1>
            <p className="text-xs text-dark-400">Studio Beleza</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-dark-800 rounded transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      </div>

      {/* Search */}
      {!isCollapsed && (
        <div className="p-4 border-b border-dark-800">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-3 text-dark-400" />
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full pl-9 pr-3 py-2 bg-dark-800 rounded text-sm text-white placeholder-dark-400 focus:outline-none focus:ring-1 focus:ring-accent-500"
            />
          </div>
        </div>
      )}

      {/* Menu Items */}
      <nav className="flex-1 overflow-auto py-4">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname.startsWith(item.href)

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                mx-2 px-4 py-3 rounded-lg flex items-center gap-3 transition-colors mb-2
                ${
                  isActive
                    ? 'bg-accent-500 text-white'
                    : 'text-dark-300 hover:bg-dark-800 hover:text-white'
                }
              `}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-dark-800 p-4">
        <button
          className={`
            w-full px-4 py-3 rounded-lg flex items-center gap-3 transition-colors
            text-dark-300 hover:bg-dark-800 hover:text-white
          `}
          title={isCollapsed ? 'Sair' : undefined}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Sair</span>}
        </button>
      </div>
    </aside>
  )
}
