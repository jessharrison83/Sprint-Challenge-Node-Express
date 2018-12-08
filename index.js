const express = require("express");
const server = express();
const PORT = 5050;
//Middleware
const morgan = require("morgan");
const helmet = require("helmet");

server.use(express.json(), morgan("tiny"), helmet());

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
