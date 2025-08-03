//console.log('Express Tutorial')
const express = require("express"); // Import express
const app = express(); // Create app instance
const { products } = require("./data");

app.use(express.static("./public")); //to serve static files like index.html

//to test the route
app.get("/api/v1/test", (req, res) => {
  res.json({ message: "It worked!" });
});

//Route to return all products
app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

//Route to return a single product by ID
app.get("/api/v1/products/:productID", (req, res) => {
  const idToFind = parseInt(req.params.productID); // Convert ID from string to number
  const product = products.find((p) => p.id === idToFind);

  if (!product) {
    return res.status(404).json({ message: "That product was not found." });
  }

  res.json(product);
});

// Route to handle query string filtering
app.get("/api/v1/query", (req, res) => {
  const { search, limit, price } = req.query;
  let result = [...products]; // Copy original array

  if (search) {
    result = result.filter((product) =>
      product.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  if (price) {
    result = result.filter((product) => product.price < parseFloat(price));
  }

  if (limit) {
    result = result.slice(0, parseInt(limit));
  }

  res.json(result);
});

//catch all error
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
