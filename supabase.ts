'use client'

import { useState } from 'react'
import { Plus, Filter, TrendingUp, TrendingDown, DollarSign } from 'lucide-react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const mockReceitas = [
  { id: 1, descricao: 'Corte - Carlos Silva', valor: 85, tipo: 'servico', data: '2024-05-28', status: 'pago' },
  { id: 2, descricao: 'Barba - João Oliveira', valor: 50, tipo: 'servico', data: '2024-05-28', status: 'pago' },
  { id: 3, descricao: 'Coloração - Maria Santos', valor: 120, tipo: 'servico', data: '2024-05-28', status: 'pago' },
]

const mockDespesas = [
  { id: 1, descricao: 'Aluguel', valor: 3000, categoria: 'aluguel', data: '2024-05-01', status: 'pago' },
  { id: 2, descricao: 'Internet', valor: 150, categoria: 'internet', data: '2024-05-10', status: 'pago' },
  { id: 3, descricao: 'Material de consumo', valor: 450, categoria: 'material', data: '2024-05-15', status: 'pago' },
]

const fluxoDados = [
  { mes: 'Jan', receita: 24500, despesa: 4800, lucro: 19700 },
  { mes: 'Fev', receita: 26300, despesa: 5100, lucro: 21200 },
  { mes: 'Mar', receita: 28540, despesa: 5240, lucro: 23300 },
  { mes: 'Abr', receita: 27800, despesa: 5200, lucro: 22600 },
  { mes: 'Mai', receita: 29200, despesa: 5400, lucro: 23800 },
  { mes: 'Jun', receita: 31500, despesa: 5600, lucro: 25900 },
]

const distribuicaoDespesas = [
  { name: 'Aluguel', value: 3000, percentage: 45 },
  { name: 'Funcionários', value: 2500, percentage: 37 },
  { name: 'Material', value: 800, percentage: 12 },
  { name: 'Outros', value: 200, percentage: 6 },
]

const CORES = ['#ff8722', '#667eea', '#764ba2', '#e74c3c']

export default function FinanceiroPage() {
  const [activeTab, setActiveTab] = useState<'receitas' | 'despesas' | 'analise'>('receitas')

  const totalReceitas = mockReceitas.reduce((sum, r) => sum + r.valor, 0)
  const totalDespesas = mockDespesas.reduce((sum, d) => sum + d.valor, 0)
  const lucro = totalReceitas - totalDespesas

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Title */}
      <div>
        <h1 className="section-title">Financeiro</h1>
        <p className="text-dark-600">Controle completo de receitas, despesas e fluxo de caixa</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-dark-600 mb-2">Total de Receitas</p>
              <p className="text-3xl font-bold text-green-600">R$ {totalReceitas.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-green-600 mt-2">↑ 8% vs mês anterior</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp size={24} className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-dark-600 mb-2">Total de Despesas</p>
              <p className="text-3xl font-bold text-red-600">R$ {totalDespesas.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-red-600 mt-2">↑ 3% vs mês anterior</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <TrendingDown size={24} className="text-red-600" />
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-dark-600 mb-2">Lucro Líquido</p>
              <p className="text-3xl font-bold text-blue-600">R$ {lucro.toLocaleString('pt-BR')}</p>
              <p className="text-xs text-blue-600 mt-2">↑ 12% vs mês anterior</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <DollarSign size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="card">
        <div className="flex border-b border-dark-200 mb-6">
          {['receitas', 'despesas', 'analise'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-accent-500 text-accent-500'
                  : 'border-transparent text-dark-600 hover:text-dark-900'
              }`}
            >
              {tab === 'receitas' ? 'Receitas' : tab === 'despesas' ? 'Despesas' : 'Análise'}
            </button>
          ))}
        </div>

        {/* Receitas Tab */}
        {activeTab === 'receitas' && (
          <div className="space-y-4">
            <div className="flex justify-end gap-2">
              <button className="p-2 hover:bg-dark-100 rounded-lg transition-colors">
                <Filter size={20} className="text-dark-600" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
                <Plus size={18} />
                Nova Receita
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Descrição</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Tipo</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Data</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Valor</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockReceitas.map((receita) => (
                    <tr key={receita.id} className="border-b border-dark-100 hover:bg-dark-50">
                      <td className="py-3 px-4 text-sm font-medium text-dark-900">{receita.descricao}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                          {receita.tipo}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-dark-700">{receita.data}</td>
                      <td className="py-3 px-4 text-sm font-medium text-green-600">
                        R$ {receita.valor.toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                          {receita.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Despesas Tab */}
        {activeTab === 'despesas' && (
          <div className="space-y-4">
            <div className="flex justify-end gap-2">
              <button className="p-2 hover:bg-dark-100 rounded-lg transition-colors">
                <Filter size={20} className="text-dark-600" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors">
                <Plus size={18} />
                Nova Despesa
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Descrição</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Categoria</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Data</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Valor</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-dark-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {mockDespesas.map((despesa) => (
                    <tr key={despesa.id} className="border-b border-dark-100 hover:bg-dark-50">
                      <td className="py-3 px-4 text-sm font-medium text-dark-900">{despesa.descricao}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs font-semibold">
                          {despesa.categoria}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-dark-700">{despesa.data}</td>
                      <td className="py-3 px-4 text-sm font-medium text-red-600">
                        R$ {despesa.valor.toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-semibold">
                          {despesa.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Análise Tab */}
        {activeTab === 'analise' && (
          <div className="space-y-6">
            {/* Fluxo de Caixa */}
            <div>
              <h3 className="subsection-title">Fluxo de Caixa - Últimos 6 Meses</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={fluxoDados}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="receita" fill="#10b981" name="Receita" />
                  <Bar dataKey="despesa" fill="#ef4444" name="Despesa" />
                  <Bar dataKey="lucro" fill="#3b82f6" name="Lucro" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Distribuição de Despesas */}
            <div>
              <h3 className="subsection-title">Distribuição de Despesas</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={distribuicaoDespesas}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name}: ${percentage}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {distribuicaoDespesas.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>

                <div className="space-y-3">
                  {distribuicaoDespesas.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-dark-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: CORES[idx % CORES.length] }}
                        ></div>
                        <span className="text-sm font-medium text-dark-900">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-dark-900">
                          R$ {item.value.toLocaleString('pt-BR')}
                        </div>
                        <div className="text-xs text-dark-600">{item.percentage}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
