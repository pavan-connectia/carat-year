import mongoose from "mongoose";

export const databaseConnection = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL environment variable is not defined");
    }

    // Connect to MongoDB
    // Note: If password contains special characters like !, @, #, etc., 
    // they should already be URL-encoded in the MONGO_URL (e.g., ! becomes %21)
    await mongoose.connect(mongoUrl);
    console.log("Database Connected");
  } catch (error: any) {
    console.error("Database Connection Error: ", error.message || error);
    
    // Provide helpful error messages for common issues
    if (error.code === 18 || error.codeName === "AuthenticationFailed") {
      console.error("\n⚠️  MongoDB Authentication Failed!");
      console.error("   Possible causes:");
      console.error("   1. Incorrect username or password in MONGO_URL");
      console.error("   2. MongoDB user doesn't exist or has wrong credentials");
      console.error("   3. Password with special characters (!, @, #, etc.) needs URL encoding");
      console.error("   4. Database user doesn't have proper permissions");
      console.error("\n   Example: mongodb://user:password%21@localhost:27017/dbname");
      console.error("   Special characters: ! = %21, @ = %40, # = %23, $ = %24");
    } else if (error.message?.includes("ECONNREFUSED")) {
      console.error("\n⚠️  Cannot connect to MongoDB!");
      console.error("   Make sure MongoDB is running on localhost:27017");
    }
    
    throw error; // Re-throw to prevent server from starting without DB connection
  }
};

mongoose.connection.on("error", (error) => {
  console.error("Mongoose Connection Error: ", error);
});