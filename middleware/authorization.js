const User = require('../model/users');

module.exports = async (req, res, next) => {
    if (req.method === 'DELETE' && req.url.includes('customer')) {
        let query = { _id: req.sessao.id };
        let usr = await User.find(query).limit(1);

        if (usr.length) 
            return next();
        else 
            return res.status(403).send({ errors: { msg: 'This method is not allowed!' } });
    } 
    else {
        return next();
    }
}