# 🚀 Guia de Início Rápido - Studio Beleza Pro

Este guia te levará a ter o sistema rodando em **5 minutos**.

---

## ✅ Pré-requisitos

- **Node.js 18+** → [Baixar](https://nodejs.org)
- **Git** → [Baixar](https://git-scm.com)
- **Uma conta no Supabase** (grátis) → [Criar](https://supabase.com)

---

## 📦 Passo 1: Instale Node.js e Git

### Windows
1. Acesse [nodejs.org](https://nodejs.org)
2. Baixe a versão LTS
3. Execute o instalador e siga as instruções

### Mac
```bash
# Com Homebrew
brew install node git

# Sem Homebrew, acesse nodejs.org
```

### Linux
```bash
sudo apt update
sudo apt install nodejs npm git
```

**Verificar instalação:**
```bash
node --version
npm --version
git --version
```

---

## 📁 Passo 2: Extraia ou Clone o Projeto

### Opção A: Se você tem o ZIP
```bash
# Extraia o arquivo
# Abra a pasta studio-beleza-pro no terminal

cd studio-beleza-pro
```

### Opção B: Se você tem o repositório Git
```bash
git clone <url-do-seu-repositorio>
cd studio-beleza-pro
```

---

## 🔧 Passo 3: Instale Dependências

No terminal, na pasta `studio-beleza-pro`:

```bash
npm install
```

Isto pode levar **2-5 minutos**. Aguarde até ver `added X packages`.

---

## 🗄️ Passo 4: Configure o Supabase

### 4.1 Crie um Projeto Supabase

1. Acesse [supabase.com](https://supabase.com)
2. Clique em **"Sign Up"**
3. Use GitHub ou Google para criar conta
4. Clique em **"New Project"**
5. Preencha os dados:
   - **Project name**: `studio-beleza-pro`
   - **Database password**: Gere uma senha forte
   - **Region**: Selecione a mais próxima (ex: São Paulo)
6. Clique em **"Create new project"**
7. Aguarde ~2 minutos para criar o banco

### 4.2 Obtenha as Credenciais

1. Quando o projeto estiver pronto, vá em **Settings > API**
2. Copie estes valores:
   - **Project URL** (comece com `https://`)
   - **anon public** (a chave que começa com `eyJ`)

### 4.3 Crie o Schema do Banco

1. Na coluna esquerda, clique em **SQL Editor**
2. Clique em **New Query**
3. Abra o arquivo `DATABASE_SCHEMA.sql` que está na pasta do projeto
4. Copie TODO o conteúdo
5. Cole no SQL Editor do Supabase
6. Clique em **Run** (ou aperte `Ctrl+Enter`)
7. Aguarde a mensagem de sucesso ✓

---

## 🔑 Passo 5: Configure o Arquivo .env.local

1. Na pasta `studio-beleza-pro`, encontre o arquivo `.env.example`
2. Copie este arquivo e renomeie para `.env.local`
3. Abra `.env.local` em um editor de texto
4. Preencha com os dados do Supabase:

```env
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

**Não altere as outras linhas!**

---

## ▶️ Passo 6: Inicie o Servidor

No terminal, ainda na pasta `studio-beleza-pro`:

```bash
npm run dev
```

Você verá algo como:
```
> Local:        http://localhost:3000
> Environments: .env.local
```

---

## 🎉 Passo 7: Acesse o Sistema

1. Abra seu navegador
2. Acesse [http://localhost:3000](http://localhost:3000)
3. **Pronto!** O sistema está rodando! 🎊

---

## 🗝️ Credenciais de Teste

**Email:** admin@test.com  
**Senha:** 123456

*(Você pode alterar depois em Configurações)*

---

## 🆘 Problemas Comuns

### Erro: "npm: command not found"
- Node.js não foi instalado corretamente
- Instale novamente desde [nodejs.org](https://nodejs.org)

### Erro: "NEXT_PUBLIC_SUPABASE_URL not found"
- Verifique se o arquivo `.env.local` existe
- Verifique se as credenciais estão corretas
- Reinicie o servidor: `Ctrl+C` e depois `npm run dev`

### Porta 3000 já em uso
```bash
# Rode em outra porta
npm run dev -- -p 3001
```

### Erro ao executar DATABASE_SCHEMA.sql
- Certifique-se de que está usando a aba correta no Supabase
- Tente criar cada tabela separadamente se necessário

---

## 📚 Próximas Etapas

Agora que o sistema está rodando:

1. **Explore o Dashboard** → Veja as métricas
2. **Crie Clientes** → Vá em Clientes > Novo
3. **Configure Serviços** → Vá em Configurações > Serviços
4. **Crie Profissionais** → Vá em Configurações > Equipe
5. **Faça um Agendamento** → Vá em Agenda > Novo Agendamento

---

## 🚀 Para Produção

Quando estiver pronto para colocar online:

1. **Build**: `npm run build`
2. **Deploy no Vercel**: Siga o guia no README.md
3. **Domínio personalizado**: Configure em Vercel Settings

---

## 📞 Precisa de Ajuda?

- Leia o **README.md** completo
- Abra uma issue no GitHub
- Entre em contato: suporte@studiobelezapro.com

---

## ✨ Dicas Úteis

### Desenvolvimento Rápido
```bash
# Seu código é recarregado automaticamente
# Basta salvar o arquivo e atualizar o navegador
```

### Limpar Cache
```bash
# Se algo ficar estranho:
rm -rf .next node_modules
npm install
npm run dev
```

### Ver Logs do Banco
Supabase > Logs > Postgres Logs

---

## 🎯 Resumo dos Passos

| Etapa | Comando/Ação |
|-------|-------------|
| 1 | Instale Node.js |
| 2 | Clone/extraia o projeto |
| 3 | `npm install` |
| 4 | Configure Supabase |
| 5 | Crie `.env.local` |
| 6 | `npm run dev` |
| 7 | Abra http://localhost:3000 |

---

**Parabéns!** 🎉 Seu Studio Beleza Pro está rodando!

Aproveite e comece a gerenciar seu studio profissionalmente!
