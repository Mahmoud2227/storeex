import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import connectDB from "./config/db";
import products from "./data/DummyProducts";

dotenv.config();
connectDB();

const app = express();

app.use(cors());

app.get("/api/products", (req, res) => {
	res.json(products);
});

app.get("/api/products/:id", (req, res) => {
	// const product = products.find((product) => product._id.toString() === req.params.id);
	// res.json(product);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(chalk.blue.bold(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`) ));
