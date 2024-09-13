const express = require("express");
const { createComment, updateComment, deleteComment } = require("../db/comments");
const commentRouter = express.Router();

//Get all item comments /api/comment/:item_id
// commentRouter.get("/:item_id", async (req, res) => {
//     try {
//         const comments = await findAllComments(req.params.item_id);
//         res.send({comments});
//     } catch (error) {
//         console.log(error);
//         res.status(404).send({message: "Unable to find any comments, please try again"})
//     }
// });

//Create new comment /api/comment/
//works
commentRouter.post("/:id", async (req, res) => {
    try {
        const comment = await createComment({
            ...req.body,
            review_id: req.params.id,
            author_id: req.user.id,
        });
        res.send({comment});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Could not create comment, please try again"})
    }
});

//Put new comment /api/comment/:id
//works
commentRouter.put("/:id", async (req, res) => {
    try {
        const {comment} = req.body;
        const putComment = await updateComment((req.params.id), {
            comment,
        });
        res.send({putComment});
    } catch (error) {
        console.log(error);
        res.status(404).send({message: "Unable to update comment, please try again"});
    }
});

//Delete comment /api/comment/:id
//works
commentRouter.delete("/:id", async(req, res) => {
    try {
        const comment = await deleteComment(req.params.id);
        res.send({comment});
    } catch (error) {
        console.log(error);
        res.status(404).send({message: "Unable to delete comment, please try again"});
    }
})

module.exports = commentRouter;