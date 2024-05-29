import dotenv from "dotenv";
import cloudinary from "cloudinary";
import Razorpay from "razorpay";
import { app } from "./src/app.js";
import { connectToDb } from "./src/dbConnection/db.js";

// dotenv.config({
//   path: "./env",
// });
dotenv.config();

const PORT = process.env.PORT || 6001;

app.get("/", (req, res) => {
  res.json("Hello!!😊");
});

app.all("*", (_req, res) => {
  res.status(404).send("OOPS!! 404 page not found");
});

// cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

connectToDb()
  .then(() => {
    app.on("error", (error) => {
      console.log("Error: ", error);
      throw error;
    });
    app.listen(PORT, () => {
      console.log(`Server is running at port: ${PORT}`);
    });
  })

  .catch((err) => {
    console.log("Mongo DB connection Faild !!!", err);
  });
