const router = require("express").Router();
const authController = require("@controllers/auth/auth.controller");

/* POST login. */
router.post("/login", authController.login);

/* POST register. */
router.post("/register", authController.register);

module.exports = router;
