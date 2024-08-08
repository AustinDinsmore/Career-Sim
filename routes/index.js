const express = require("express");
const router = express.Router();

const authRouter = require("./auth/auth");
router.use("/auth", authRouter);

const itemRouter = require("../api/items");
router.use("/items", itemRouter);

module.exports = router;