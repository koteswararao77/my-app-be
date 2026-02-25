const jwt = require("jsonwebtoken");
const Login = require("../mongoDb/models/Login");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    return next(new Error("Not authorized"));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await Login.findById(decoded.id).select("-password"); 

    next();
  } catch (error) {
    res.status(401);
    next(new Error("Token invalid"));
  }
};

module.exports = protect;