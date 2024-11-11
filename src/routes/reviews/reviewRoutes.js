const { Router } = require("express")
const reviewController = require("../../controllers/reviews/reviewControllers");
const authToken = require("../../middlewares/authMiddleware");

const router = Router()

router.post("/review/:bookId", authToken, reviewController.register);

module.exports = router;