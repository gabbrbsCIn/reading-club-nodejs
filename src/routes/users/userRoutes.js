const { Router } = require("express");

const router = Router();
const userController = require("../../controllers/users/userControllers");

router.post("/user", userController.register);
router.post("/login", userController.login);

module.exports = router;
