import express from "express";
import { register, login } from "../controllers/authControllers.js";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/validator.js";
import { validationResult } from "express-validator";

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post("/register", registerValidation, validate, register);
router.post("/login", loginValidation, validate, login);

export default router;
