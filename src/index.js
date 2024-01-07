import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`Server is runnig at Port ${process.env.PORT} 👌`);
  })
  .catch((err) => {
    console.log(`Server connection Faild 🫡 error is ${err}`);
  });
