var express = require("express");
const {
  authenticate,
  authorize,
} = require("../middlewares/auth/auth.middleware");
var router = express.Router();

usersController = require("@controllers/user/users.controller");
/* GET users listing. */
router.get("/", authenticate, usersController.getUsers);

/* POST add user. */

module.exports = router;
