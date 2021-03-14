import { Router } from "express";
import {
  getLoggedUser,
  getLoggedUserBooks,
  getConversationByInterlocutorsId,
  getAllConversations,
  getAllPokes,
  getPokeByID
} from "../entities/Me/Me.controller";

const router = Router();

//get a currently logged user
router.get("", getLoggedUser);

//get all books of the currently logged user
router.get("/books", getLoggedUserBooks);

//get all conversations of the currently logged user
router.get("/conversations", getAllConversations);

//get a conversation with a specific user
router.get("/conversations/:id", getConversationByInterlocutorsId);

//get all pokes of the currently logged user
router.get('/pokes', getAllPokes);

// get a poke by its ID 
router.get('/pokes/:id', getPokeByID)

export default router;
