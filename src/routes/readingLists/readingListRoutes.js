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
router.post("/list/:id/book/:bookId", authToken, isListJoined, readingListController.addBook);

router.put("/list/:id", authToken, isListJoined, readingListController.update);
router.delete(
  "/list/:id",
  authToken,
  isListJoined,
  readingListController.destroy
);

router.patch(
  "/list/:id/book/:bookId",
  authToken,
  isListJoined,
  readingListController.updateStatus
);

router.delete("/list/:id/book/:bookId", authToken, isListJoined, readingListController.deleteBook);

router.get("/list/:id", authToken, isListJoined, readingListController.getBooksFromAList);

module.exports = router;
