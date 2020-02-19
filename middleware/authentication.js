const redis = require('async-redis');

module.exports = async (req, res, next) => {
    //POST DE AUTH E CLIENTES, NÃO VERIFICA TOKEN!!!
    if (req.method === 'POST' && (req.url.includes('auth') || req.url.includes('customer'))) return next();
    let cache = redis.createClient(process.env.REDIS);
    const token = req.headers['token'];
    if (!token) return res.status(401).send({ errors: { msg: 'Token not found!' } });
    const dadosSesao = await cache.get(token);
    if (!dadosSesao) return res.status(401).send({ errors: { msg: 'Invalid token!' } });
    req.sessao = JSON.parse(dadosSesao);
    next();
}