import express from "express";
import user from "./user";
import card from "./card";
import board from "./board";

const { Router } = express;
const api = Router();

// user apis
api.use("/user", user);
api.use("/card", card);
api.use("/board", board);


export default api;
