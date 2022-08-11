import express from 'express';
import userController from '../controllers';
import utils from '../utils';

const { Router } = express;
const { card } = userController;
const { auth } = utils;

const api = Router();

api.post('/',auth.required,card.create); //signup
api.delete('/:id',auth.required,card.delete);
api.get("/:id",auth.required,card.one)
api.get("/",auth.required,card.all)
api.get("/all/:id",auth.required,card.specific)
api.put('/',auth.required,card.update);

export default api;
