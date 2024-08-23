const {PrismaClient} = require ("@prisma/client");
const {faker} = require("@faker-js/faker");

const prisma = new PrismaClient();

const main = async () =>{
    console.log("Creating users");
    await prisma.$connect();
    const [user1, user2, user3, user4, user5] = await Promise.all(
        [...Array(5)].map(() => {
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
    
    console.log("Creating Items:");
    const [item1, item2, item3] = await Promise.all(
            [...Array(5)].map(() => prisma.items.create({
                    data: {
                        img_url: faker.image.urlLoremFlickr({category: 'business'}),
                        name: faker.company.name(),
                        description: faker.lorem.sentences({min: 1, max: 3}),
                    }
                })
        )
    );
    const items = await prisma.items.findMany();
    console.log("Created Items", items);

    console.log("Creating Reviews");
    const [review1, review2, review3, review4] = await Promise.all(
            [...Array(5)].map((_,i) => prisma.reviews.create({
                    data: {
                        score: faker.number.float({ multipleOf: 0.50, min: 0, max:5 }),
                        txt: faker.lorem.sentence(),
                        user_id: users[i].id,
                        item_id: items[i].id,
                    }
                }))
    );

    const reviews = await prisma.reviews.findMany();
    console.log("Created reviews:", reviews);

console.log("Creating comments");
const [comment1, comment2, comment3, comment4] = await Promise.all(
        [...Array(5)].map((_,i) => prisma.comments.create({
                data: {
                    comment: faker.lorem.sentences({min: 1, max: 3}),
                    author_id: users[i].id,
                    review_id: reviews[i].id,
                },
            })
    )
);
const comments = await prisma.comments.findMany();
console.log("Created comments:", comments);
};


main().then(async () =>{
    await prisma.$disconnect();
})
    .catch(async(err) => {
        console.log(`ERROR ${err}`);
        await prisma.$disconnect();
    });