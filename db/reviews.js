const prisma = require("./index");

const createReview = (reviewsData) => {
    return prisma.reviews.create({
        data: reviewsData,
    });
};

const getAllReviews = (user_id) => {
    return prisma.reviews.findMany({
        where: {user_id},
        include: {
            item: true
        }
    });
};

const getReviewById = (id) => {
    return prisma.reviews.findUnique({
        where: {id},
        include: {
            item: true
        }
    })
}

const updateReview = (id, reviewsData) => {
    return prisma.reviews.update({
        where: {id},
        data: reviewsData,
    });
};

const deleteReview = async (id) => {
    const review = await getReviewById(id);
    if (review) {
        return prisma.reviews.delete({
            where: id, 
        });
    }
    return;
};

module.exports = {createReview, getAllReviews, getReviewById, updateReview, deleteReview};
