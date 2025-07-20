const User = require("../../models/user.model");

exports.getUsers = function (req, res) {
  User.find({}, "-password")
    .then((users) => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Błąd serwera" });
    });
};
