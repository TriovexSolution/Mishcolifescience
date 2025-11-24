import express from "express";

import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
// import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import blogRoutes from "./route/blogRouter.js";
import contactRouter from "./route/contactRouter.js";
import categoryRouter from "./route/categoryRouter.js";
import productRouter from "./route/productRouter.js";
import subscribe from "./route/subscribeRouter.js"
import path from "path";
dotenv.config();
const app = express();
// Connect to MongoDB
connectDB();
app.use('/uploads', express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), 'uploads')));
// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/blogs", blogRoutes);
app.use("/api/contact", contactRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/products", productRouter);
app.use("/api/subscribe",subscribe);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});