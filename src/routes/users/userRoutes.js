const { Router } = require("express");

const router = Router();
const userController = require("../../controllers/users/userControllers");
const authToken = require("../../middlewares/authMiddleware");
router.post("/user", userController.register);
router.put("/user", authToken, userController.update);
router.post("/login", userController.login);

module.exports = router;
