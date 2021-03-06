define({ "api": [
  {
    "type": "post",
    "url": "v1/auth",
    "title": "",
    "name": "Auth",
    "group": "Authentication",
    "description": "<p>EndPoint responsável por conceder permissão de acesso aos clientes/usuários. Tal valor deverá ser enviado no HEADER das requisições.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail de cliente (customer) ou admin (user) já cadastrado no sistema.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de permissao de acesso aos EndPoints.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"token\": \"881c99f2-c2ab-4886-8bf0-f5e3a9c26739\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "email",
            "description": "<p>Credentials is not valid!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\"msg\": \"Credentials is not valid!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "route/autenticacao.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "v1/customer/",
    "title": "",
    "name": "Consult",
    "group": "Customer",
    "description": "<p>EndPoint responsável por consultar a lista de clientes. Somente exibirá os dados do cliente que estiver logado (token).</p>",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Content-Type\": \"application/json\"\n\"token\": \"521c8a93-401e-4b4b-964f-a4079e54cfde\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID do cliente junto ao sistema.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome do cliente junto ao sistema.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do cliente junto ao sistema.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"id\": \"5e4ca0f38f5fb836dd7b47b0\",\n\"name\": \"teste\",\n\"email\": \"teste@email.com\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "email",
            "description": "<p>Credentials is not valid!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\"msg\": \"Invalid Token!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "route/customer.js",
    "groupTitle": "Customer"
  },
  {
    "type": "post",
    "url": "v1/customer/",
    "title": "",
    "name": "Insert",
    "group": "Customer",
    "description": "<p>EndPoint responsável pelo cadastro do cliente. Este é o único EndPoint que não necessita de estar logado (token).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome do cliente que irá se cadastrar.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do cliente que irá se cadastrar.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de permissao de acesso.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"token\": \"881c99f2-c2ab-4886-8bf0-f5e3a9c26739\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "email",
            "description": "<p>Email has invalid value!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\"errors\": [\n{\n\"value\": \"teste2343gmail.com\",\n\"msg\": \"Invalid value\",\n\"param\": \"email\",\n\"location\": \"body\"\n}\n]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "route/customer.js",
    "groupTitle": "Customer"
  },
  {
    "type": "delete",
    "url": "v1/customer/:id",
    "title": "",
    "name": "Remove",
    "group": "Customer",
    "description": "<p>EndPoint responsável por remover o cadastro do cliente. Tal EndPoint somente pode ser utilizado com o usuário Admin logado (token).</p>",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Content-Type\": \"application/json\"\n\"token\": \"524cfde3-401e-4b4b-964f-a4079e51c8a9\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID do cliente que irá ser removido.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Mensagem indicativa de remoção do cadastro.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"msg\": \"Customer removed successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "msg",
            "description": "<p>Mensagem indicativa do porquê da falha na remoção!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\"msg\": \"Customer doesn't found.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "route/customer.js",
    "groupTitle": "Customer"
  },
  {
    "type": "put",
    "url": "v1/customer/",
    "title": "",
    "name": "Update",
    "group": "Customer",
    "description": "<p>EndPoint responsável por alterar o cadastro do cliente logado (token).</p>",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Content-Type\": \"application/json\"\n\"token\": \"521c8a93-401e-4b4b-964f-a4079e54cfde\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Nome do cliente à alterar.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>E-mail do cliente, este não será alterado.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token de permissao de acesso.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"token\": \"881c99f2-c2ab-4886-8bf0-f5e3a9c26739\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "email",
            "description": "<p>Credentials is not valid!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\"errors\": [\n{\n\"value\": \"teste2343gmail.com\",\n\"msg\": \"Invalid value\",\n\"param\": \"email\",\n\"location\": \"body\"\n}\n]\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "route/customer.js",
    "groupTitle": "Customer"
  },
  {
    "type": "get",
    "url": "v1/favorite-products/",
    "title": "",
    "name": "Consult",
    "group": "Favorite_Products",
    "description": "<p>EndPoint responsável por consultar a lista de produtos favoritos do cliente que estiver logado (token).</p>",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Content-Type\": \"application/json\"\n\"token\": \"521c8a93-401e-4b4b-964f-a4079e54cfde\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID do produto salvo como favorito.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Título do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>Path da imagem do produto.</p>"
          },
          {
            "group": "Success 200",
            "type": "Decimal",
            "optional": false,
            "field": "price",
            "description": "<p>Preço do produto salvo como favorito.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n[\n{\n\"id\":\"de2911eb-ce5c-e783-1ca5-82d0ccd4e3d8\",\n\"title\":\"Película Protetora para Samsung Galaxy S6\",\n\"image\":\"http://challenge-api.luizalabs.com/images/de2911eb-ce5c-e783-1ca5-82d0ccd4e3d8.jpg\",\n\"price\":{\"$numberDecimal\":\"39.9\"}\n}\n]",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "msg",
            "description": "<p>Mensagem explicativa de não haver produtos como favoritos.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Unauthorized\n{\n\"msg\": \"No more favorite products.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "route/favoriteProducts.js",
    "groupTitle": "Favorite_Products"
  },
  {
    "type": "post",
    "url": "v1/favorite-products/",
    "title": "",
    "name": "Insert",
    "group": "Favorite_Products",
    "description": "<p>EndPoint responsável pelo cadastro do produto como favorito do cliente logado (token).</p>",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Content-Type\": \"application/json\"\n\"token\": \"521c8a93-401e-4b4b-964f-a4079e54cfde\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "productid",
            "description": "<p>ID do produto conforme documento fornecido no teste (http://challenge-api.luizalabs.com/api/product/?page=1).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Mensagem explicativa, indicando o sucesso do cadastro.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"msg\": \"Product saved successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "product",
            "description": "<p>Product doesnt't found!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\"msg\": \"Product doesnt't found!\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "route/favoriteProducts.js",
    "groupTitle": "Favorite_Products"
  },
  {
    "type": "delete",
    "url": "v1/favorite-products/:id",
    "title": "",
    "name": "Remove",
    "group": "Favorite_Products",
    "description": "<p>EndPoint responsável por remover o cadastro do produto na lista de favoritos do cliente (logado).</p>",
    "header": {
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n\"Content-Type\": \"application/json\"\n\"token\": \"524cfde3-401e-4b4b-964f-a4079e51c8a9\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID do produto que irá ser removido.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Mensagem indicativa de remoção do cadastro.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n\"msg\": \"Product removed successfully.\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "msg",
            "description": "<p>Mensagem indicativa do porquê da falha na remoção!</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n\"msg\": \"Product doesn't found.\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "route/favoriteProducts.js",
    "groupTitle": "Favorite_Products"
  }
] });
