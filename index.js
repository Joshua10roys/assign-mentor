import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { getRouter } from "./src/routers/GetRouter.js";
import { postRouter } from "./src/routers/PostRouter.js";
import { patchRouter } from "./src/routers/PatchRouter.js";


const app = express();
app.use(express.json());
dotenv.config();

app.use("/get", getRouter);
app.use("/post", postRouter);
app.use("/patch", patchRouter);

mongoose.set("strictQuery", true);
await mongoose.connect(process.env.SERVER_URL)
    .then(() => console.log("Connected to MongoDB"))
    .then(() => app.listen(process.env.PORT))
    .then(() => console.log("Server Started"))
    .catch((err) => console.log(err.message))