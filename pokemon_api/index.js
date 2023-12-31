const express = require("express");
const path = require("path");
const cors = require("cors");
const http = require("http");
const helmet = require("helmet");
const { startSocket } = require("./helpers/websocket");
const { rateLimiter } = require("./helpers/rate-limit");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(helmet());
app.use(rateLimiter);
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));

const server = http.createServer(app);

const mainRoute = require("./routes/main_route");
const pokemonRoute = require("./routes/pokemon_route");
const installRoute = require("./routes/install_route");
const userRoute = require("./routes/user_route");

app.use("/", mainRoute);
app.use("/pokemon", pokemonRoute);
app.use("/install", installRoute);
app.use("/user", userRoute);

server.listen(process.env.PORT, () => {
  console.log("Listenning...");
});

startSocket(server);
