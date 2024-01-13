const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please enter Product Name!'],
        trim:true
    },
    description:{
        type:String,
        required:[true,'Please enter Description']
    },
    price:{
        type:Number,
        required:[true,'Please enter Description'],
        maxLength:[8,'Price cannot excced 8 digits']
    },
    rating:{
        type:Number,
        default:0
    },
    images:[
        {
            // cloudnary will be used for image hosting purpose
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            },
        }
    ],
    category:{
        type:String,
        required:[true,'Please enter Category, e.g.fruit']
    },
    stock:{
        type:Number,
        required:true
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product",productSchema)