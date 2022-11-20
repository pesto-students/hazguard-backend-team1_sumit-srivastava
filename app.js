import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import createRoutes from "./routes/create.js";
import readRoutes from "./routes/read.js";
import updateRoutes from "./routes/update.js";
import deleteRoutes from "./routes/delete.js";
import cors from "cors";

const app = express();

dotenv.config();

app.use(
	cors({
		origin: ["http://127.0.0.1:5173", "https://www.hazguard.tech", "https://hazguard.tech"],
		credentials: true,
	})
);

app.use(bodyParser.urlencoded({ limit: "50mb", extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/create", createRoutes);
app.use("/api/read", readRoutes);
app.use("/api/update", updateRoutes);
app.use("/api/delete", deleteRoutes);

export default app;
