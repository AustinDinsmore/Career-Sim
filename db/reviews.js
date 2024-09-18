const prisma = require("./index");

const createReview = (reviewsData) => {
    return prisma.reviews.create({
        data: reviewsData,
    });
};

const getAllUserReviews = (user_id) => {
    return prisma.reviews.findMany({
        where: {user_id},
        include: {
            item: true
        }
    });
};

const getAllItemReviews = (item_id) => {
    return prisma.reviews.findMany({
        where: {item_id},
    });
};

const updateReview = (id, reviewsData) => {
    
    return prisma.reviews.update({
        where: {id},
        data: reviewsData,
    });
};
const getReviewById = (id) => {
    return prisma.reviews.findUnique({
        where: {id},
        include: {
            item: true
        }
    });
};
const deleteReview = async (id) => {
    const review = await getReviewById(id);
    if (review) {
        return prisma.reviews.delete({
            where: {id}, 
        });
    }
    return;
};

const getAverageScore = async (item_id) => {
    const reviewsByItem = await prisma.reviews.groupBy({
        by: {item_id: true},
        _avg: {score: true},
    });
    return (reviewsByItem);
};

module.exports = {createReview, getReviewById, getAllUserReviews, getAllItemReviews, updateReview, deleteReview, getAverageScore};
