const { Router } = require("express");
const authToken = require("../../middlewares/authMiddleware");
const { isClubJoined } = require("../../middlewares/clubMiddleware");
const readingListController = require("../../controllers/readingLists/readingListControllers");

const router = Router();

router.post("/list/:id", authToken, isClubJoined, readingListController.register);

module.exports = router;
