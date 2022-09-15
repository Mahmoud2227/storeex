import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chalk from "chalk";
import connectDB from "./config/db";
import {notFound, errorHandler} from "./middleware/Error";
import productRoutes from "./routes/product";
import userRoutes from "./routes/user";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
	console.log(chalk.blue.bold(`Server started in ${process.env.NODE_ENV} mode on port ${PORT}`))
);
