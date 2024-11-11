const prisma = require("../../../prisma/prismaClient")
const { ValidationError } = require("../../errors/errors")

const findReviewByUserBookId = async (userId, bookId) => {
    const review = await prisma.review.findFirst({
        where: {
            userId: userId,
            bookId: bookId
        }
    })
    if (review) {
        throw new ValidationError("Esse livro já contém uma revisão feita por você")
    }
    return review;
}

const createReview = async (reviewData, userId, bookId) => {
    const review = await prisma.review.create({
        data: {
            content: reviewData.content,
            score: reviewData.score,
            userId: userId,
            bookId: bookId,
        }
    })
    return review;
}

const deleteReview = async (reviewId) => {
    const review = await prisma.review.delete({
        where: {
            id: reviewId
        }
    })
    if(!review) {
        throw new ValidationError("Revisão não encontrada")
    }
    return review;
}


module.exports = { createReview, findReviewByUserBookId, deleteReview }	