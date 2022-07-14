const jwt = require("jsonwebtoken");
const { Exception } = require("sass");

module.exports = function(req, res, next) {

  const token = req.header("authorization");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    //@ts-ignore
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if(+Date.now() > decoded.expiresAt)
    {
        return res.status(401).send("Token is expired");
    }
    req.userInfo = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};