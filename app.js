require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const cookiParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth.js")
const userRoutes = require("./routes/user.js")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")



const port = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE,
 {  useNewUrlParser: true,
     useUnifiedTopology: true,
    useCreateIndex: true
    }).then(()=>{
        console.log("DB CONNECTED")
    });

//middlewair
    app.use(bodyParser.json());
    app.use(cookiParser());
    app.use(cors());


//routes
    app.use("/api", authRoutes);
    app.use("/api", userRoutes);
    app.use("/api", categoryRoutes);
    app.use("/api", productRoutes);
    app.use("/api", orderRoutes);




 app.listen(port, ()=>{
    console.log(`app is running at ${port}`);   
 })