const express = require("express");
const reviewRouter = express.Router();
const {createReview, getAllUserReviews, getReviewById, getAllItemReviews, updateReview, deleteReview, getAverageScore} = require("../db/reviews");
const {checkReviewData, verifyUser} = require("./utils");

//Get all user reviews /api/review/:user_id
reviewRouter.get("/:user_id", async (req, res) => {
    try {
        const userReviews = await getAllUserReviews(req.params.user_id);
        res.send({userReviews});
    } catch (error) {
        console.log(error);
        res.status(404).send({message: "Unable to find your reviews, please try again"});
    }
});

//Get all item reviews
reviewRouter.get("/:id/reviews", async (req, res) => {
    try {
        const itemReviews =await getAllItemReviews(req.params.item_id);
        res.send({itemReviews});
    } catch (error) {
        console.log(error);
        res.status(404).send({message: "Unable to find any reviews for this item, please try again"})
    }
});

//Get review by id
reviewRouter.get("/detail/:id", async (req, res) => {
    try {
        const review = await getReviewById(req.params.id);
        res.send({review});
    } catch (error) {
        console.log(error);
        res.status(404).send({message: "Could not find review, please try again"});
    }
});

//Create new review
reviewRouter.post("/:id", verifyUser, checkReviewData, async (req,res) => {
    try {
        const review = await createReview({
            ...req.body,
            score: parseFloat(req.body.score),
            item_id: req.params.id,
            user_id: req.user.id,
        });
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
        const review = await updateReview((req.params.id), {
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
    const review = await deleteReview(req.params.id);
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