// lib/supabase.ts

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for common operations

export const fetchClientes = async (studioId: string) => {
  const { data, error } = await supabase
    .from('clientes')
    .select('*')
    .eq('studio_id', studioId)
    .eq('is_active', true)
    .order('name')

  if (error) console.error('Error fetching clientes:', error)
  return data || []
}

export const fetchAgendamentos = async (studioId: string, date?: string) => {
  let query = supabase
    .from('agendamentos')
    .select(
      `
      *,
      cliente:cliente_id (name, phone, email),
      profissional:profissional_id (name),
      servico:servico_id (name, price, duration_minutes)
    `
    )
    .eq('studio_id', studioId)

  if (date) {
    const dateStart = `${date}T00:00:00`
    const dateEnd = `${date}T23:59:59`
    query = query
      .gte('scheduled_at', dateStart)
      .lte('scheduled_at', dateEnd)
  }

  const { data, error } = await query.order('scheduled_at')

  if (error) console.error('Error fetching agendamentos:', error)
  return data || []
}

export const fetchFinanceiro = async (
  studioId: string,
  tipo: 'receitas' | 'despesas'
) => {
  const table = tipo === 'receitas' ? 'receitas' : 'despesas'

  const { data, error } = await supabase
    .from(table)
    .select('*')
    .eq('studio_id', studioId)
    .order('created_at', { ascending: false })

  if (error) console.error(`Error fetching ${tipo}:`, error)
  return data || []
}

export const createAgendamento = async (
  studioId: string,
  agendamento: any
) => {
  const { data, error } = await supabase
    .from('agendamentos')
    .insert([
      {
        studio_id: studioId,
        ...agendamento,
      },
    ])
    .select()

  if (error) console.error('Error creating agendamento:', error)
  return { data, error }
}

export const updateAgendamento = async (
  id: string,
  updates: any
) => {
  const { data, error } = await supabase
    .from('agendamentos')
    .update(updates)
    .eq('id', id)
    .select()

  if (error) console.error('Error updating agendamento:', error)
  return { data, error }
}

export const deleteAgendamento = async (id: string) => {
  const { error } = await supabase
    .from('agendamentos')
    .delete()
    .eq('id', id)

  if (error) console.error('Error deleting agendamento:', error)
  return { error }
}

export const fetchDashboardMetrics = async (studioId: string) => {
  try {
    // Total de clientes
    const { count: totalClientes } = await supabase
      .from('clientes')
      .select('*', { count: 'exact', head: true })
      .eq('studio_id', studioId)
      .eq('is_active', true)

    // Faturamento hoje
    const today = new Date().toISOString().split('T')[0]
    const { data: receitas_hoje } = await supabase
      .from('receitas')
      .select('amount')
      .eq('studio_id', studioId)
      .like('created_at', `${today}%`)
      .eq('payment_status', 'pago')

    const faturamentoHoje = receitas_hoje?.reduce(
      (sum, r) => sum + (r.amount || 0),
      0
    ) || 0

    // Próximos agendamentos
    const agora = new Date().toISOString()
    const { count: proximosAtendimentos } = await supabase
      .from('agendamentos')
      .select('*', { count: 'exact', head: true })
      .eq('studio_id', studioId)
      .eq('status', 'agendado')
      .gt('scheduled_at', agora)

    return {
      totalClientes: totalClientes || 0,
      faturamentoHoje,
      proximosAtendimentos: proximosAtendimentos || 0,
    }
  } catch (error) {
    console.error('Error fetching dashboard metrics:', error)
    return {
      totalClientes: 0,
      faturamentoHoje: 0,
      proximosAtendimentos: 0,
    }
  }
}
