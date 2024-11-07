const { Router } = require("express");

const router = Router();
const userController = require("../../controllers/users/userControllers");

router.post("/user", userController.register);

module.exports = router;
