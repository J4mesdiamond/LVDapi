const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    title: { type: String, required: true, unique:true },
    desc: [
        {
            productID: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
},
{timestamps: true}
);

module.exports = mongoose.model( "Cart" ,CartSchema);