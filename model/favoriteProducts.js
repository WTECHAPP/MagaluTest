var mongoose = require('../db');
var Schema = mongoose.Schema;

var ProductsSchema = new Schema(
    {
        id: {
            type: String
        },
        title: {
            type: String
        },
        image: {
            type: String
        },
        price: {
            type: mongoose.Schema.Types.Decimal128
        }
    },
    { _id: false }
);

ProductsSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.price = ret.price.toString();
        return ret;
    },
});

var FavotireProductsSchema = new Schema(
    {
        customerid: {
            type: String
        },
        products: {
            type: [ProductsSchema]
        }
    }, 
    { 
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
    }
);

const FavotireProducts = mongoose.model('favotireproducts', FavotireProductsSchema);
module.exports = FavotireProducts;

// module.exports = () => {
//     var mongoose = require('../db');

//     var Schema = mongoose.Schema;

//     var ProductsSchema = new Schema(
//         {
//             id: {
//                 type: String
//             },
//             title: {
//                 type: String
//             },
//             image: {
//                 type: String
//             },
//             price: {
//                 type: mongoose.Schema.Types.Decimal128
//             }
//         },
//         { _id: false }
//     );
    
//     var FavotireProductsSchema = new Schema(
//         {
//             customerid: {
//                 type: String
//             },
//             products: {
//                 type: [ProductsSchema]
//             }
//         }, 
//         { 
//             timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
//         }
//     );

//     const FavotireProducts = mongoose.model('favotireproducts', FavotireProductsSchema);
//     return FavotireProducts;
// }