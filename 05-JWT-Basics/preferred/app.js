require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const authRoutes = require("./src/routes/auth");
app.use("/api/v1", authRoutes);

app.use((req, res) => res.status(404).json({ message: "route not found" }));

const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
