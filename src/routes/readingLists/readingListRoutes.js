const { Router } = require("express");
const authToken = require("../../middlewares/authMiddleware");
const {
  isClubJoined,
  isListJoined,
} = require("../../middlewares/clubMiddleware");
const readingListController = require("../../controllers/readingLists/readingListControllers");

const router = Router();

router.post(
  "/list/:id",
  authToken,
  isClubJoined,
  readingListController.register
);
router.put("/list/:id", authToken, isListJoined, readingListController.update);

module.exports = router;
