import mongoose from "mongoose";

let isConnected = false; // to check if mongoose is connected or not

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
  if (isConnected) return console.log("Already connected to MongoDB");

  try {
    // const conn = await mongoose
    //   .createConnection(process.env.MONGODB_URL)
    //   .asPromise();
    // conn.readyState;
    // isConnected = true;
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => {
        console.log("Connected to MongoDB");
      })
      .catch((error) => {
        console.log(process.env.MONGODB_URL);
        console.error("Error connecting to MongoDB:", error);
      });
  } catch (error) {
    console.log(error);
  }
};

// Check the connection status
//   const db = mongoose.connection;
//   db.on("error", (error) => {
//     console.error("MongoDB connection error:", error);
//   });
//   db.once("open", () => {
//     console.log("Connected to MongoDB!");
//   });

//   // Check if the connection is established
//   if (mongoose.connection.readyState === 1) {
//     console.log("Mongoose connection is established.");
//   } else {
//     console.log("Mongoose connection is not established.");
//   }
// };
