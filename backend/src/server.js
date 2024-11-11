import app from "./app.js";
import { dbConnection } from "./config/db.js";
import { PORT } from "./constant.js";
import v1Routes from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.js";

// const PORT = 3000;

app.use("/api", v1Routes);
app.use(errorMiddleware);
app.use("*", (req, res, next) => {
  res.status(404).json({
    success: false,
    message: "The route is not found",
  });
});

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`the server is running at port ${PORT}`);
});
