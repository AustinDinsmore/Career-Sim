const {PrismaClient} = require ("@prisma/client");
const {faker} = require("@faker-js/faker");

const prisma = new PrismaClient();

const main = async () =>{
    await prisma.$connect();
    const [user1, user2, user3, user4, user5] = await Promise.all(
        [...Array(5)].map(async () => {
        return prisma.users.create({
            data: {
                username: faker.internet.userName(),
                password: faker.internet.password(),
            },
        })
        })
    );
    const users = await prisma.users.findMany();
    console.log("Created users:", users);

    console.log("Creating comments");
    await Promise.all(
        [user1, user2, user3, user4, user5].map((users) => {
            [...Array(1)].map(async () => {
                return prisma.comments.create({
                    data: {
                        comment: faker.lorem.sentences({min: 1, max: 3}),
                        author_id: author.id,
                        review_id: reviews.id,
                    },
                })
            })
        })
    );
    const comments = await prisma.comments.findMany();
    console.log("Created comments:", comments);

    console.log("Creating Reviews", reviews);
    await Promise.all(
        [user1, user2, user3, user4, user5].map((users) => {
            [...Array(1)].map(async () => {
                return prisma.reviews.create({
                    data: {
                        score: '',
                        txt: faker.lorem.sentence(),
                        user_id: user1.id,
                        item_id: items.id,
                    }
                })
            })
        })
    );
    const reviews = await prisma.reviews.findMany();
    console.log("Created reviews:", reviews);

    console.log("Creating Items", items);
    await Promise.all(
        [user1, user2, user3, user4, user5].map((users) => {
            [...Array(1)].map(async () => {
                return prisma.reviews.create({
                    data: {
                        name: faker.company.name(),
                        description: faker.lorem.sentences({min: 1, max: 3}),
                    }
                })
            })
        })
    );
    const items = await prisma.items.findMany();
    console.log("Created Items", items);
};

main().then(async () =>{
    await prisma.$disconnect();
})
    .catch(async(err) => {
        console.log(`ERROR ${err}`);
        await prisma.$disconnect();
    })