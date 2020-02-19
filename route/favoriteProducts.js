const { param, body, validationResult } = require('express-validator');

module.exports = (app) => {
    /**
     * @api {get} v1/favorite-products/
     * @apiName Consult
     * @apiGroup Favorite Products
     * @apiDescription EndPoint responsável por consultar a lista de produtos favoritos do cliente que estiver logado (token).
     * 
     * @apiHeaderExample {json} Header-Example:
     * {
     * "Content-Type": "application/json"
     * "token": "521c8a93-401e-4b4b-964f-a4079e54cfde"
     * }
     * 
     * @apiSuccess {String} id ID do produto salvo como favorito.
     * @apiSuccess {String} title Título do produto.
     * @apiSuccess {String} image Path da imagem do produto.
     * @apiSuccess {Decimal} price Preço do produto salvo como favorito.
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * [
     * {
     * "id":"de2911eb-ce5c-e783-1ca5-82d0ccd4e3d8",
     * "title":"Película Protetora para Samsung Galaxy S6",
     * "image":"http://challenge-api.luizalabs.com/images/de2911eb-ce5c-e783-1ca5-82d0ccd4e3d8.jpg",
     * "price":{"$numberDecimal":"39.9"}
     * }
     * ]
     * 
     * @apiError msg Mensagem explicativa de não haver produtos como favoritos.
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 401 Unauthorized
     * {
     * "msg": "No more favorite products."
     * }
     */
    app.get("/v1/favorite-products/", async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        return await app.service.favoriteProducts.consult(req, res, next);
    });

    /**
     * @api {post} v1/favorite-products/
     * @apiName Insert
     * @apiGroup Favorite Products
     * @apiDescription EndPoint responsável pelo cadastro do produto como favorito do cliente logado (token).
     * 
     * @apiHeaderExample {json} Header-Example:
     * {
     * "Content-Type": "application/json"
     * "token": "521c8a93-401e-4b4b-964f-a4079e54cfde"
     * }
     * 
     * @apiParam {String} productid ID do produto conforme documento fornecido no teste (http://challenge-api.luizalabs.com/api/product/?page=1).
     * 
     * @apiSuccess {String} msg Mensagem explicativa, indicando o sucesso do cadastro.
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "msg": "Product saved successfully."
     * }
     * 
     * @apiError product Product doesnt't found!
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     * "msg": "Product doesnt't found!"
     * }
     */
    app.post("/v1/favorite-products/", [body('productid').not().isEmpty()], async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        return await app.service.favoriteProducts.insert(req, res, next);
    });

    /**
     * @api {delete} v1/favorite-products/:id
     * @apiName Remove
     * @apiGroup Favorite Products
     * @apiDescription EndPoint responsável por remover o cadastro do produto na lista de favoritos do cliente (logado).
     * 
     * @apiHeaderExample {json} Header-Example:
     * {
     * "Content-Type": "application/json"
     * "token": "524cfde3-401e-4b4b-964f-a4079e51c8a9"
     * }
     * 
     * @apiParam {String} id ID do produto que irá ser removido.
     * 
     * @apiSuccess {String} msg Mensagem indicativa de remoção do cadastro.
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "msg": "Product removed successfully."
     * }
     * 
     * @apiError msg Mensagem indicativa do porquê da falha na remoção!
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     * "msg": "Product doesn't found."
     * }
     */
    app.delete("/v1/favorite-products/:id", async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        return await app.service.favoriteProducts.remove(req, res, next);
    });
}