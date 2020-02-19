const uuid = require('uuid/v4');
const Customer = require('../model/customer');
const User = require('../model/users');

module.exports = (app) => {
    return {
        auth: async (req, res, next) => {
            try {
                let query = { email : req.body.email };
                let cust = await Customer.find(query).limit(1);

                if (cust.length){
                    let customer = cust[0];
                    const token = uuid();

                    await app.cache.setex(token, process.env.TTL, JSON.stringify({ id: customer.id }));
                    return res.status(200).json({ token: token });
                }
                else {
                    let usr = await User.find(query).limit(1);

                    if (usr.length){
                        let user = usr[0];
                        const token = uuid();
    
                        await app.cache.setex(token, process.env.TTL, JSON.stringify({ id: user.id }));
                        return res.status(200).json({ token: token });
                    }
                    else {
                        return res.status(401).json({ errors: { msg: "Credentials is not valid!" } });
                    }
                }
            } catch (error) {
                return res.status(500).json({ errors: error });
            }
        }
    }
}