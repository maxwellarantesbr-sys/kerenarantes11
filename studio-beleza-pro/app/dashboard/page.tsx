'use client'

import { useState, useEffect } from 'react'
import {
  Gift,
  Cake,
  Clock,
  CheckCircle,
} from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Dados mockados - Substituir por API real
const mockMetrics = {
  totalClientes: 247,
  faturamentoHoje: 2850.50,
  faturamentoMes: 28540.00,
  proximosAtendimentos: 8,
  aniversariantes: 3,
  clientesVIP: 12,
}

const mockAgendamentos = [
  { id: 1, cliente: 'Carlos Silva', servico: 'Corte + Barba', profissional: 'Felipe', horario: '14:00', status: 'confirmado' },
  { id: 2, cliente: 'João Oliveira', servico: 'Corte', profissional: 'André', horario: '15:30', status: 'agendado' },
  { id: 3, cliente: 'Pedro Costa', servico: 'Design de Barba', profissional: 'Marcus', horario: '16:45', status: 'agendado' },
]

const mockServicos = [
  { name: 'Corte', value: 45, sales: 185 },
  { name: 'Barba', value: 40, sales: 142 },
  { name: 'Coloração', value: 120, sales: 68 },
  { name: 'Botox', value: 250, sales: 34 },
  { name: 'Outros', value: 0, sales: 120 },
]

const mockFaturamento = [
  { data: 'Seg', receita: 3200 },
  { data: 'Ter', receita: 2800 },
  { data: 'Qua', receita: 4100 },
  { data: 'Qui', receita: 3500 },
  { data: 'Sex', receita: 4800 },
  { data: 'Sab', receita: 6200 },
  { data: 'Dom', receita: 0 },
]

const CORES = ['#ff8722', '#667eea', '#764ba2', '#e74c3c', '#95a5a6']

export default function Dashboard() {
  const [data, setData] = useState(mockMetrics)

  useEffect(() => {
    // Buscar dados da API
    // const fetchData = async () => {
    //   const response = await fetch('/api/dashboard/metrics')
    //   const result = await response.json()
    //   setData(result)
    // }
    // fetchData()
  }, [])

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Title */}
      <div>
        <h1 className="section-title">Dashboard</h1>
        <p className="text-dark-600">Bem-vindo! Acompanhe o desempenho do seu studio em tempo real.</p>
      </div>

      {/* Quick Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total de Clientes"
          value={data.totalClientes}
          icon={Users}
          color="blue"
          trend="+12% este mês"
        />
        <MetricCard
          title="Faturamento Hoje"
          value={`R$ ${data.faturamentoHoje.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`}
          icon={DollarSign}
          color="green"
          trend="↑ 8% vs média"
        />
        <MetricCard
          title="Faturamento Mês"
          value={`R$ ${(data.faturamentoMes / 1000).toFixed(1)}k`}
          icon={TrendingUp}
          color="purple"
          trend="↑ 18% vs mês anterior"
        />
        <MetricCard
          title="Próximos Atendimentos"
          value={data.proximosAtendimentos}
          icon={Calendar}
          color="orange"
          trend={`${data.aniversariantes} aniversariantes`}
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card flex items-center gap-4">
          <div className="p-3 bg-yellow-100 rounded-lg">
            <Gift size={24} className="text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-dark-600">Clientes VIP</p>
            <p className="text-2xl font-bold text-dark-900">{data.clientesVIP}</p>
          </div>
        </div>

        <div className="card flex items-center gap-4">
          <div className="p-3 bg-pink-100 rounded-lg">
            <Cake size={24} className="text-pink-600" />
          </div>
          <div>
            <p className="text-sm text-dark-600">Aniversariantes Hoje</p>
            <p className="text-2xl font-bold text-dark-900">{data.aniversariantes}</p>
          </div>
        </div>

        <div className="card flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <CheckCircle size={24} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm text-dark-600">Taxa de Confirmação</p>
            <p className="text-2xl font-bold text-dark-900">94%</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Faturamento por Dia */}
        <div className="lg:col-span-2 card">
          <h3 className="subsection-title">Faturamento - Últimos 7 dias</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockFaturamento}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="data" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="receita"
                stroke="#ff8722"
                strokeWidth={2}
                dot={{ fill: '#ff8722', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Serviços Mais Vendidos */}
        <div className="card">
          <h3 className="subsection-title">Top Serviços</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockServicos}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, sales }) => `${name} (${sales})`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="sales"
              >
                {mockServicos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Próximos Atendimentos */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="subsection-title">Próximos Atendimentos (Hoje)</h3>
          <a href="/agenda" className="text-accent-500 hover:text-accent-600 text-sm font-medium">
            Ver Agenda Completa →
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-dark-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Horário</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Cliente</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Serviço</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Profissional</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockAgendamentos.map((agendamento) => (
                <tr key={agendamento.id} className="border-b border-dark-100 hover:bg-dark-50 transition-colors">
                  <td className="py-3 px-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-dark-400" />
                      {agendamento.horario}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-dark-900">{agendamento.cliente}</td>
                  <td className="py-3 px-4 text-sm text-dark-700">{agendamento.servico}</td>
                  <td className="py-3 px-4 text-sm text-dark-700">{agendamento.profissional}</td>
                  <td className="py-3 px-4 text-sm">
                    <span
                      className={`
                        inline-flex px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          agendamento.status === 'confirmado'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-blue-100 text-blue-800'
                        }
                      `}
                    >
                      {agendamento.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string | number
  icon: React.ComponentType<{ size: number; className?: string }>
  color: 'blue' | 'green' | 'purple' | 'orange'
  trend?: string
}

function MetricCard({ title, value, icon: Icon, color, trend }: MetricCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  }

  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-dark-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-dark-900">{value}</p>
          {trend && <p className="text-xs text-dark-500 mt-2">{trend}</p>}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  )
}
