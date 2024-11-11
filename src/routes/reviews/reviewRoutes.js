const { Router } = require("express")
const reviewController = require("../../controllers/reviews/reviewControllers");
const authToken = require("../../middlewares/authMiddleware");

const router = Router()

router.post("/review/:bookId", authToken, reviewController.register);
router.delete("/review/:reviewId", authToken, reviewController.destroy);
router.get("/review/:bookId", reviewController.getBookAverage);

module.exports = router;