const express = require("express");
const server = express();
const PORT = 5050;
const projectRouter = require("./routers/projectRouter");
const actionRouter = require("./routers/actionRouter");
//Middleware
const morgan = require("morgan");
const helmet = require("helmet");

server.use(express.json(), morgan("tiny"), helmet());

server.use("/projects", projectRouter);
server.use("/actions", actionRouter);

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
