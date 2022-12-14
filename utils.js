import jwt, { decode } from "jsonwebtoken";
import config from "./config.js";

const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    { expiresIn: "48h" }
  );
};

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    const onlyToken = token.slice(7, token.length);
    jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({ msg: "Invalid Token" });
      }
      req.user = decode;
      next();
    });
  } else {
    res.status(401).send({ msg: "Token not detected" });
  }
};

const isAdmin = (req, res, next) => {
  {
    req.user && req.user.isAdmin
      ? next()
      : res.status(401).send({ msg: "unauthorized access" });
  }
};

export { getToken, isAuth, isAdmin };
