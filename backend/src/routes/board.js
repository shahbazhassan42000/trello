import express from "express";
import userController from "../controllers";
import utils from "../utils";

const {Router} = express;
const {board} = userController;
const {auth} = utils;

const api = Router();

api.post('/', auth.required, board.create);
api.delete('/:id', auth.required, board.delete);
api.get("/:id", auth.required, board.one)
api.get("/", auth.required, board.all)
api.put('/', auth.required, board.update);
api.get("/adminBoards/:creator", auth.required, board.specific)


export default api;
