# 🔧 Setup VS Code - Studio Beleza Pro

Otimize seu ambiente de desenvolvimento com estas recomendações.

---

## 📥 Extensões Recomendadas

Estas extensões melhoram muito a produtividade:

### 1. **ES7+ React/Redux/React-Native snippets**
   - Autor: dsznajder.es7-react-js-snippets
   - Atalhos para componentes React

### 2. **Tailwind CSS IntelliSense**
   - Autor: bradlc.vscode-tailwindcss
   - Autocompletar do Tailwind

### 3. **TypeScript Vue Plugin**
   - Autor: Vue.vscode-typescript-vue-plugin
   - Suporte para TypeScript

### 4. **Prettier**
   - Autor: esbenp.prettier-vscode
   - Formatação automática de código

### 5. **ESLint**
   - Autor: dbaeumer.vscode-eslint
   - Verificação de código

### 6. **Thunder Client** ou **REST Client**
   - Para testar APIs
   - Autor: rangav.vscode-thunder-client

### 7. **GitLens**
   - Visualizar histórico do Git

### 8. **Makefile Tools**
   - Para facilitar compilação

---

## ⚙️ Configurações do VS Code

Adicione ao seu `settings.json` (`Ctrl+Shift+P` → Preferences: Open Settings (JSON)`):

```json
{
  // Editor
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.wordWrap": "on",

  // Tailwind
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],

  // TypeScript
  "typescript.updateImportsOnFileMove.enabled": "always",
  "typescript.tsserver.experimental.enableProjectDiagnostics": true,

  // Files
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 🚀 Atalhos Úteis

### Navegação
- `Ctrl+P` - Abrir arquivo
- `Ctrl+Shift+F` - Busca global
- `Ctrl+J` - Toggle terminal
- `Ctrl+B` - Toggle sidebar

### Edição
- `Ctrl+/` - Comentar linha
- `Alt+Up/Down` - Mover linha
- `Ctrl+D` - Selecionar palavra
- `Ctrl+H` - Find and Replace

### Git
- `Ctrl+Shift+G` - Git panel
- `Ctrl+K V` - Preview Markdown

---

## 📁 Estrutura de Pastas no VS Code

Criar um `.vscode/settings.json` na raiz do projeto:

```json
{
  "files.exclude": {
    "**/node_modules": true,
    "**/.next": true,
    ".env": true,
    ".env.local": true
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/.next": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.prettier": true
  }
}
```

---

## 🐛 Debug no VS Code

Crie `.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Next.js",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "console": "integratedTerminal"
    }
  ]
}
```

---

## 📊 Estrutura Recomendada de Workspace

1. **Arquivo → Abrir Pasta** → Selecione `studio-beleza-pro`
2. **Explore a estrutura:**
   - 📄 `.env.local` (configurações)
   - 📁 `app/` (páginas)
   - 📁 `components/` (componentes)
   - 📁 `lib/` (utilitários)
   - 📁 `public/` (assets)

---

## 🔍 Snippets Personalizados

Crie `Code > Preferences > User Snippets` e selecione `typescript`:

```json
{
  "React Component": {
    "prefix": "rfc",
    "body": [
      "'use client'",
      "",
      "import { useState } from 'react'",
      "",
      "export default function ${TM_FILENAME_BASE}() {",
      "  return (",
      "    <div>",
      "      ${TM_SELECTED_TEXT}",
      "    </div>",
      "  )",
      "}"
    ]
  },
  "Component with Props": {
    "prefix": "rfcp",
    "body": [
      "'use client'",
      "",
      "interface ${TM_FILENAME_BASE}Props {",
      "  ${1:prop}: string",
      "}",
      "",
      "export function ${TM_FILENAME_BASE}({ ${1:prop} }: ${TM_FILENAME_BASE}Props) {",
      "  return (",
      "    <div>${1:prop}</div>",
      "  )",
      "}"
    ]
  }
}
```

---

## 🎨 Tema Recomendado

Recomendamos um dos temas abaixo:

- **Dracula** (dark)
- **Nord** (dark)
- **One Dark Pro** (dark)
- **GitHub Light** (light)

Instalar: `Ctrl+Shift+X` → Pesquisar → Instalar

---

## 📚 Recursos Úteis

- [VS Code Docs](https://code.visualstudio.com/docs)
- [Next.js Extensions](https://nextjs.org/docs/advanced-features/debugging)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

## ✨ Dicas Finais

1. **Formato automático** → Salve um arquivo e veja Prettier formatar
2. **IntelliSense** → Comece a digitar e veja sugestões
3. **Problemas** → Abra `Ctrl+Shift+M` para ver erros
4. **Terminal Integrado** → `Ctrl+J` para abrir/fechar

---

**Seu ambiente está pronto para desenvolver!** 🚀
