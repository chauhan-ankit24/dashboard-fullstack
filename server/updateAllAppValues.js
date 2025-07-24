import cron from "node-cron";
import User from "../models/User.js";
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transaction.js";
import OverallStat from "../models/OverallStat.js";
import AffiliateStat from "../models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "../data/index.js";

// Update all values in all collections every 10 seconds
export function updateAllAppValues() {
  // Users
  cron.schedule("*/10 * * * * *", async () => {
    const users = await User.find();
    if (users.length === 0) return;
    const randomIndex = Math.floor(Math.random() * users.length);
    const sampleIndex = Math.floor(Math.random() * dataUser.length);
    const sample = dataUser[sampleIndex];
    const { _id, ...userData } = sample;
    await User.findByIdAndUpdate(users[randomIndex]._id, userData, { new: true });
    console.log("Updated user");
  });

  // Products
  cron.schedule("*/10 * * * * *", async () => {
    const products = await Product.find();
    if (products.length === 0) return;
    const randomIndex = Math.floor(Math.random() * products.length);
    const sampleIndex = Math.floor(Math.random() * dataProduct.length);
    const sample = dataProduct[sampleIndex];
    const { _id, ...productData } = sample;
    await Product.findByIdAndUpdate(products[randomIndex]._id, productData, { new: true });
    console.log("Updated product");
  });

  // ProductStats
  cron.schedule("*/10 * * * * *", async () => {
    const stats = await ProductStat.find();
    if (stats.length === 0) return;
    const randomIndex = Math.floor(Math.random() * stats.length);
    const sampleIndex = Math.floor(Math.random() * dataProductStat.length);
    const sample = dataProductStat[sampleIndex];
    const { _id, ...statData } = sample;
    await ProductStat.findByIdAndUpdate(stats[randomIndex]._id, statData, { new: true });
    console.log("Updated product stat");
  });

  // Transactions
  cron.schedule("*/10 * * * * *", async () => {
    const transactions = await Transaction.find();
    if (transactions.length === 0) return;
    const randomIndex = Math.floor(Math.random() * transactions.length);
    const sampleIndex = Math.floor(Math.random() * dataTransaction.length);
    const sample = dataTransaction[sampleIndex];
    const { _id, ...transactionData } = sample;
    transactionData.createdOn = new Date();
    await Transaction.findByIdAndUpdate(transactions[randomIndex]._id, transactionData, { new: true });
    console.log("Updated transaction");
  });

  // OverallStats
  cron.schedule("*/10 * * * * *", async () => {
    const stats = await OverallStat.find();
    if (stats.length === 0) return;
    const randomIndex = Math.floor(Math.random() * stats.length);
    const sampleIndex = Math.floor(Math.random() * dataOverallStat.length);
    const sample = dataOverallStat[sampleIndex];
    const { _id, ...overallData } = sample;
    await OverallStat.findByIdAndUpdate(stats[randomIndex]._id, overallData, { new: true });
    console.log("Updated overall stat");
  });

  // AffiliateStats
  cron.schedule("*/10 * * * * *", async () => {
    const stats = await AffiliateStat.find();
    if (stats.length === 0) return;
    const randomIndex = Math.floor(Math.random() * stats.length);
    const sampleIndex = Math.floor(Math.random() * dataAffiliateStat.length);
    const sample = dataAffiliateStat[sampleIndex];
    const { _id, ...statData } = sample;
    await AffiliateStat.findByIdAndUpdate(stats[randomIndex]._id, statData, { new: true });
    console.log("Updated affiliate stat");
  });
}
