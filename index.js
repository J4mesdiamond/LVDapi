const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const paystackRoute = require("./routes/paystack")
const cors = require("cors");

// app.use(cors({
//   origin:"http://localhost:3001" ,
//   methods: ["GET", "POST", "PUT", ""]
// }))

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = ["http://localhost:3000", "http://localhost:3001"];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "", "DELETE" ],
}));


dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", paystackRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});