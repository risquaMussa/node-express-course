require("dotenv").config();

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const port = process.env.PORT || 5000;

app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("Task Manager API");
});

const start = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI); //debugging
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
