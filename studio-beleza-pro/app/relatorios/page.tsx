'use client'

import { useState } from 'react'
import { FileText, FileJson } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const relatorioServicosMaisVendidos = [
  { servico: 'Corte', quantidade: 185, receita: 8325 },
  { servico: 'Barba', quantidade: 142, receita: 5680 },
  { servico: 'Coloração', quantidade: 68, receita: 8160 },
  { servico: 'Botox', quantidade: 34, receita: 8500 },
  { servico: 'Design de Barba', quantidade: 56, receita: 3920 },
]

export default function RelatoriosPage() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="section-title">Relatórios</h1>
        <p className="text-dark-600">Gere análises detalhadas do seu negócio</p>
      </div>

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          {
            id: 'faturamento',
            titulo: '📊 Faturamento por Período',
            descricao: 'Analise o faturamento em períodos específicos',
          },
          {
            id: 'servicos',
            titulo: '⭐ Serviços Mais Vendidos',
            descricao: 'Veja quais serviços têm maior demanda',
          },
          {
            id: 'clientes-recorrentes',
            titulo: '👥 Clientes Recorrentes',
            descricao: 'Identifique seus melhores clientes',
          },
          {
            id: 'clientes-inativos',
            titulo: '⏳ Clientes Inativos',
            descricao: 'Clientes que não visitam há 90 dias',
          },
          {
            id: 'comissoes',
            titulo: '💰 Relatório de Comissões',
            descricao: 'Comissões por profissional e período',
          },
          {
            id: 'agenda',
            titulo: '📅 Relatório de Agenda',
            descricao: 'Ocupação e cancelamentos',
          },
        ].map((report) => (
          <div
            key={report.id}
            onClick={() => setSelectedReport(selectedReport === report.id ? null : report.id)}
            className="card cursor-pointer hover:shadow-card-lg transition-shadow"
          >
            <h3 className="font-semibold text-dark-900 mb-2">{report.titulo}</h3>
            <p className="text-sm text-dark-600 mb-4">{report.descricao}</p>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-accent-500 text-accent-500 rounded-lg hover:bg-accent-50 transition-colors text-sm font-medium">
                <FileText size={16} />
                PDF
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-50 transition-colors text-sm font-medium">
                <FileJson size={16} />
                Excel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Report */}
      {selectedReport === 'servicos' && (
        <div className="card">
          <h3 className="subsection-title">Serviços Mais Vendidos - Últimos 30 dias</h3>

          <div className="mb-6">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={relatorioServicosMaisVendidos}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="servico" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="quantidade" fill="#ff8722" name="Quantidade de Vendas" />
                <Bar yAxisId="right" dataKey="receita" fill="#667eea" name="Receita (R$)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-dark-200">
                  <th className="text-left py-3 px-4 font-semibold text-dark-700">Serviço</th>
                  <th className="text-left py-3 px-4 font-semibold text-dark-700">Quantidade</th>
                  <th className="text-left py-3 px-4 font-semibold text-dark-700">Receita Total</th>
                  <th className="text-left py-3 px-4 font-semibold text-dark-700">Ticket Médio</th>
                  <th className="text-left py-3 px-4 font-semibold text-dark-700">% do Total</th>
                </tr>
              </thead>
              <tbody>
                {relatorioServicosMaisVendidos.map((item) => {
                  const totalReceita = relatorioServicosMaisVendidos.reduce((sum, s) => sum + s.receita, 0)
                  const percentual = ((item.receita / totalReceita) * 100).toFixed(1)

                  return (
                    <tr key={item.servico} className="border-b border-dark-100 hover:bg-dark-50">
                      <td className="py-3 px-4 font-medium">{item.servico}</td>
                      <td className="py-3 px-4">{item.quantidade}</td>
                      <td className="py-3 px-4 text-green-600 font-medium">
                        R$ {item.receita.toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 px-4">
                        R$ {(item.receita / item.quantidade).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4">{percentual}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
