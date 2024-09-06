const mongoose = require("mongoose");

let isConnected = false;

export const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB connected! ✅");
  } catch (error) {
    console.log(error);
  }
};
