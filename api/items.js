const express = require("express");
const itemRouter = express.Router();
const {findItembyName, findAllItems, findItembyId} = require("../db/items.js");


//Get all items 
itemRouter.get("/", async (req, res) => {
    try{
        const allItems = await findAllItems(req.items_id);
        res.send({allItems});
    } catch (error) {
        console.log(error);
        res.status(404).send({error, message: "Unable to find items, please try again"});
    }
});

//Get single item by name
itemRouter.get("/name", async (req, res) => {
    try{
        const itemName = await findItembyName(req.body.name);
        res.send({itemName});
    } catch (error) {
        console.log(error);
        res.status(404).send({error, message: "Unable to find item please try again"});
    }
});

//Get single item by id
itemRouter.get("/:id", async(req, res) => {
    try {
        const itemId = await findItembyId(req.params.id);
        res.send({itemId});
    } catch (error) {
        console.log(error);
        res.status(404).send({error, message: "Unable to find item, please try again"});
    }
});

module.exports = itemRouter;