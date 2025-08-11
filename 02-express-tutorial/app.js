//console.log('Express Tutorial')
const express = require("express"); // Import express
const app = express(); // Create app instance
const { products, people } = require("./data");
const path = require("path");

const peopleRoutes = require("./routes/people");

app.use(express.static("./public")); //to serve static files like index.html

//week 4
function logger(req, res, next) {
  const time = new Date().toISOString();
  console.log(`[${time}] ${req.method} ${req.url}`);
  next();
}

app.use(express.static(path.join(__dirname, "methods-public")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger);

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

//week 4
// app.get("/api/v1/people", (req, res) => {
//   res.json({ success: true, data: people });
// });

// //post
// app.post("/api/v1/people", (req, res) => {
//   const { name } = req.body;
//   if (!name) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide a name" });
//   }

//   const newPerson = { id: people.length + 1, name };
//   people.push(newPerson);

//   res.status(201).json({ success: true, data: newPerson });
// });

app.use("/api/v1/people", peopleRoutes);
//catch all error
app.all("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000...");
});
