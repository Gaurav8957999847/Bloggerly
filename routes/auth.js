import express from "express";
import { login, register } from "../controllers/authControllers.js";

const router = express.Router();

//This is the register router that will be redirect the request to the register controller and the method will be post because we are sending the data to the server and the endpoint will be register
router.post("/register", register);

//This is the login router that will be redirect the request to the login controller and the method will be post because we are sending the data to the server and the endpoint will be login
router.post("/login", login);

export default router;