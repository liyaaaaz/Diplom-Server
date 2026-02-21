import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      phone: req.body.phone,
      firstName: req.body.firstName,
      surname: req.body.surname,
      secondName: req.body.secondName,
      passwordHash: hash,
    });

    const user = await doc.save();

  const token = jwt.sign(
  { _id: user._id },
  process.env.JWT_SECRET,
  { expiresIn: "20d" }
);

    const { passwordHash, ...userData } = user._doc;

    res.json({
      userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось зарегистрироваться",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await UserModel.findOne({ phone: phone });

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }

    const isValidPassword = await bcrypt.compare(
      password,
      user._doc.passwordHash
    );

    if (!isValidPassword) {
      return res.status(400).json({
        message: "Неверный логин или пароль",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret124",
      {
        expiresIn: "20d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({
      userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось авторизоваться",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "Пользователь не найден",
      });
    }
    const { passwordHash, ...userData } = user._doc;

    res.status(200).json({
      ...userData,
    });
  } catch (err) {
    console.log(err);
    res.status(403).json({
      message: "Нет доступа",
    });
  }
};
