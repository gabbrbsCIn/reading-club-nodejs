const { Router } = require("express");
const router = Router();
const clubControllers = require("../../controllers/clubs/clubControllers");
const authToken = require("../../middlewares/authMiddleware");

router.post("/club", authToken, clubControllers.register);
router.post("/club/join/:id", authToken, clubControllers.joinClub);

module.exports = router;
