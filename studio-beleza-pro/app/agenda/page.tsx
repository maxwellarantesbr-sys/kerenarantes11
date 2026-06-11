'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Plus, Clock, User } from 'lucide-react'
import { format, addDays, startOfWeek, eachDayOfInterval } from 'date-fns'
import { ptBR } from 'date-fns/locale'

type ViewType = 'day' | 'week' | 'month'

const mockAgendamentos = [
  {
    id: 1,
    cliente: 'Carlos Silva',
    phone: '(11) 98765-4321',
    servico: 'Corte + Barba',
    profissional: 'Felipe',
    horario: '14:00',
    duracao: 50,
    valor: 85,
    status: 'confirmado',
    data: new Date(2024, 4, 28),
  },
  {
    id: 2,
    cliente: 'João Oliveira',
    phone: '(11) 99876-5432',
    servico: 'Corte',
    profissional: 'André',
    horario: '15:30',
    duracao: 30,
    valor: 50,
    status: 'agendado',
    data: new Date(2024, 4, 28),
  },
]

export default function AgendaPage() {
  const [view, setView] = useState<ViewType>('week')
  const [currentDate, setCurrentDate] = useState(new Date())

  const handlePrevious = () => {
    setCurrentDate((prev) => addDays(prev, view === 'day' ? -1 : view === 'week' ? -7 : -30))
  }

  const handleNext = () => {
    setCurrentDate((prev) => addDays(prev, view === 'day' ? 1 : view === 'week' ? 7 : 30))
  }

  const handleToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Title */}
      <div>
        <h1 className="section-title">Agenda</h1>
        <p className="text-dark-600">Gerencie os agendamentos do seu studio</p>
      </div>

      {/* Controls */}
      <div className="card flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 w-full sm:w-auto">
          {/* View Selector */}
          <div className="flex border border-dark-300 rounded-lg overflow-hidden">
            {(['day', 'week', 'month'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  view === v
                    ? 'bg-accent-500 text-white'
                    : 'bg-white text-dark-700 hover:bg-dark-50'
                }`}
              >
                {v === 'day' ? 'Dia' : v === 'week' ? 'Semana' : 'Mês'}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevious}
              className="p-2 hover:bg-dark-100 rounded-lg transition-colors"
              title="Anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="text-sm font-medium text-dark-700 min-w-[120px] text-center">
              {format(currentDate, 'd MMMM yyyy', { locale: ptBR })}
            </span>

            <button
              onClick={handleNext}
              className="p-2 hover:bg-dark-100 rounded-lg transition-colors"
              title="Próximo"
            >
              <ChevronRight size={20} />
            </button>

            <button
              onClick={handleToday}
              className="px-3 py-2 ml-2 text-sm font-medium text-dark-700 hover:bg-dark-100 rounded-lg transition-colors"
            >
              Hoje
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-accent-500 text-white rounded-lg font-medium hover:bg-accent-600 transition-colors">
          <Plus size={18} />
          Novo Agendamento
        </button>
      </div>

      {/* Calendar View */}
      {view === 'day' && <DayView date={currentDate} agendamentos={mockAgendamentos} />}
      {view === 'week' && <WeekView date={currentDate} agendamentos={mockAgendamentos} />}
      {view === 'month' && <MonthView date={currentDate} agendamentos={mockAgendamentos} />}
    </div>
  )
}

interface AgendamentoCardProps {
  agendamento: (typeof mockAgendamentos)[0]
}

function AgendamentoCard({ agendamento }: AgendamentoCardProps) {
  return (
    <div className="bg-gradient-to-r from-accent-500 to-accent-600 text-white rounded-lg p-3 text-sm hover:shadow-lg transition-shadow cursor-pointer">
      <div className="font-semibold">{agendamento.cliente}</div>
      <div className="flex items-center gap-1 mt-1 text-xs opacity-90">
        <Clock size={14} />
        {agendamento.horario} - {agendamento.duracao}min
      </div>
      <div className="flex items-center gap-1 mt-1 text-xs opacity-90">
        <User size={14} />
        {agendamento.profissional}
      </div>
      <div className="mt-2 text-xs font-medium opacity-75">{agendamento.servico}</div>
      <span
        className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
          agendamento.status === 'confirmado'
            ? 'bg-green-500'
            : agendamento.status === 'agendado'
            ? 'bg-blue-500'
            : 'bg-red-500'
        }`}
      >
        {agendamento.status}
      </span>
    </div>
  )
}

