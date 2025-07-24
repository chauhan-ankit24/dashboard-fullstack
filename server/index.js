import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import cron from "node-cron";
import { startDashboardSimulations } from "./dashboardSimulations.js";

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    // Start all dashboard value simulations (every 10 seconds)
    startDashboardSimulations();

    // Simulate updating an existing overall stat every 3 seconds for graph demo
    cron.schedule("*/10 * * * * *", async () => {
      const stats = await OverallStat.find();
      if (stats.length === 0) return;
      const randomIndex = Math.floor(Math.random() * stats.length);
      const statToUpdate = stats[randomIndex];

      const monthIndex = Math.floor(Math.random() * statToUpdate.monthlyData.length);
      statToUpdate.monthlyData[monthIndex].totalSales = Math.floor(Math.random() * 10000);
      statToUpdate.markModified('monthlyData');
      await statToUpdate.save();
      console.log("Updated monthly sales for graph:", statToUpdate.monthlyData[monthIndex]);
    });

    // // Simulate updating an existing product every 3 seconds
    // cron.schedule("*/10 * * * * *", async () => {
    //   const products = await Product.find();
    //   if (products.length === 0) return;
    //   const randomIndex = Math.floor(Math.random() * products.length);
    //   const productToUpdate = products[randomIndex];
    //   const sampleIndex = Math.floor(Math.random() * dataProduct.length);
    //   const sample = dataProduct[sampleIndex];
    //   const { _id, ...productData } = sample;
    //   const updated = await Product.findByIdAndUpdate(
    //     productToUpdate._id,
    //     productData,
    //     { new: true }
    //   );
    //   console.log("Updated product:", updated);
    // });

    // // Simulate updating an existing product stat every 3 seconds
    // cron.schedule("*/10 * * * * *", async () => {
    //   const stats = await ProductStat.find();
    //   if (stats.length === 0) return;
    //   const randomIndex = Math.floor(Math.random() * stats.length);
    //   const statToUpdate = stats[randomIndex];
    //   const sampleIndex = Math.floor(Math.random() * dataProductStat.length);
    //   const sample = dataProductStat[sampleIndex];
    //   const { _id, ...statData } = sample;
    //   const updated = await ProductStat.findByIdAndUpdate(
    //     statToUpdate._id,
    //     statData,
    //     { new: true }
    //   );
    //   console.log("Updated product stat:", updated);
    // });

    // // Simulate updating an existing user every 3 seconds
    // cron.schedule("*/10 * * * * *", async () => {
    //   const users = await User.find();
    //   if (users.length === 0) return;
    //   const randomIndex = Math.floor(Math.random() * users.length);
    //   const userToUpdate = users[randomIndex];
    //   const sampleIndex = Math.floor(Math.random() * dataUser.length);
    //   const sample = dataUser[sampleIndex];
    //   const { _id, ...userData } = sample;
    //   const updated = await User.findByIdAndUpdate(
    //     userToUpdate._id,
    //     userData,
    //     { new: true }
    //   );
    //   console.log("Updated user:", updated);
    // });

    // // Simulate updating an existing affiliate stat every 3 seconds
    // cron.schedule("*/10 * * * * *", async () => {
    //   const stats = await AffiliateStat.find();
    //   if (stats.length === 0) return;
    //   const randomIndex = Math.floor(Math.random() * stats.length);
    //   const statToUpdate = stats[randomIndex];
    //   const sampleIndex = Math.floor(Math.random() * dataAffiliateStat.length);
    //   const sample = dataAffiliateStat[sampleIndex];
    //   const { _id, ...statData } = sample;
    //   const updated = await AffiliateStat.findByIdAndUpdate(
    //     statToUpdate._id,
    //     statData,
    //     { new: true }
    //   );
    //   console.log("Updated affiliate stat:", updated);
    // });
  })
  .catch((error) => console.log(`${error} did not connect`));
