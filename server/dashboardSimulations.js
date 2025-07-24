import cron from "node-cron";
import OverallStat from "./models/OverallStat.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transaction.js";
import User from "./models/User.js";
import AffiliateStat from "./models/AffiliateStat.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} from "./data/index.js";

// Update all dashboard-related values every 10 seconds
export function startDashboardSimulations() {
  if (process.env.NODE_ENV === "production") {
    console.log("Dashboard simulations are disabled in production.");
    return;
  }
  // Update totalCustomers in OverallStat
  cron.schedule("*/10 * * * * *", async () => {
    const stats = await OverallStat.find();
    if (stats.length === 0) return;
    const randomIndex = Math.floor(Math.random() * stats.length);
    const statToUpdate = stats[randomIndex];
    const change = Math.random() < 0.5 ? -1 : 1;
    statToUpdate.totalCustomers = Math.max(0, (statToUpdate.totalCustomers || 0) + change);
    await statToUpdate.save();
    console.log("Updated totalCustomers:", statToUpdate.totalCustomers);
  });

  // Update todayStats.totalSales in OverallStat
  cron.schedule("*/10 * * * * *", async () => {
    const stats = await OverallStat.find();
    if (stats.length === 0) return;
    const randomIndex = Math.floor(Math.random() * stats.length);
    const statToUpdate = stats[randomIndex];
    if (statToUpdate.todayStats && statToUpdate.todayStats.length > 0) {
      const change = Math.floor(Math.random() * 2000) - 1000;
      statToUpdate.todayStats[0].totalSales = Math.max(0, (statToUpdate.todayStats[0].totalSales || 0) + change);
      statToUpdate.markModified('todayStats');
      await statToUpdate.save();
      console.log("Updated todayStats.totalSales:", statToUpdate.todayStats[0].totalSales);
    }
  });

  // Update thisMonthStats.totalSales in OverallStat
  cron.schedule("*/10 * * * * *", async () => {
    const stats = await OverallStat.find();
    if (stats.length === 0) return;
    const randomIndex = Math.floor(Math.random() * stats.length);
    const statToUpdate = stats[randomIndex];
    if (statToUpdate.thisMonthStats && statToUpdate.thisMonthStats.length > 0) {
      const change = Math.floor(Math.random() * 5000) - 2500;
      statToUpdate.thisMonthStats[0].totalSales = Math.max(0, (statToUpdate.thisMonthStats[0].totalSales || 0) + change);
      statToUpdate.markModified('thisMonthStats');
      await statToUpdate.save();
      console.log("Updated thisMonthStats.totalSales:", statToUpdate.thisMonthStats[0].totalSales);
    }
  });

  // Update yearlySalesTotal in OverallStat
  cron.schedule("*/10 * * * * *", async () => {
    const stats = await OverallStat.find();
    if (stats.length === 0) return;
    const randomIndex = Math.floor(Math.random() * stats.length);
    const statToUpdate = stats[randomIndex];
    const change = Math.floor(Math.random() * 10000) - 5000;
    statToUpdate.yearlySalesTotal = Math.max(0, (statToUpdate.yearlySalesTotal || 0) + change);
    await statToUpdate.save();
    console.log("Updated yearlySalesTotal:", statToUpdate.yearlySalesTotal);
  });

  // Update transactions
  cron.schedule("*/10 * * * * *", async () => {
    const transactions = await Transaction.find();
    if (transactions.length === 0) return;
    const randomIndex = Math.floor(Math.random() * transactions.length);
    const sampleIndex = Math.floor(Math.random() * dataTransaction.length);
    const sample = dataTransaction[sampleIndex];
    const { _id, ...transactionData } = sample;
    transactionData.createdOn = new Date();
    const updated = await Transaction.findByIdAndUpdate(
      transactions[randomIndex]._id,
      transactionData,
      { new: true }
    );
    console.log("Updated transaction:", updated);
  });

  // Update products
  cron.schedule("*/10 * * * * *", async () => {
    const products = await Product.find();
    if (products.length === 0) return;
    const randomIndex = Math.floor(Math.random() * products.length);
    const sampleIndex = Math.floor(Math.random() * dataProduct.length);
    const sample = dataProduct[sampleIndex];
    const { _id, ...productData } = sample;
    const updated = await Product.findByIdAndUpdate(
      products[randomIndex]._id,
      productData,
      { new: true }
    );
    console.log("Updated product:", updated);
  });

  // Update product stats
  cron.schedule("*/10 * * * * *", async () => {
    const stats = await ProductStat.find();
    if (stats.length === 0) return;
    const randomIndex = Math.floor(Math.random() * stats.length);
    const sampleIndex = Math.floor(Math.random() * dataProductStat.length);
    const sample = dataProductStat[sampleIndex];
    const { _id, ...statData } = sample;
    const updated = await ProductStat.findByIdAndUpdate(
      stats[randomIndex]._id,
      statData,
      { new: true }
    );
    console.log("Updated product stat:", updated);
  });

  // Update users
  cron.schedule("*/10 * * * * *", async () => {
    const users = await User.find();
    if (users.length === 0) return;
    const randomIndex = Math.floor(Math.random() * users.length);
    const sampleIndex = Math.floor(Math.random() * dataUser.length);
    const sample = dataUser[sampleIndex];
    const { _id, ...userData } = sample;
    const updated = await User.findByIdAndUpdate(
      users[randomIndex]._id,
      userData,
      { new: true }
    );
    console.log("Updated user:", updated);
  });

  // Update affiliate stats
  cron.schedule("*/10 * * * * *", async () => {
    const stats = await AffiliateStat.find();
    if (stats.length === 0) return;
    const randomIndex = Math.floor(Math.random() * stats.length);
    const sampleIndex = Math.floor(Math.random() * dataAffiliateStat.length);
    const sample = dataAffiliateStat[sampleIndex];
    const { _id, ...statData } = sample;
    const updated = await AffiliateStat.findByIdAndUpdate(
      stats[randomIndex]._id,
      statData,
      { new: true }
    );
    console.log("Updated affiliate stat:", updated);
  });
}
