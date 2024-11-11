const { Router } = require("express");

const router = Router();
const userController = require("../../controllers/users/userControllers");
const authToken = require("../../middlewares/authMiddleware");
router.post("/user", userController.register);
router.post("/login", userController.login);
router.post("/logout", authToken, userController.logout);
router.put("/user", authToken, userController.update);
router.delete("/user", authToken, userController.destroy);

module.exports = router;
