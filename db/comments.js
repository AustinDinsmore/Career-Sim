const prisma = require("./index");

const createComment = (commentsData) => {
    console.log(commentsData)
    return prisma.comments.create({
        data: commentsData,
    });
}; 

const findAllComments = (item_id) =>{
    return prisma.comments.findMany({
        where: {item_id},
    });
};

const updateComment = (id, commentData) => {
    return prisma.comments.update({
        where: {id},
        data: commentData,
    });
};
const getCommentById = (id) => {
    return prisma.comments.findUnique({
        where: {id},
    })
}
const deleteComment = async (id) => {
    const comment = await getCommentById(id);
    if (comment) {
        return prisma.comments.delete({
            where: id,
        })
    }
}

module.exports = {createComment, findAllComments, updateComment, deleteComment}