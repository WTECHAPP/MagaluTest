const { param, body, validationResult } = require('express-validator');

module.exports = (app) => {
    /**
     * @api {get} v1/customer/
     * @apiName Consult
     * @apiGroup Customer
     * @apiDescription EndPoint responsável por consultar a lista de clientes. Somente exibirá os dados do cliente que estiver logado (token).
     * 
     * @apiHeaderExample {json} Header-Example:
     * {
     * "Content-Type": "application/json"
     * "token": "521c8a93-401e-4b4b-964f-a4079e54cfde"
     * }
     * 
     * @apiSuccess {String} id ID do cliente junto ao sistema.
     * @apiSuccess {String} name Nome do cliente junto ao sistema.
     * @apiSuccess {String} email E-mail do cliente junto ao sistema.
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "id": "5e4ca0f38f5fb836dd7b47b0",
     * "name": "teste",
     * "email": "teste@email.com"
     * }
     * 
     * @apiError email Credentials is not valid!
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 401 Unauthorized
     * {
     * "msg": "Invalid Token!"
     * }
     */
    app.get("/v1/customer/", async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        return await app.service.customer.consult(req, res, next);
    });

    /**
     * @api {post} v1/customer/
     * @apiName Insert
     * @apiGroup Customer
     * @apiDescription EndPoint responsável pelo cadastro do cliente. Este é o único EndPoint que não necessita de estar logado (token).
     * 
     * @apiParam {String} name Nome do cliente que irá se cadastrar.
     * @apiParam {String} email E-mail do cliente que irá se cadastrar.
     * 
     * @apiSuccess {String} token Token de permissao de acesso.
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "token": "881c99f2-c2ab-4886-8bf0-f5e3a9c26739"
     * }
     * 
     * @apiError email Email has invalid value!
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     * "errors": [
     * {
     * "value": "teste2343gmail.com",
     * "msg": "Invalid value",
     * "param": "email",
     * "location": "body"
     * }
     * ]
     * }
     */
    app.post("/v1/customer/", [body('name').not().isEmpty(), body('email').isEmail()], async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        return await app.service.customer.insert(req, res, next);
    });

    /**
     * @api {put} v1/customer/
     * @apiName Update
     * @apiGroup Customer
     * @apiDescription EndPoint responsável por alterar o cadastro do cliente logado (token).
     * 
     * @apiHeaderExample {json} Header-Example:
     * {
     * "Content-Type": "application/json"
     * "token": "521c8a93-401e-4b4b-964f-a4079e54cfde"
     * }
     * 
     * @apiParam {String} name Nome do cliente à alterar.
     * @apiParam {String} email E-mail do cliente, este não será alterado.
     * 
     * @apiSuccess {String} token Token de permissao de acesso.
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "token": "881c99f2-c2ab-4886-8bf0-f5e3a9c26739"
     * }
     * 
     * @apiError email Credentials is not valid!
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     * "errors": [
     * {
     * "value": "teste2343gmail.com",
     * "msg": "Invalid value",
     * "param": "email",
     * "location": "body"
     * }
     * ]
     * }
     */
    app.put("/v1/customer/", [body('name').not().isEmpty(), body('email').isEmail()], async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        return await app.service.customer.update(req, res, next);
    });

    /**
     * @api {delete} v1/customer/:id
     * @apiName Remove
     * @apiGroup Customer
     * @apiDescription EndPoint responsável por remover o cadastro do cliente. Tal EndPoint somente pode ser utilizado com o usuário Admin logado (token).
     * 
     * @apiHeaderExample {json} Header-Example:
     * {
     * "Content-Type": "application/json"
     * "token": "524cfde3-401e-4b4b-964f-a4079e51c8a9"
     * }
     * 
     * @apiParam {String} id ID do cliente que irá ser removido.
     * 
     * @apiSuccess {String} msg Mensagem indicativa de remoção do cadastro.
     * 
     * @apiSuccessExample Success-Response:
     * HTTP/1.1 200 OK
     * {
     * "msg": "Customer removed successfully."
     * }
     * 
     * @apiError msg Mensagem indicativa do porquê da falha na remoção!
     * 
     * @apiErrorExample Error-Response:
     * HTTP/1.1 400 Bad Request
     * {
     * "msg": "Customer doesn't found."
     * }
     */
    app.delete("/v1/customer/:id", [param('id').not().isEmpty()], async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        return await app.service.customer.remove(req, res, next);
    });
}