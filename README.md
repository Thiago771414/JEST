# Automação de Testes com JEST e MongoDB
Este projeto demonstra uma aplicação de testes automatizados utilizando JEST para uma API de usuários que interage com o banco de dados MongoDB. Os testes cobrem funcionalidades básicas como encontrar todos os usuários e encontrar um usuário específico por ID, utilizando a biblioteca superagent para as requisições HTTP.
## Layout Login
![Mobile 1](https://miro.medium.com/v2/resize:fit:700/1*M0tzk-tfDQP3mrVGcoT5-A.png)

# Dependências
Para rodar este projeto, você precisará ter instalado em sua máquina:

Node.js
MongoDB
Jest
Superagent
Você pode instalar o Jest e o Superagent via npm com os seguintes comandos:
````javascript
bash
Copy code
npm install --save-dev jest
npm install superagent
````
# Configuração
Antes de executar os testes, certifique-se de que o MongoDB está rodando localmente na sua máquina. Se necessário, ajuste a string de conexão do MongoDB dentro do seu projeto conforme o seu ambiente.

# Estrutura do Projeto
O código fonte principal da API está localizado no arquivo user-api.js, que contém as funções para buscar todos os usuários e buscar um usuário por ID utilizando a API externa JSONPlaceholder como exemplo.

Os testes estão definidos no arquivo user-api.test.js, que utiliza o Jest para definir e executar os casos de teste para as funcionalidades fornecidas pela UserApi.

# Como Executar os Testes
Para executar os testes, navegue até o diretório raiz do projeto pelo terminal e execute o seguinte comando:
````javascript
bash
Copy code
npm test
````
Este comando irá iniciar o Jest, que por sua vez executará todos os testes definidos no arquivo user-api.test.js. Os testes vão verificar se a aplicação consegue retornar todos os usuários e encontrar um usuário específico pelo ID, além de tratar corretamente os casos em que um usuário não é encontrado.

# Contribuições
Contribuições para este projeto são bem-vindas. Se você encontrou um bug ou tem uma sugestão de melhoria, por favor, abra uma issue ou envie um pull request com suas modificações.

# Licença
Este projeto é distribuído sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
