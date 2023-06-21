const express = require('express');
const paystack = require("paystack")(process.env.PAYSTACK_KEY);

const app = express();
app.use(express.json());
app.post("/payment", (req, res) => {
    paystack.charges.create(
    {
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "Naira",
    },
    (paystackErr, paystackRes) => {
        if (paystackErr) {
            res.status(500).json(paystackErr);
        } else {
            res.status(200).json(paystackRes);
            }
        }
    );
});

module.exports = app;