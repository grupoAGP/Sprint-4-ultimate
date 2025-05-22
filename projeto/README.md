ViaMobilidade - Sistema de Reportes de Problemas

📋 Descrição

O sistema de reportes de problemas da ViaMobilidade é uma aplicação web desenvolvida utilizando Next.js, TypeScript e Tailwind CSS. Seu propósito é permitir que usuários possam relatar problemas encontrados nas linhas de trem 8 e 9, com classificação automática da categoria e grau de urgência do problema relatado.

📁 Estrutura do Projeto

O projeto é organizado na seguinte estrutura de diretórios:
projeto/
│── node_modules/            # Dependências do projeto (gerenciado pelo npm/yarn)
│── .next/                   # Arquivos gerados após o build do Next.js
│── public/                  # Diretório para arquivos públicos (imagens, ícones, etc.)
│   ├── fotos/               # Subpasta para armazenar fotos dos integrantes
│   │   ├── Arthur.JPG
│   │   ├── Gustavo.jpg
│   │   ├── Paulo.JPG
│   ├── img/                 # Subpasta para armazenar imagens relacionadas a problemas
│       ├── acidente.png
│       ├── atraso.png
│       ├── outroproblema.png
│       ├── superlotação.png
│── src/                     # Código-fonte principal do projeto
│   ├── app/                 # Diretório principal do Next.js App Router
│   │   ├── components/      # Componentes reutilizáveis
│   │   │   ├── App.tsx
│   │   │   ├── Icons.tsx
│   │   │   ├── ReportCard.tsx
│   │   │   ├── ReportList.tsx
│   │   ├── integrantes/      # Página ou seção relacionada aos integrantes
│   │   ├── login/           # Página ou seção de login
│   │   ├── perfil/          # Página ou seção de perfil
│   │   ├── favicon.ico      # Ícone do site
│   │   ├── globals.css      # Estilos globais do projeto
│   │   ├── layout.tsx       # Layout principal da aplicação
│   │   ├── page.tsx         # Página inicial do projeto
│── .gitignore               # Arquivo para ignorar arquivos no Git
│── eslint.config.mjs        # Configuração do ESLint para linting do código
│── next-env.d.ts            # Tipagem do Next.js para TypeScript
│── next.config.ts           # Configuração do Next.js
│── package-lock.json        # Controle de versão das dependências (npm)
│── package.json             # Arquivo de configuração do projeto e dependências
│── postcss.config.mjs       # Configuração do PostCSS (utilizado com Tailwind CSS)
│── README.md                # Documentação do projeto
│── tailwind.config.js       # Configuração do Tailwind CSS
│── tsconfig.json            # Configuração do TypeScript

🚀 Tecnologias Utilizadas

- [Next.js](https://nextjs.org/) - Framework React para aplicações full-stack.
- [TypeScript](https://www.typescriptlang.org/) - Superset do JavaScript que adiciona tipagem estática.
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário para estilização rápida e eficiente.
- [ESLint](https://eslint.org/) - Ferramenta para garantir um código mais limpo e padronizado.
- [PostCSS](https://postcss.org/) - Processador de CSS para melhorar a compatibilidade e otimização.

📦 Instalação e Execução

Clone o repositório:

Instale as dependências:

Inicie o servidor de desenvolvimento:

Acesse a aplicação no navegador:

🔨 Configurações Importantes

Certifique-se de que o arquivo .gitignore está configurado para excluir as pastas:

node_modules

.next

.vercel

Para gerar o arquivo .zip para entrega, compactar o projeto SEM as pastas mencionadas acima.

📂 Funcionalidades

Reporte de problemas nas linhas 8 e 9.

Classificação automática da urgência e categoria dos problemas relatados.

Interface de login e cadastro de usuários.

Edição de perfil do usuário.

✅ Melhorias Futuras

Integração com banco de dados para persistência de dados.

Melhoria na responsividade do sistema.

Implementação de relatórios detalhados e gráficos interativos.

👥 Autores

[Gustavo Dantas] - RM560685

[Paulo Neto] - RM520262

📄 Licença

Este projeto é de uso acadêmico e possui direitos reservados aos desenvolvedores.

