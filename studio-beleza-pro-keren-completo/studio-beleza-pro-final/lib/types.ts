// lib/types.ts

export interface Studio {
  id: string
  name: string
  email: string
  phone: string
  whatsapp: string
  address: string
  city: string
  state: string
  zip_code: string
  cnpj: string
  logo_url?: string
  banner_url?: string
  opening_hours: Record<string, string>
  timezone: string
  currency: string
  tax_percentage: number
  created_at: string
  updated_at: string
}

export interface Cliente {
  id: string
  studio_id: string
  name: string
  email?: string
  phone?: string
  whatsapp?: string
  date_of_birth?: string
  address?: string
  city?: string
  state?: string
  zip_code?: string
  document?: string
  gender?: string
  photo_url?: string
  notes?: string
  is_vip: boolean
  is_active: boolean
  last_visit?: string
  total_spent: number
  visit_count: number
  tags: string[]
  preferences?: Record<string, any>
  created_at: string
  updated_at: string
}

export interface Profissional {
  id: string
  studio_id: string
  name: string
  email?: string
  phone?: string
  specialties: string[]
  photo_url?: string
  commission_type: 'fixed' | 'percentage' | 'per_service'
  commission_value?: number
  commission_percentage?: number
  is_active: boolean
  bio?: string
  social_media?: Record<string, string>
  created_at: string
  updated_at: string
}

export interface Servico {
  id: string
  studio_id: string
  name: string
  description?: string
  category: string
  price: number
  duration_minutes: number
  color?: string
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface Agendamento {
  id: string
  studio_id: string
  cliente_id: string
  profissional_id: string
  servico_id: string
  scheduled_at: string
  duration_minutes: number
  price: number
  status: 'agendado' | 'confirmado' | 'em_atendimento' | 'finalizado' | 'cancelado' | 'faltou'
  notes?: string
  reminder_sent: boolean
  is_blocked: boolean
  created_at: string
  updated_at: string
}

export interface Receita {
  id: string
  studio_id: string
  agendamento_id?: string
  cliente_id?: string
  description: string
  amount: number
  type: 'servico' | 'produto' | 'curso' | 'outro'
  payment_method: string
  payment_status: 'pago' | 'pendente' | 'cancelado'
  notes?: string
  receipt_url?: string
  created_at: string
  updated_at: string
}

export interface Despesa {
  id: string
  studio_id: string
  description: string
  amount: number
  category: string
  payment_method?: string
  payment_status: 'pago' | 'pendente' | 'cancelado'
  due_date?: string
  paid_date?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Comissao {
  id: string
  studio_id: string
  profissional_id: string
  agendamento_id?: string
  amount: number
  month_year: string
  status: 'pendente' | 'pago' | 'cancelado'
  paid_date?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface Cupom {
  id: string
  studio_id: string
  code: string
  description?: string
  discount_type: 'percentage' | 'fixed' | 'per_service'
  discount_value: number
  discount_percentage?: number
  servico_id?: string
  valid_from: string
  valid_until: string
  max_uses?: number
  current_uses: number
  min_amount?: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface FidelidadePontos {
  id: string
  studio_id: string
  cliente_id: string
  agendamento_id?: string
  points: number
  description?: string
  expires_at?: string
  is_used: boolean
  used_date?: string
  created_at: string
}

export interface Mensagem {
  id: string
  studio_id: string
  cliente_id: string
  type: 'whatsapp' | 'sms' | 'email'
  template: string
  content: string
  status: 'enviado' | 'entregue' | 'falhou' | 'pendente'
  sent_at: string
  scheduled_at?: string
  error_message?: string
  created_at: string
}

export interface ListaEspera {
  id: string
  studio_id: string
  cliente_id: string
  profissional_id?: string
  servico_id: string
  data_desejada: string
  prioridade: number
  notificado: boolean
  cancelado: boolean
  created_at: string
  updated_at: string
}

export interface DashboardMetrics {
  totalClientes: number
  faturamentoHoje: number
  faturamentoMes: number
  proximosAtendimentos: number
  aniversariantes: number
  clientesVIP: number
  taxaConfirmacao: number
}