interface DayViewProps {
  date: Date
  agendamentos: typeof mockAgendamentos
}

function DayView({ date, agendamentos }: DayViewProps) {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8am to 8pm

  const dayAgendamentos = agendamentos.filter(
    (a) => a.data.toDateString() === date.toDateString()
  )

  return (
    <div className="card overflow-auto">
      <div className="min-h-[600px]">
        {hours.map((hour) => (
          <div key={hour} className="flex border-t border-dark-200">
            {/* Time */}
            <div className="w-20 px-4 py-3 border-r border-dark-200 text-sm font-medium text-dark-600 bg-dark-50">
              {String(hour).padStart(2, '0')}:00
            </div>

            {/* Slot */}
            <div className="flex-1 px-4 py-3 min-h-[80px] flex items-start gap-2">
              {dayAgendamentos
                .filter((a) => parseInt(a.horario.split(':')[0]) === hour)
                .map((agendamento) => (
                  <AgendamentoCard key={agendamento.id} agendamento={agendamento} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface WeekViewProps {
  date: Date
  agendamentos: typeof mockAgendamentos
}

function WeekView({ date, agendamentos }: WeekViewProps) {
  const weekStart = startOfWeek(date, { locale: ptBR })
  const weekDays = eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, 6),
  })

  return (
    <div className="card overflow-x-auto">
      <div className="grid grid-cols-7 gap-2 p-4 min-w-full">
        {weekDays.map((day, idx) => (
          <div key={idx} className="flex flex-col border border-dark-200 rounded-lg overflow-hidden">
            {/* Day Header */}
            <div className="bg-dark-50 border-b border-dark-200 p-3">
              <div className="text-xs font-medium text-dark-600">
                {format(day, 'EEE', { locale: ptBR })}
              </div>
              <div className="text-lg font-bold text-dark-900">
                {format(day, 'd', { locale: ptBR })}
              </div>
            </div>

            {/* Slots */}
            <div className="flex-1 p-2 space-y-2 min-h-[400px]">
              {agendamentos
                .filter((a) => a.data.toDateString() === day.toDateString())
                .map((agendamento) => (
                  <AgendamentoCard key={agendamento.id} agendamento={agendamento} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface MonthViewProps {
  date: Date
  agendamentos: typeof mockAgendamentos
}

function MonthView({ date, agendamentos }: MonthViewProps) {
  const monthStart = new Date(date.getFullYear(), date.getMonth(), 1)
  const monthEnd = new Date(date.getFullYear(), date.getMonth() + 1, 0)
  const weekStart = startOfWeek(monthStart, { locale: ptBR })
  const days = eachDayOfInterval({
    start: weekStart,
    end: addDays(monthEnd, 6 - monthEnd.getDay()),
  })

  const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab']

  return (
    <div className="card overflow-auto">
      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-0 border-b border-dark-200">
        {dayNames.map((name) => (
          <div key={name} className="bg-dark-50 border-r border-dark-200 p-3 text-center font-semibold text-dark-700">
            {name}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-0">
        {days.map((day, idx) => {
          const dayAgendamentos = agendamentos.filter(
            (a) => a.data.toDateString() === day.toDateString()
          )
          const isCurrentMonth = day.getMonth() === date.getMonth()

          return (
            <div
              key={idx}
              className={`border-r border-b border-dark-200 p-2 min-h-[100px] ${
                !isCurrentMonth ? 'bg-dark-50' : 'bg-white'
              }`}
            >
              <div className={`text-sm font-semibold mb-1 ${isCurrentMonth ? 'text-dark-900' : 'text-dark-400'}`}>
                {format(day, 'd')}
              </div>
              <div className="space-y-1">
                {dayAgendamentos.slice(0, 2).map((agendamento) => (
                  <div key={agendamento.id} className="text-xs bg-accent-100 text-accent-700 p-1 rounded truncate">
                    {agendamento.horario}
                  </div>
                ))}
                {dayAgendamentos.length > 2 && (
                  <div className="text-xs text-dark-600 font-medium">
                    +{dayAgendamentos.length - 2} mais
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
