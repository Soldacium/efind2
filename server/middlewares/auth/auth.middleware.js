const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Brak tokenu, dostęp zabroniony" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { userId, roles, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Niepoprawny lub wygasły token" });
  }
};

const authorize =
  (allowedRoles = []) =>
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Brak uwierzytelnienia" });
    }

    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));
    if (!hasRole) {
      return res
        .status(403)
        .json({ message: "Brak uprawnień do wykonania tej operacji" });
    }
    next();
  };

module.exports = { authenticate, authorize };
