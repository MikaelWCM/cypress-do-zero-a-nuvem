# Cypress, do Zero à Nuvem
 
Projeto de automação de testes E2E para a **Central de Atendimento ao Cliente TAT (CAC TAT)**, desenvolvido como parte do curso *Cypress, do Zero à Nuvem*, da Escola Talking About Testing.
 
Os testes validam o formulário de atendimento implementado em HTML, CSS e JavaScript, incluindo preenchimento, validações, seleção de opções, upload de arquivos e acesso à política de privacidade. A aplicação sob teste está em `src/` e é aberta diretamente pelos testes, portanto não é necessário iniciar um servidor web para executar a suíte atual.
 
## Stack e versões
 
| Item | Versão / detalhe |
| --- | --- |
| Cypress | `13.12.0` |
| Node.js suportado | `^16.0.0`, `^18.0.0` ou `>=20.0.0` |
| Dependências diretas | apenas `cypress` (as demais são transitivas) |
| Licença | MIT |
 
## Pré-requisitos
 
- **Node.js** em uma das faixas suportadas pelo Cypress 13: **16.x, 18.x ou 20.x (ou superior)**. Versões ímpares como 17 e 19 não são oficialmente suportadas — prefira uma versão par/LTS.
- **npm**, instalado junto com o Node.js.
- **Git**, caso o projeto seja clonado do repositório.
- Sistema operacional compatível com o Cypress (Windows, macOS ou Linux com as dependências gráficas necessárias para rodar em modo interativo/headed).
Para confirmar as versões instaladas:
 
```bash
node --version
npm --version
```
 
## Instalação
 
1. Clone o repositório e acesse a pasta do projeto:
```bash
	git clone git@github.com:MikaelWCM/cypress-do-zero-a-nuvem.git
	cd cypress-do-zero-a-nuvem
```
 
2. Instale as dependências do projeto:
```bash
	npm install
```
 
	O comando instala o Cypress na versão `13.12.0`, conforme definido em `package.json`/`package-lock.json`. Como é a única dependência direta do projeto, a instalação tende a ser rápida e com poucas chances de conflito de versões.
 
3. (Opcional) Verifique se o binário do Cypress foi instalado corretamente:
```bash
	npx cypress verify
```
 
	Esse comando é útil quando o `npm install` roda em um ambiente novo (ex.: máquina de CI, container ou após limpar o cache), pois confirma que o binário do Cypress foi baixado e está executável.
 
## Execução dos testes
 
### Modo headless
 
Executa todos os testes sem abrir a interface gráfica e gera os vídeos configurados no Cypress:
 
```bash
npm test
```
 
O mesmo comportamento pode ser executado diretamente com:
 
```bash
npx cypress run
```
 
### Modo interativo
 
Abre o Cypress para selecionar a especificação e acompanhar a execução no navegador:
 
```bash
npm run cy:open
```
 
Na tela do Cypress, selecione **E2E Testing**, escolha um navegador disponível e execute uma das especificações.
 
### Execução com viewport mobile
 
Para abrir o Cypress com viewport de `375x667`:
 
```bash
npm run cy:open:mobile
```
 
Para executar os testes em modo headless com viewport de `410x860`:
 
```bash
npm run cy:open:headless
```
 
### Executando um spec específico
 
Útil ao investigar a falha de um único cenário, sem rodar a suíte inteira:
 
```bash
npx cypress run --spec "cypress/e2e/nome-do-arquivo.cy.js"
```
 
### Escolhendo o navegador
 
Por padrão o Cypress usa o Electron embutido. Para rodar em Chrome ou Firefox instalados na máquina:
 
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
```
 
## Cobertura dos testes
 
As especificações em `cypress/e2e/` cobrem:
 
- carregamento e título da aplicação;
- envio do formulário com dados válidos;
- validação de e-mail inválido;
- obrigatoriedade condicional do telefone;
- preenchimento e limpeza dos campos;
- seleção de produto por texto, valor e índice;
- seleção de opções de atendimento e meios de contato;
- upload de arquivo por seleção, arrastar e soltar e fixture por alias;
- abertura e título da política de privacidade.
## Estrutura principal
 
```text
.
├── cypress/
│   ├── e2e/              # Especificações de testes E2E
│   ├── fixtures/         # Arquivos usados como massa de teste
│   └── support/          # Comandos e configuração de suporte
├── lessons/              # Material didático do curso
├── src/                  # Aplicação CAC TAT sob teste
├── cypress.config.js     # Configuração do Cypress
└── package.json          # Scripts e dependências
```
 
## Configuração
 
As configurações padrão estão em `cypress.config.js`:
 
- viewport padrão: `1280x880`;
- testes organizados como E2E.
 
## Scripts disponíveis
 
| Script | Finalidade |
| --- | --- |
| `npm test` | Executa os testes E2E em modo headless. |
| `npm run cy:open` | Abre a interface interativa do Cypress. |
| `npm run cy:open:mobile` | Abre o Cypress com viewport mobile de `375x667`. |
| `npm run cy:open:headless` | Executa em modo headless com viewport de `410x860`. |
 
## Dicas para quem for rodar ou dar manutenção nos testes
 
- Como a aplicação em `src/` é aberta diretamente (sem servidor local), não é necessário configurar `baseUrl` nem subir nenhum processo antes de rodar a suíte — basta `npm install` seguido do comando de execução.
- Ao investigar uma falha, rode o spec isoladamente (`--spec`) e, se possível, em modo interativo (`cy:open`) para acompanhar os passos no navegador em tempo real.
- Os vídeos e screenshots gerados após `npm test`/`npx cypress run` são o primeiro lugar para checar o que aconteceu em uma falha, especialmente em execuções headless ou de CI.
- Como o projeto tem apenas o Cypress como dependência direta, problemas de instalação geralmente estão ligados à versão do Node — confira a tabela de versões suportadas antes de abrir uma issue.
## Referências
 
- [Cypress](https://www.cypress.io/)
- [Aplicação CAC TAT](https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html)
- [Curso Cypress, do Zero à Nuvem](https://github.com/wlsf82/cypress-do-zero-a-nuvem)
## Licença
 
Este projeto está licenciado sob a licença MIT.