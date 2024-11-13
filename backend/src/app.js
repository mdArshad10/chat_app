import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import v1Routes from "./routes/index.js";
import { ErrorMiddleware } from "./middlewares/error.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use(morgan("dev"));


app.get("/", (req,res,next)=>{
  res.status(200).json({
    message:"welcome to Chat App"
  })
})
app.use("/api", v1Routes);
app.use(ErrorMiddleware);
app.use("*", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "The route is not found",
  });
});

export default app;
