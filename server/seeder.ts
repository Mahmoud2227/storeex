import dotenv from "dotenv";
import chalk from "chalk";
import users from "./data/DummyUsers";
import products from "./data/DummyProducts";
import User from "./models/User";
import Product from "./models/Product";
import Order from "./models/Order";
import connectDB from "./config/db";

dotenv.config();
console.log(process.env.MONGO_URL);
connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    })

    await Product.insertMany(sampleProducts);

    console.log(chalk.green.inverse("Data Imported!"));
    process.exit(1);
  } catch (error) {
    console.error(chalk.red.inverse(`${error}`));
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log(chalk.red.inverse("Data Destroyed!"));
    process.exit(1);
  } catch (error) {
    console.error(chalk.red.inverse(`${error}`));
    process.exit(1);
  }
}

if (process.argv[2] === "-d") {
  destroyData();
}
else {
  importData();
}