exports.addUser = function (req, res) {
  const newUser = req.body;
  if (!newUser || !newUser.name || !newUser.email || !newUser.password) {
    return res.status(400).json({ error: "Invalid user data" });
  }
  usersList.push({ id: usersList.length + 1, ...newUser });
  res.status(201).json(newUser);
};

exports.deleteUser = function (req, res) {
  const userId = parseInt(req.params.id, 10);
  const userIndex = usersList.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found" });
  }
  usersList.splice(userIndex, 1);
  res.status(204).send();
};
