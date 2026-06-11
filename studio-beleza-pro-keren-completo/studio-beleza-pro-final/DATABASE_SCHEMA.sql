-- ============================================
-- SCHEMA: STUDIO BELEZA PRO
-- ============================================

-- Tabela de Configuração do Studio
CREATE TABLE IF NOT EXISTS studios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(2),
  zip_code VARCHAR(10),
  cnpj VARCHAR(18),
  logo_url TEXT,
  banner_url TEXT,
  opening_hours JSONB, -- {"seg": "09:00-19:00", ...}
  timezone VARCHAR(50) DEFAULT 'America/Sao_Paulo',
  currency VARCHAR(3) DEFAULT 'BRL',
  tax_percentage DECIMAL(5,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  whatsapp VARCHAR(20),
  date_of_birth DATE,
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(2),
  zip_code VARCHAR(10),
  document VARCHAR(20), -- CPF
  gender VARCHAR(20),
  photo_url TEXT,
  notes TEXT,
  is_vip BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  last_visit DATE,
  total_spent DECIMAL(10,2) DEFAULT 0,
  visit_count INTEGER DEFAULT 0,
  tags TEXT[], -- ["cliente-frecuente", "compleanero", ...]
  preferences JSONB, -- {"color": "loiro", "service": "corte", ...}
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Profissionais
CREATE TABLE IF NOT EXISTS profissionais (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(20),
  specialties TEXT[], -- ["corte", "coloracao", "botox", ...]
  photo_url TEXT,
  commission_type VARCHAR(50), -- "fixed", "percentage", "per_service"
  commission_value DECIMAL(10,2),
  commission_percentage DECIMAL(5,2),
  is_active BOOLEAN DEFAULT TRUE,
  bio TEXT,
  social_media JSONB, -- {"instagram": "...", "tiktok": "..."}
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Serviços
CREATE TABLE IF NOT EXISTS servicos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- "cabelo", "unhas", "depilacao", ...
  price DECIMAL(10,2) NOT NULL,
  duration_minutes INTEGER NOT NULL, -- Duração em minutos
  color VARCHAR(20), -- Cor para exibição no calendário
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Agendamentos
CREATE TABLE IF NOT EXISTS agendamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  profissional_id UUID NOT NULL REFERENCES profissionais(id) ON DELETE CASCADE,
  servico_id UUID NOT NULL REFERENCES servicos(id) ON DELETE CASCADE,
  scheduled_at TIMESTAMP NOT NULL,
  duration_minutes INTEGER NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'agendado', -- "agendado", "confirmado", "em_atendimento", "finalizado", "cancelado", "faltou"
  notes TEXT,
  reminder_sent BOOLEAN DEFAULT FALSE,
  is_blocked BOOLEAN DEFAULT FALSE, -- Bloqueio de horário
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Faturamento/Receitas
CREATE TABLE IF NOT EXISTS receitas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  agendamento_id UUID REFERENCES agendamentos(id) ON DELETE SET NULL,
  cliente_id UUID REFERENCES clientes(id) ON DELETE SET NULL,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type VARCHAR(50), -- "servico", "produto", "curso", "outro"
  payment_method VARCHAR(50), -- "dinheiro", "credito", "debito", "pix", "boleto"
  payment_status VARCHAR(50) DEFAULT 'pago', -- "pago", "pendente", "cancelado"
  notes TEXT,
  receipt_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Despesas
CREATE TABLE IF NOT EXISTS despesas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  description VARCHAR(255) NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(100), -- "aluguel", "internet", "energia", "material", "funcionarios"
  payment_method VARCHAR(50),
  payment_status VARCHAR(50) DEFAULT 'pago',
  due_date DATE,
  paid_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Comissões
CREATE TABLE IF NOT EXISTS comissoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  profissional_id UUID NOT NULL REFERENCES profissionais(id) ON DELETE CASCADE,
  agendamento_id UUID REFERENCES agendamentos(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  month_year DATE NOT NULL, -- Mês de referência
  status VARCHAR(50) DEFAULT 'pendente', -- "pendente", "pago", "cancelado"
  paid_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Cupons/Promoções
CREATE TABLE IF NOT EXISTS cupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  code VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  discount_type VARCHAR(50), -- "percentage", "fixed", "per_service"
  discount_value DECIMAL(10,2) NOT NULL,
  discount_percentage DECIMAL(5,2),
  servico_id UUID REFERENCES servicos(id) ON DELETE CASCADE, -- Se aplicável a um serviço específico
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  max_uses INTEGER,
  current_uses INTEGER DEFAULT 0,
  min_amount DECIMAL(10,2), -- Compra mínima
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Programa de Fidelidade
CREATE TABLE IF NOT EXISTS fidelidade_pontos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  agendamento_id UUID REFERENCES agendamentos(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  description TEXT,
  expires_at DATE,
  is_used BOOLEAN DEFAULT FALSE,
  used_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Produtos
CREATE TABLE IF NOT EXISTS produtos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER DEFAULT 0,
  category VARCHAR(100),
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de SMS/WhatsApp Marketing
CREATE TABLE IF NOT EXISTS mensagens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  type VARCHAR(50), -- "whatsapp", "sms", "email"
  template VARCHAR(50), -- "confirmacao", "lembrete_24h", "lembrete_2h", "pos_atendimento", "aniversario", "promocao"
  content TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'enviado', -- "enviado", "entregue", "falhou", "pendente"
  sent_at TIMESTAMP DEFAULT NOW(),
  scheduled_at TIMESTAMP,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Histório de Atendimentos
CREATE TABLE IF NOT EXISTS atendimentos_historico (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  agendamento_id UUID NOT NULL REFERENCES agendamentos(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  profissional_id UUID NOT NULL REFERENCES profissionais(id) ON DELETE CASCADE,
  servico_id UUID NOT NULL REFERENCES servicos(id) ON DELETE CASCADE,
  data_servico TIMESTAMP NOT NULL,
  duracao_minutos INTEGER,
  valor DECIMAL(10,2),
  resultado TEXT, -- Notas sobre o resultado
  proxima_visita_recomendada DATE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tabela de Lista de Espera
CREATE TABLE IF NOT EXISTS lista_espera (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  studio_id UUID NOT NULL REFERENCES studios(id) ON DELETE CASCADE,
  cliente_id UUID NOT NULL REFERENCES clientes(id) ON DELETE CASCADE,
  profissional_id UUID REFERENCES profissionais(id) ON DELETE CASCADE,
  servico_id UUID NOT NULL REFERENCES servicos(id) ON DELETE CASCADE,
  data_desejada DATE,
  prioridade INTEGER DEFAULT 0,
  notificado BOOLEAN DEFAULT FALSE,
  cancelado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Criar índices para performance
CREATE INDEX idx_clientes_studio ON clientes(studio_id);
CREATE INDEX idx_clientes_phone ON clientes(phone);
CREATE INDEX idx_clientes_email ON clientes(email);
CREATE INDEX idx_agendamentos_studio ON agendamentos(studio_id);
CREATE INDEX idx_agendamentos_cliente ON agendamentos(cliente_id);
CREATE INDEX idx_agendamentos_profissional ON agendamentos(profissional_id);
CREATE INDEX idx_agendamentos_scheduled ON agendamentos(scheduled_at);
CREATE INDEX idx_agendamentos_status ON agendamentos(status);
CREATE INDEX idx_receitas_studio ON receitas(studio_id);
CREATE INDEX idx_receitas_agendamento ON receitas(agendamento_id);
CREATE INDEX idx_receitas_created ON receitas(created_at);
CREATE INDEX idx_despesas_studio ON despesas(studio_id);
CREATE INDEX idx_despesas_created ON despesas(created_at);
CREATE INDEX idx_comissoes_profissional ON comissoes(profissional_id);
CREATE INDEX idx_comissoes_month ON comissoes(month_year);
CREATE INDEX idx_cupons_codigo ON cupons(code);
CREATE INDEX idx_cupons_validade ON cupons(valid_from, valid_until);
CREATE INDEX idx_mensagens_cliente ON mensagens(cliente_id);
CREATE INDEX idx_mensagens_tipo ON mensagens(type);
CREATE INDEX idx_mensagens_status ON mensagens(status);

-- Funções úteis

-- Função para calcular aniversariantes do dia
CREATE OR REPLACE FUNCTION get_aniversariantes(p_studio_id UUID, p_data DATE)
RETURNS TABLE (id UUID, name VARCHAR, phone VARCHAR, email VARCHAR) AS $$
BEGIN
  RETURN QUERY
  SELECT c.id, c.name, c.phone, c.email
  FROM clientes c
  WHERE c.studio_id = p_studio_id
    AND EXTRACT(MONTH FROM c.date_of_birth) = EXTRACT(MONTH FROM p_data)
    AND EXTRACT(DAY FROM c.date_of_birth) = EXTRACT(DAY FROM p_data)
    AND c.is_active = TRUE;
END;
$$ LANGUAGE plpgsql;

-- Função para calcular faturamento do dia
CREATE OR REPLACE FUNCTION get_faturamento_dia(p_studio_id UUID, p_data DATE)
RETURNS DECIMAL AS $$
DECLARE
  total DECIMAL;
BEGIN
  SELECT COALESCE(SUM(amount), 0) INTO total
  FROM receitas
  WHERE studio_id = p_studio_id
    AND DATE(created_at) = p_data
    AND payment_status = 'pago';
  RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Função para calcular faturamento do mês
CREATE OR REPLACE FUNCTION get_faturamento_mes(p_studio_id UUID, p_ano INTEGER, p_mes INTEGER)
RETURNS DECIMAL AS $$
DECLARE
  total DECIMAL;
BEGIN
  SELECT COALESCE(SUM(amount), 0) INTO total
  FROM receitas
  WHERE studio_id = p_studio_id
    AND EXTRACT(YEAR FROM created_at) = p_ano
    AND EXTRACT(MONTH FROM created_at) = p_mes
    AND payment_status = 'pago';
  RETURN total;
END;
$$ LANGUAGE plpgsql;

-- Função para atualizar comissões automaticamente
CREATE OR REPLACE FUNCTION create_comissao_trigger()
RETURNS TRIGGER AS $$
DECLARE
  v_profissional_id UUID;
  v_commission_amount DECIMAL;
  v_commission_type VARCHAR;
  v_commission_value DECIMAL;
  v_commission_percentage DECIMAL;
BEGIN
  IF NEW.status = 'finalizado' THEN
    SELECT profissional_id INTO v_profissional_id FROM agendamentos WHERE id = NEW.agendamento_id;
    
    SELECT p.commission_type, p.commission_value, p.commission_percentage 
    INTO v_commission_type, v_commission_value, v_commission_percentage
    FROM profissionais p WHERE p.id = v_profissional_id;
    
    IF v_commission_type = 'fixed' THEN
      v_commission_amount := v_commission_value;
    ELSIF v_commission_type = 'percentage' THEN
      v_commission_amount := NEW.amount * v_commission_percentage / 100;
    ELSE
      v_commission_amount := 0;
    END IF;
    
    INSERT INTO comissoes (studio_id, profissional_id, agendamento_id, amount, month_year)
    SELECT studio_id, v_profissional_id, NEW.agendamento_id, v_commission_amount, DATE_TRUNC('month', NOW())::DATE
    FROM agendamentos WHERE id = NEW.agendamento_id
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para criar comissão automaticamente
CREATE TRIGGER trigger_comissao_on_receita
AFTER INSERT OR UPDATE ON receitas
FOR EACH ROW
EXECUTE FUNCTION create_comissao_trigger();
