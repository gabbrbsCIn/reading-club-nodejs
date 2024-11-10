const { Router } = require("express");
const router = Router();
const clubControllers = require("../../controllers/clubs/clubControllers");
const authToken = require("../../middlewares/authMiddleware");
const { isClubJoined } = require("../../middlewares/clubMiddleware");

router.post("/club", authToken, clubControllers.register);
router.post("/club/join/:id", authToken, clubControllers.joinClub);
router.put("/club/:id", authToken, isClubJoined, clubControllers.update);
router.delete("/club/:id", authToken, isClubJoined, clubControllers.destroy);
router.get("/club/average", authToken, clubControllers.getAverage);

module.exports = router;
