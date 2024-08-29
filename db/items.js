const prisma = require("./index");

const createItem = (itemData) => {
    return prisma.items.create({
        data: itemData,
    })
};

const findAllItems = () => {
    return prisma.items.findMany({
        include: {
            reviews: true
        }
    })
};

const findItembyId =(id) =>{
    return prisma.items.findUnique({
        where: {id},
        include: {
            reviews: {
                include: {comments: true}
            }
        }
    })
};

const findItembyName = (name) => {
    return prisma.items.findFirst({
        where: {name},
        include: {
            reviews: true
        }
    })
};

module.exports = {createItem, findItembyId, findItembyName, findAllItems};