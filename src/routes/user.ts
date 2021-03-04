import { Router } from "express";
import { getUsers, getUserById } from "../entities/User/User.controller"

const router = Router();

router
    .get("", getUsers)
    .get("/:id", getUserById);

export default router;