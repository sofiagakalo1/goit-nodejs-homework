const bcrypetjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const controllerWrapper = require("../utils/controllerWrapper");

const { User } = require("../models/user");

const HttpError = require("../helpers/HttpError");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, `User with email ${email} is already registered!`);
  }

  const hashedPassword = await bcrypetjs.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    ...req.body,
    password: hashedPassword,
    avatarURL,
  });

  if (!result) {
    next(HttpError(400, "Помилка від Joi або іншої бібліотеки валідації"));
  }

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, `Email or password is wrong`);
  }
  const comparePassword = await bcrypetjs.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, `Email or password is wrong`);
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.status(200).json({
    email,
    subscription,
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "Logout success",
  });
};

module.exports = {
  register: controllerWrapper(register),
  login: controllerWrapper(login),
  getCurrent: controllerWrapper(getCurrent),
  logout: controllerWrapper(logout),
};
