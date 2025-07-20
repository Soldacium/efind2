const {
  authenticate,
  authorize,
} = require("../middlewares/auth/auth.middleware");
userController = require("@controllers/user/user.controller");
profileController = require("@controllers/user/profile.controller");

router.post("/", userController.addUser);

router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  userController.deleteUser
);

router.get(
  "/profile/:id",
  authenticate,
  authorize(["user", "admin"]),
  profileController.getProfile
);
