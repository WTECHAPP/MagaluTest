-----------------------------------------------------------
-- README
-----------------------------------------------------------
Com a finalidade de atender a demanda do desafio técnico (Wishlist), abaixo estão os passos necessários para a execução do projeto.

    Tecnologias Utilizadas
    -------------------------------------------------------
    Redis       versão 4.0.2        Controle de sessões.
    MongoDB     versão 3.4.9        Armazenamento de dados.
    NodeJS      versão 10.14.2      APIs Restfull.

    Executar a aplicação
    -------------------------------------------------------
    1) Definir o diretório aonde ficará hospedada a aplicação;
    2) Abrir um terminal e direcionar o mesmo (terminal) ao diretório definido logo acima;
    3) Baixar a aplicação via Git pelo endereço https://
        3.1) Caso não tenha o Git instalado, realizar o download da ferramenta conforme seu S.O;
    4) Criar um arquivo com o nome .env
        4.1) O mesmo (.env) armazenará as variáveis de ambiente da aplicação;
        4.2) Adicionar o conteúdo abaixo no novo arquivo (.env):
            PORT=5000
            NODE_ENV=development
            SECRET=xpto4d8t4f8w8s8c8479e7e8df4fcd8e
            REDIS=redis://:<SENHA_REDIS>@<HOST_REDIS>:<PORTA_REDIS>/<DB_REDIS>
            TTL=1800
        4.3) Alterar as variáveis acima (<SENHA_REDIS>, <HOST_REDIS>, <PORTA_REDIS> e <DB_REDIS>), conforme ambiente de testes Magalu;
    5) Alterar a string de conexão do MongoDB (<USUARIO_DB>, <SENHA_DB>, <HOST_DB>, <PORTA_DB> e <NOME_DB>), existente no arquivo db.js, conforme ambiente de testes Magalu;
    6) Executar o seguinte comando: npm install
        6.1) Logo a aplicação estará disponível no endereço http://localhost:5000

    Aviso Importante
    -------------------------------------------------------
    Com a finalidade de realizar os testes de autorização (conforme desafio técnico), foi utilizado uma nova entidade (users).
    A ideia é que, somente quem estiver cadastrado nesta entidade (users), poderá remover algum cliente.
    Portanto, caso haja teste de remoção de clientes, será necessário cadastrar um usuário manualmente no MongoDB, segue:
    1) Logar no MongoDB, escolher o DB que foi configurado acima e executar os comandos abaixo:
        1.1) db.createCollection('users');
        1.2) db.users.insert({"name": "Admin", "email": "admin@email.com", "createdAt": new Timestamp(), "updatedAt": new Timestamp()});

    Testar a aplicação
    -------------------------------------------------------
    A documentação se encontra no diretório docs arquivo index.html

    Regra de negócios
    -------------------------------------------------------
    O único EndPoint que não necessita de token é o POST de clientes. Pois, uma vez que o cadastro é aberto para quem desejar ser cliente;
    Os demais EndPoints são baseados na sessão (token), ou seja, uma vez que o cliente esteja autenticado, toda a ação (Listagens, alterações e remoção da wishlist) é realizada conforme dados de sessão.
    Remoção de clientes, somente será efetuada, com o usuário Admin (portanto será necessário logar e realizar a remoção com o token do Admin).