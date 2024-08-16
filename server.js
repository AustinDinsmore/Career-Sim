const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send({message: "Working"});
});


server.use("/auth", require("./routes"));

server.use("/api", require("./api"));

module.exports = server;