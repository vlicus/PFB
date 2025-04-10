import express from "express";
import { newRentalController } from "../controllers/Rents";
import { authUserController } from "../controllers/auth/authUserController.js";

router.post("/rent/register", authUserController, newRentalController);
