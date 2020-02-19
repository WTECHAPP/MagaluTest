const { param, body, validationResult } = require('express-validator');

module.exports = (app) => {
    /**
     * @api {post} v1/auth
     * @apiName Auth
     * @apiGroup Authentication
     * @apiDescription EndPoint responsável por conceder permissão de acesso aos clientes/usuários. Tal valor deverá ser enviado no HEADER das requisições.
     * 
     * @apiParam {String} email E-mail de cliente (customer) ou admin (user) já cadastrado no sistema.
     * 
     * @apiSuccess {String} token Token de permissao de acesso aos EndPoints.
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
     * HTTP/1.1 401 Unauthorized
     * {
     * "msg": "Credentials is not valid!"
     * }
     */
    app.post("/v1/auth",
    [
        body('email').isEmail()
    ], async (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        return await app.service.autenticacao.auth(req, res, next);
    });
}