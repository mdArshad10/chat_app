import app from "../app.js";
import { dbConnection } from "../config/db.js";
import v1Routes from "./routes/index.js";

const PORT = 3000;

app.use("/api", v1Routes);

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`the server is running at port ${PORT}`);
});
