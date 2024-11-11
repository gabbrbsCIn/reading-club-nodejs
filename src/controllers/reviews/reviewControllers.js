const { findBookById } = require("../../services/books/bookServices");
const { createReview, findReviewByUserBookId, deleteReview } = require("../../services/reviews/reviewServices");
const { sendErrorResponse, sendSuccessResponse } = require("../../utils/messages/messages");
const { validateReviewDataRequest } = require("../../utils/validators/validators");

const register = async (req, res) => {
    try {
        const reviewData = req.body;
        const userId = req.user.id
        const bookId = req.params.bookId;
        validateReviewDataRequest(req.body);
        await findBookById(bookId);
        await findReviewByUserBookId(userId, bookId);

        const review = await createReview(reviewData, userId, bookId);
        const response = { data: review, message: "Review criada com sucesso" }
        sendSuccessResponse(res, response);
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, error);
    }

}

const destroy = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const review = await deleteReview(reviewId);
        const response = { data: review, message: "Review deletada com sucesso" }
        sendSuccessResponse(res, response);
    } catch (error) {
        console.log(error);
        sendErrorResponse(res, error);
    }
}

module.exports = { register, destroy }