const request = require("supertest");
const app = require("../src/app");



jest.mock("../prisma/prismaClient", () => {
    return {
        review: {
            findMany: jest.fn().mockImplementation(async ({ where }) => {
                const bookId = where.bookId;
                console.log(bookId);
                if (bookId === "1") {
                    return [
                        {
                            score: 5,
                            book: {
                                id: bookId,
                                title: "Good Book",
                                author: "Good Author",
                                createdAt: "2024-11-08T21:16:23.861Z",
                                updatedAt: "2024-11-08T21:16:23.861Z",
                            },
                        },
                        {
                            score: 3,
                            book: {
                                id: bookId,
                                title: "Good Book",
                                author: "Good Author",
                                createdAt: "2024-11-08T21:16:23.861Z",
                                updatedAt: "2024-11-08T21:16:23.861Z",
                            },
                        },
                    ];
                } else if (bookId === "2") {
                    return [];
                }
                return [];
            }),
        },
    }
}

);
describe("GET /review/:bookId", () => {
    it("should return the average review score and book details", async () => {
        const response = await request(app).get("/review/1").expect(200);
        console.log(response.body);
        expect(response.body.success.message).toBe("Média coletada com sucesso");
        expect(response.body.success.data.averageReview).toBe(4);
        expect(response.body.success.data.book).toEqual({
            id: "1",
            title: "Good Book",
            author: "Good Author",
            createdAt: "2024-11-08T21:16:23.861Z",
            updatedAt: "2024-11-08T21:16:23.861Z",
        });
    });
    it("should return 404 if there are no reviews for the book", async () => {
        const response = await request(app).get("/review/2").expect(404);
        expect(response.body.message).toBe("Não há revisões para esse livro");
    })
})