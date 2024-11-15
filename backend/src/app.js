import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import v1Routes from "./routes/index.js";
import path from 'node:path';
import { fileURLToPath } from "url";
import { ErrorMiddleware } from "./middlewares/error.js";
import {
  POSTMAN_API_DOCUMENTATION_URL,
  CORS_ORIGIN_FRONTEND_URL,
} from "./constant.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
// This line creates a static file server
// app.use("public/static", express.static(path.join(__dirname, "public/static")));
app.use(
  cors({
    origin: CORS_ORIGIN_FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(morgan("dev"));


app.get("/", (req, res, next) => {
  res.redirect(POSTMAN_API_DOCUMENTATION_URL);
});
app.use("/api", v1Routes);
app.use(ErrorMiddleware);
app.use("*", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "The route is not found",
  });
});

export default app;
