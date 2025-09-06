//console.log('04 Store API')
require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const productsRouter = require("./routes/products");
app.use("/api/v1/products", productsRouter);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    //console.log("MONGO_URI:", process.env.MONGO_URI);
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
