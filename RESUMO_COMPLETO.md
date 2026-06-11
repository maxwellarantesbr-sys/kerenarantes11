# 💇 Studio Beleza Pro

**Sistema Profissional de Gestão para Studio de Beleza e Barbearia**

Um sistema web completo, moderno e escalável para gerenciar todos os aspectos de seu studio: agendamentos, clientes, financeiro, marketing e muito mais!

---

## 🎯 Funcionalidades Principais

### 📊 Dashboard
- **Métricas em Tempo Real**: Total de clientes, faturamento do dia/mês, próximos atendimentos
- **Aniversariantes**: Visualização de clientes fazendo aniversário hoje
- **Gráficos Interativos**: Faturamento da semana, serviços mais vendidos
- **Atalhos Rápidos**: Agendar, cadastrar cliente, registrar venda

### 📅 Agenda Inteligente
- **Múltiplas Visualizações**: Dia, Semana, Mês
- **Arrastar e Soltar**: Reorganize agendamentos facilmente
- **Bloqueio de Horários**: Reserve horários para pausas
- **Cores Personalizadas**: Por serviço e profissional
- **Status de Agendamentos**: Agendado, Confirmado, Em Atendimento, Finalizado, Cancelado, Faltou

### 👥 CRM Completo
- **Histórico de Cliente**: Todas as visitas e serviços realizados
- **Dados Detalhados**: Telefone, WhatsApp, Data de nascimento, Endereço
- **Classificação**: VIP, Ativo/Inativo, Com Débito
- **Preferências**: Serviços, cores, estilos favoritos
- **Filtros Avançados**: Busca por nome, telefone, email

### 💰 Financeiro Completo
- **Receitas**: Serviços, Produtos, Cursos
- **Despesas**: Aluguel, Internet, Energia, Material, Funcionários
- **Indicadores**: Lucro Líquido, Fluxo de Caixa, Contas a Pagar/Receber
- **Gráficos**: Faturamento, Distribuição de Despesas
- **Comissões Automáticas**: Por profissional, serviço ou percentual

### 🎯 Marketing
- **Cupons**: Percentual, Valor Fixo, Por Serviço
- **Programa de Fidelidade**: Pontos, Cashback, Premiações
- **Automações**: 
  - ✓ Confirmação de agendamento
  - ✓ Lembrete 24h antes
  - ✓ Lembrete 2h antes
  - ✓ Mensagem pós atendimento
  - ✓ Mensagem de aniversário
- **SMS/WhatsApp**: Integração para envios em massa
- **Email Marketing**: Campanhas automáticas

### 📈 Relatórios
- **Faturamento por Período**
- **Serviços Mais Vendidos**
- **Clientes Recorrentes**
- **Clientes Inativos**
- **Comissões por Profissional**
- **Exportação**: PDF e Excel

### ⚙️ Configurações
- **Informações do Studio**: Nome, CNPJ, Logo, Horários
- **Gerenciamento de Equipe**: Profissionais e especialidades
- **Serviços**: Preços, durações, categorias
- **Segurança**: Senha, 2FA, Sessões

---

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Conta no Supabase (gratuita)

### Passo 1: Clone o Projeto

```bash
git clone https://github.com/seu-usuario/studio-beleza-pro.git
cd studio-beleza-pro
```

### Passo 2: Instale as Dependências

```bash
npm install
# ou
yarn install
```

### Passo 3: Configure as Variáveis de Ambiente

1. Copie o arquivo `.env.example` para `.env.local`:

```bash
cp .env.example .env.local
```

2. Abra o arquivo `.env.local` e preencha com seus dados

### Passo 4: Configure o Supabase

