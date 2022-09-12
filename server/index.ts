import express from "express";
import cors from "cors";
import products from "./DummyProducts";

const app = express();

app.use(cors());

app.get("/api/products", (req, res) => {
	res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((product) => product._id.toString() === req.params.id);
	res.json(product);
});

app.listen(5000, () => console.log("Server started on port 5000"));
