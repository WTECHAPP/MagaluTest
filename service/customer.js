const Customer = require('../model/customer');
const FavotireProducts = require('../model/favoriteProducts');
const uuid = require('uuid/v4');

module.exports = (app) => {
    return {
        consult: async (req, res, next) => {
            try {
                let cust = await Customer.findById({ _id: req.sessao.id });

                if (cust !== null){
                    return res.status(200).json({ id: cust.id, name: cust.name, email: cust.email });
                }
                else {
                    // return res.status(400).json({msg: "Customer doesn't found."});
                    cust = await Customer.findById({ });
                    return res.status(200).json(cust);
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        insert: async (req, res, next) => {
            try {
                let options = { new: true, upsert: true, setDefaultsOnInsert: true, useFindAndModify: false };
                let query = { email : req.body.email };
                let data = { name : req.body.name, email : req.body.email };

                let cust = await Customer.find(query).limit(1);

                if (cust.length){
                    return res.status(400).json({msg: "E-mail already exist."});
                }
                else {
                    let token = req.headers['token'];
                    if (token == null) {
                        token = uuid();
                        cust = await Customer.findOneAndUpdate(query, data, options);
                        await app.cache.setex(token, process.env.TTL, JSON.stringify({ id: cust.id }));
                    }
    
                    return res.status(200).json({token: token});
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        update: async (req, res, next) => {
            try {
                let options = {
                    new: true,
                    upsert: true,
                    setDefaultsOnInsert: true,
                    useFindAndModify: false
                };
                let query = { email : req.body.email };
                let data = { name : req.body.name, email : req.body.email };

                let cust = await Customer.find(query).limit(1);

                if (cust.length){
                    cust = await Customer.findOneAndUpdate(query, data, options);
    
                    return res.status(200).json({msg: "Customer saved successfully."});
                }
                else {
                    return res.status(400).json({msg: "E-mail doesn't exist."});
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        remove: async (req, res, next) => {
            try {
                let cust = await Customer.findOneAndDelete({ _id: req.params.id });

                if (cust !== null){
                    let query = { customerid: req.params.id };
                    let fpa = await FavotireProducts.find(query).limit(1);

                    if (fpa.length){
                        for (fp of fpa) {
                            let del = await FavotireProducts.findOneAndDelete({ _id: fp.id });
                        }
                    }

                    return res.status(200).json({ msg: "Customer removed successfully." });
                }
                else {
                    return res.status(400).json({ msg: "Customer doesn't found." });
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
}