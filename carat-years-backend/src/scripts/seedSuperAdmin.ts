import * as dotenv from "dotenv";
import path from "path";

// Load environment variables
const envPath = path.resolve(process.cwd(), ".env");
dotenv.config({ path: envPath });

import mongoose from "mongoose";
import { SuperAdmin } from "../models/SuperAdmin";

const seedSuperAdmin = async () => {
  try {
    // Connect to database directly
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is not defined");
    }

    console.log("Connecting to MongoDB...");
    await mongoose.connect(mongoUrl);
    console.log("✓ Database Connected\n");

    const email = "mithun@connectia.in";
    const password = "123456";
    const name = "Mithun"; // Extracted from email or you can change this

    // Check if superadmin already exists
    const existingSuperAdmin = await SuperAdmin.findOne({ email });

    if (existingSuperAdmin) {
      console.log(`\n⚠️  SuperAdmin with email ${email} already exists!`);
      console.log(`   ID: ${existingSuperAdmin._id}`);
      console.log(`   Name: ${existingSuperAdmin.name}`);
      console.log(`   Email: ${existingSuperAdmin.email}`);
      console.log(`   Role: ${existingSuperAdmin.role}`);
      console.log(`\n   Skipping seed to prevent overwriting existing data.`);
      console.log(`   If you want to update, delete the existing user first.\n`);
      
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create new superadmin
    // The password will be automatically hashed by the pre-save hook in the model
    const superAdmin = await SuperAdmin.create({
      name,
      email,
      password, // Will be hashed automatically by the model's pre-save hook
      role: "SuperAdmin",
    });

    console.log("\n✅ SuperAdmin created successfully!");
    console.log(`   ID: ${superAdmin._id}`);
    console.log(`   Name: ${superAdmin.name}`);
    console.log(`   Email: ${superAdmin.email}`);
    console.log(`   Role: ${superAdmin.role}`);
    console.log(`   Password: ${password} (hashed in database)`);
    console.log(`\n   You can now login with:`);
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}\n`);

    // Close database connection
    await mongoose.connection.close();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error: any) {
    console.error("\n❌ Error seeding SuperAdmin:", error.message || error);
    
    // Handle duplicate key error
    if (error.code === 11000) {
      console.error("\n⚠️  Duplicate email detected. User might already exist.");
    }
    
    await mongoose.connection.close();
    process.exit(1);
  }
};

// Run the seed function
seedSuperAdmin();

