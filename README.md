# Financeiro

## Monitor de Criptomoedas - React & PostgreSQL

Este projeto fornece uma aplicação web para monitorar dados de criptomoedas, construída com React e alimentada por um banco de dados PostgreSQL.

### Recursos

- Exibição em tempo real de preços, volume e outras métricas relevantes de criptomoedas.
- Visualização e análise de dados históricos.
- Interface amigável para acompanhar seus ativos favoritos.
- Armazenamento e gerenciamento de dados seguros usando PostgreSQL.

### Instalação e Execução

#### Pré-requisitos

- Node.js e npm instalados em seu sistema.
- Banco de dados PostgreSQL instalado e configurado.

#### Passos

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-nome-de-usuario/monitor-de-criptomoedas.git

2. **Instale as dependências:**
    ```
    cd backend
    npm install
    ```

    ```
    cd frontend
    npm install
    ```

3. **Configure as credenciais do banco de dados:**
- Navegue até o arquivo backend/.env.
- Substitua os valores de espaço reservado pelas suas próprias credenciais do banco de dados PostgreSQL:
    ```
    DATABASE_URL=postgresql://seu_nome_de_usuario:sua_senha@seu_host:sua_porta/seu_banco_de_dados
    ```
4. **Execute o servidor de back-end:**
    ```
    cd backend
    npm start
    ```
5. **Execute a aplicação de front-end:**
    ```
    cd frontend
    npm start
    ```
6. **Acesse a aplicação:**
- A aplicação agora deve estar acessível em seu navegador em http://localhost:3000.

### Estrutura do Projeto

- **backend:** Contém o código do lado do servidor responsável por buscar dados de APIs, interagir com o banco de dados e servir dados para o front-end.
- **frontend:** Contém a aplicação React responsável por renderizar a interface do usuário e lidar com as interações do usuário.

### Contribuição

Contribuições para este projeto são bem-vindas. Sinta-se à vontade para enviar solicitações de pull ou abrir problemas para quaisquer melhorias ou novos recursos que você gostaria de adicionar.

### Licença

Este projeto é licenciado sob a Licença MIT.
