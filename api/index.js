const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const {findUserbyId} = require("../db/users");
const {requireUser} = require ("./utils");
const { name } = require("../server");

authRouter.use(async (req, res, next) => {
    const prefix = "Bearer";
    const auth = req.header("Authorization");

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)){
        const token = auth.slice(prefix.length);

        try{
            const {id} = jwt.verify(token, process.env.JWT || "super secret");
            if(id){
                req.user = await findUserbyId(id);
                next();
            } else {
                next({
                    name: "AuthorizationHeaderError",
                    message: "Authorization token malformed",
                });
            }
        } catch({name, message}) {
            next({name, message});
        }
    } else {
        next({
            name: "AuthorizationHeaderError",
            message: `Authorization token must start with ${prefix}`,
        });
    }
});

const reviewRouter = require("./reviews");
router.use("/review", reviewRouter);

const commentRouter = require("./comments");
router.use("/comment", commentRouter);

module.exports = reviewRouter, commentRouter;