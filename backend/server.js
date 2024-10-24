import app from "./app.js";
import { dbConnection } from "./config/db.js";
const PORT = 3000;

app.listen(PORT, async () => {
  await dbConnection();
  console.log(`the server is running at port ${PORT}`);
});
