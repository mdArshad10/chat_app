import app from "./app.js";
import { dbConnection } from "./config/db.js";
import { PORT } from "./constant.js";

import { Server } from "socket.io";
import { createServer } from "node:http";

const server = createServer(app);
const io = new Server(server);


server.listen(PORT, async () => {
  await dbConnection();
  console.log(`the server is running at port ${PORT}`);
});