#### 4.1 Crie uma Conta no Supabase
- Acesse [supabase.com](https://supabase.com)
- Clique em "Sign Up" e crie uma conta com GitHub, Google ou Email
- Crie um novo projeto

#### 4.2 Configure o Banco de Dados

1. No painel do Supabase, vá para **SQL Editor**
2. Clique em **New Query**
3. Cole todo o conteúdo do arquivo `DATABASE_SCHEMA.sql`
4. Execute a query clicando em **Run**

#### 4.3 Obtenha as Chaves de API

1. Vá para **Settings > API**
2. Copie:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role secret` → `SUPABASE_SERVICE_ROLE_KEY`

3. Cole no arquivo `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
SUPABASE_SERVICE_ROLE_KEY=sua-chave-service-role
```

### Passo 5: Inicie o Servidor de Desenvolvimento

```bash
npm run dev
# ou
yarn dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador

---

## 📁 Estrutura do Projeto

```
studio-beleza-pro/
├── app/
│   ├── layout.tsx                  # Layout raiz
│   ├── globals.css                 # Estilos globais
│   ├── dashboard/
│   │   └── page.tsx                # Dashboard
│   ├── agenda/
│   │   └── page.tsx                # Agenda inteligente
│   ├── clientes/
│   │   └── page.tsx                # CRM de clientes
│   ├── financeiro/
│   │   └── page.tsx                # Financeiro completo
│   ├── marketing/
│   │   └── page.tsx                # Marketing e automações
│   ├── relatorios/
│   │   └── page.tsx                # Relatórios
│   ├── configuracoes/
│   │   └── page.tsx                # Configurações
│   └── api/                        # API routes (futuro)
├── components/
│   ├── common/
│   │   ├── Sidebar.tsx             # Menu lateral
│   │   └── Header.tsx              # Cabeçalho
│   ├── dashboard/                  # Componentes do dashboard
│   ├── agenda/                     # Componentes da agenda
│   └── clientes/                   # Componentes de clientes
├── lib/
│   ├── supabase.ts                # Cliente Supabase
│   └── utils.ts                   # Utilitários
├── public/                        # Arquivos estáticos
├── package.json
├── tailwind.config.js
├── next.config.js
├── DATABASE_SCHEMA.sql            # Schema do banco de dados
└── .env.example
```

---

## 🎨 Design & Tema

### Cores Principais
```
Primário: Laranja (#ff8722) - Ações, destaques
Secundário: Roxo (#667eea) - Elementos secundários
Cinza: Texto e fundos
```

### Tipografia
- **Headings**: Semibold
- **Body**: Regular
- **Pequeno**: Light

### Componentes
- Cards com sombra suave
- Botões com transição
- Inputs com foco visual
- Badges para status

---

## 📱 Responsividade

O sistema é 100% responsivo:
- **Desktop**: Layout completo com sidebar + conteúdo
- **Tablet**: Menu recolhível, grid de 2 colunas
- **Mobile**: Menu colapsável, layout em 1 coluna

---

## 🔐 Segurança

### Implementado
- ✓ Autenticação com Supabase Auth
- ✓ Variáveis de ambiente seguras
- ✓ Row Level Security (RLS) no Supabase
- ✓ Rate limiting nas APIs

### Recomendações
1. Nunca commit `.env.local`
2. Use HTTPS em produção
3. Implemente 2FA para admins
4. Backup regular do banco de dados

---

## 🚀 Deploy

### Deploy no Vercel (Recomendado)

1. Push seu projeto para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project" e selecione seu repositório
4. Configure as variáveis de ambiente
5. Clique em "Deploy"

### Variáveis de Ambiente no Vercel
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

### Deploy no Netlify

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. Build command: `npm run build`
4. Publish directory: `.next`

---

## 📊 Banco de Dados

### Tabelas Principais

#### Studios
- Configurações do studio
- Logo, horários, CNPJ

#### Clientes
- Dados pessoais
- Histórico de visitas
- Preferências

#### Profissionais
- Dados do profissional
- Especialidades
- Comissões

#### Serviços
- Nome, preço, duração
- Categoria, ícone

#### Agendamentos
- Cliente, profissional, serviço
- Data/hora, status
- Notas, valores

#### Receitas & Despesas
- Tipo, valor, categoria
- Data, status de pagamento

#### Comissões
- Cálculo automático
- Por profissional e período

#### Cupons
- Código, tipo de desconto
- Validade, limite de usos

---

## 🔌 Integrações (Futuro)

- [ ] WhatsApp API (Meta)
- [ ] SMS (Twilio)
- [ ] Email (SendGrid)
- [ ] Stripe/PIX
- [ ] Google Calendar
- [ ] Calendly
- [ ] Analytics
- [ ] Google Ads

---

## 📚 Documentação Adicional

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev)

---

## 🤝 Contribuindo

Encontrou um bug ou quer adicionar uma feature?

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Commit: `git commit -m 'Add: sua-feature'`
4. Push: `git push origin feature/sua-feature`
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 💬 Suporte

Dúvidas? Abra uma issue ou entre em contato:
- **Email**: suporte@studiobelezapro.com
- **WhatsApp**: (11) 98765-4321
- **GitHub Issues**: [Link](https://github.com/seu-usuario/studio-beleza-pro/issues)

---

## 🎉 Agradecimentos

Desenvolvido com ❤️ para estúdios de beleza e barbearias.

**Studio Beleza Pro v1.0.0** © 2024
