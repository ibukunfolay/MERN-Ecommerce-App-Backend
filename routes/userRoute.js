import express from "express";
import User from "../models/userModel.js";
import { getToken } from "../utils.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    const newUser = await user.save();

    if (newUser) {
      res.send({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ message: "invalid user data" });
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const userSignin = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (userSignin) {
      res.send({
        id: userSignin.id,
        name: userSignin.name,
        email: userSignin.email,
        isAdmin: userSignin.isAdmin,
        token: getToken(userSignin),
      });
    } else {
      res.status(401).send({ message: "invalid username or password" });
    }
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.get("/createAdmin", async (req, res) => {
  try {
    const user = new User({
      name: "ibukun",
      email: "dopey@gmail.com",
      password: "tommyboy",
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
