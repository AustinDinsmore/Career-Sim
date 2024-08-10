const express = require("express");
const reviewRouter = express.Router();
const {createReview, getAllUserReviews, getAllItemReviews, getReviewById, updateReview, deleteReview, getAverageScore} = require("../db/reviews");
const {checkReviewData} = require("./utils");

//Get all user reviews 
reviewRouter.get("/:user_id", async (req, res) => {
    try {
        const reviews = await getAllUserReviews(req.user_id);
        res.send({reviews});
    } catch (error) {
        console.log(error);
        res.status(404).send({message: "Unable to find your reviews, please try again"});
    }
});

//Get all item reviews
reviewRouter.get("/:item_id", async (req, res) => {
    try {
        const itemReviews =await getAllItemReviews(req.item_id);
        res.send({itemReviews});
    } catch (error) {
        console.log(error);
        res.status(404).send({message: "Unable to find any reviews for this item, please try again"})
    }
});

//Get review by id
reviewRouter.get("/:id", async (req, res) => {
    try {
        const review = await getReviewById(req.params.id);
        res.send({review});
    } catch (error) {
        console.log(error);
        res.status(404).send({message: "Could not find review, please try again"});
    }
});

//Create new review
reviewRouter.post("/", checkReviewData, async(req,res) => {
    try {
        const review = await createReview({...req.body, user_id: req.user_id});
        res.send({review});
    } catch (error) {
        console.log(error);
        res.status(404).send({message: "Unable to create review, please try again"});
    }
});

//Update review
reviewRouter.put("/:id", async(req, res) => {
    try {
        const {score, txt} = req.body;
        const review = await updateReview(parseInt(req.params.id), {
            score,
            txt,
        });
        res.send({review});
    } catch (error) {
        console.log(error);
        res.status(404).send({message: "Unable to update review, please try again"});
    }
});

//Delete review
reviewRouter.delete("/:id", async (req, res) => {
   try{
    const review = await deleteReview(parseInt(req.params.id));
    res.send({review});
   } catch (error) {
    console.log(error);
    res.status(404).send({message: "Unable to delete review, please try again"});
   }
});

//Get average score of an item
reviewRouter.get("/:item_id", async (req, res) => {
    try {
        const averageScore = await getAverageScore(req.item_id);
        res.send({averageScore});
    } catch (error) {
        console.log(error);
        res.status(404).send({message: "Unable to get average reviews, please try again"});
    }
});

module.exports = reviewRouter;