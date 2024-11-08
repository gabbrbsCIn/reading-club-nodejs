const { Router } = require("express");

const router = Router();

const bookControllers = require("../../controllers/books/bookControllers");
const authToken = require("../../middlewares/authMiddleware");

router.post("/book", authToken, bookControllers.register);

module.exports = router;
