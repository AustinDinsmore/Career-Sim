const prisma = require("./index");

const createUser = (userData) =>{
    return prisma.users.create({
        data: userData,
    })
};

const findUserbyUsername = (username) => {
    return prisma.users.findUnique({
        where: {username}
    })
};

const findUserbyId = (id) => {
    return prisma.users.findUnique({
        where: {id}
    })
}


module.exports = {createUser, findUserbyUsername, findUserbyId};