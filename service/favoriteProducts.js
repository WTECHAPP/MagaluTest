let request = require('async-request'),
    response;
const FavotireProducts = require('../model/favoriteProducts');

const save = async (fvr, customerId, productId) => {
    response = await request(`http://challenge-api.luizalabs.com/api/product/${productId}`);

    if (response.statusCode === 200){
        let options = { new: true, upsert: true, setDefaultsOnInsert: true, useFindAndModify: false };
        let query = { "customerid": customerId };
        let body = JSON.parse(response.body);
        let prd = { id: body.id, title: body.title, image: body.image, price: body.price };

        if (fvr === null){
            fvr = { customerid: customerId, products: [] };
        }
        fvr.products.push(prd);

        fp = await FavotireProducts.findOneAndUpdate(query, fvr, options);
    
        return true;
    }
    else {
        return false;
    }
}

module.exports = (app) => {
    return {
        consult: async (req, res, next) => {
            try {
                let query = { customerid: req.sessao.id };
                
                let fpa = await FavotireProducts.find(query).limit(1);

                if (fpa.length){
                    let fp = fpa[0];
                    return res.status(200).json(fp.products);
                }
                else {
                    return res.status(400).json({msg: "No more favorite products."});
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        insert: async (req, res, next) => {
            try {
                let custId = req.sessao.id;
                
                let query = { customerid: custId };
                let fpa = await FavotireProducts.find(query).limit(1);
                
                if (fpa.length){
                    let fp = fpa[0];
                    let prd = fp.products.filter(p => { return p.id === req.body.productid });
                    if (prd.length) {
                        return res.status(400).json({msg: "This product is in the list, already!"});
                    }
                    else {
                        if (await save(fp, custId, req.body.productid)) {
                            return res.status(200).json({msg: "Product saved successfully."});
                        }
                        else {
                            return res.status(400).json({msg: "Product doesnt't found."});
                        }
                    }
                }
                else {
                    if (await save(null, custId, req.body.productid)) {
                        return res.status(200).json({msg: "Product saved successfully."});
                    }
                    else {
                        return res.status(400).json({msg: "Product doesnt't found."});
                    }
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        },
        remove: async (req, res, next) => {
            try {
                let query = { customerid: req.sessao.id };
                
                let fpa = await FavotireProducts.find(query).limit(1);
                
                if (fpa.length){
                    let fp = fpa[0];
                    let prds = fp.products.filter(p => { return p.id !== req.params.id });

                    if (prds.length > 0){
                        fp.products = prds;

                        let options = { new: true, upsert: true, setDefaultsOnInsert: true, useFindAndModify: false };
                        let udp = await FavotireProducts.findByIdAndUpdate(fp._id, { $set: fp }, options);

                        return res.status(200).json({msg: "Product removed successfully."});
                    }
                    else {
                        let del = await FavotireProducts.findOneAndDelete(query);

                        return res.status(200).json({msg: "No more favorite products."});
                    }
                }
                else {
                    return res.status(200).json({msg: "You don't have favorite products more."});
                }
            } catch (error) {
                return res.status(500).json(error);
            }
        }
    }
}