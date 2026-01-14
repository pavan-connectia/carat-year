import * as dotenv from "dotenv";
import path from "path";

// Load .env file - try multiple locations
// With ts-node and NodeNext modules, we need to be flexible with paths
const envPaths = [
  path.join(process.cwd(), ".env"), // Current working directory (most reliable)
  path.resolve(".env"), // Absolute path from cwd
];

// Try to load .env file
let envResult: dotenv.DotenvConfigOutput | undefined;
for (const envPath of envPaths) {
  try {
    envResult = dotenv.config({ path: envPath });
    if (envResult.parsed && Object.keys(envResult.parsed).length > 0) {
      console.log(`✓ Loaded ${Object.keys(envResult.parsed).length} environment variables from: ${envPath}`);
      break;
    }
  } catch (error) {
    // Continue to next path
  }
}

// Fallback to default dotenv.config() if explicit paths didn't work
if (!envResult || !envResult.parsed || Object.keys(envResult.parsed).length === 0) {
  console.warn("⚠ Warning: Could not load environment variables from explicit paths. Trying default location...");
  const defaultResult = dotenv.config();
  if (defaultResult.parsed && Object.keys(defaultResult.parsed).length > 0) {
    console.log(`✓ Loaded ${Object.keys(defaultResult.parsed).length} environment variables from default location`);
  } else {
    console.error("✗ Failed to load any environment variables!");
    console.error("  Please ensure a .env file exists in the project root directory.");
  }
}

// Validate required environment variables
if (!process.env.MONGO_URL) {
  console.error("ERROR: MONGO_URL environment variable is not set!");
  process.exit(1);
}

if (!process.env.JWT_SECRET) {
  console.error("ERROR: JWT_SECRET environment variable is not set!");
  process.exit(1);
}

if (!process.env.PORT) {
  console.warn("WARNING: PORT environment variable is not set. Using default port 5000");
  process.env.PORT = "5000";
}
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import compression from "compression";
import { databaseConnection } from "./config/database";
import { shouldCompress } from "./config/compression";
import { errorHandler } from "./middlewares/errorHandler";


import addressRoutes from "./routes/addressRoutes";
import cartRoutes from "./routes/cartRoutes";
import contactFormRoutes from "./routes/contactFormRoutes";
import discountRoutes from "./routes/discountRoutes";
import faqRoutes from "./routes/faqRoutes";
import newsletterSubRoutes from "./routes/newsletterSubRoutes";
import orderRoutes from "./routes/orderRoutes";
import productCategoryRoutes from "./routes/productCategoryRoutes";
import productRoutes from "./routes/productRoutes";
import rateRoutes from "./routes/rateRoutes";
import superAdminRoutes from "./routes/superAdminRoutes";
import testimonialsRoutes from "./routes/testimonialsRoutes";
import uploadRoutes from "./routes/uploadRoutes";
import userRoutes from "./routes/userRoutes";
import wishlistRoutes from "./routes/wishlistRoutes";

import "./cron/deleteOldUsers";

const app = express();

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(compression({ filter: shouldCompress, level: 6 }));

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://carat-years.vercel.app",
    "https://carat-years2.vercel.app",
    "https://carat-years2-admin.vercel.app",
    "https://carat-years-admin.vercel.app",
    "https://carat-years-pi.vercel.app",
    "https://carat-years-admin-pearl.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));


app.get("/", (req: Request, res: Response) => {
  res.send("API is running");
});




app.use("/address", addressRoutes);
app.use("/cart", cartRoutes);
app.use("/contact-form", contactFormRoutes);
app.use("/discount", discountRoutes);
app.use("/faqs", faqRoutes);
app.use("/file", uploadRoutes);
app.use("/newsletter-subscribers", newsletterSubRoutes);
app.use("/order", orderRoutes);
app.use("/product-category", productCategoryRoutes);
app.use("/product", productRoutes);
app.use("/rate", rateRoutes);
app.use("/super-admin", superAdminRoutes);
app.use("/testimonials", testimonialsRoutes);
app.use("/user", userRoutes);
app.use("/wishlist", wishlistRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await databaseConnection();
    const port = process.env.PORT || "5000";
    app.listen(port, () => {
      console.log(`Server Listening @ ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
