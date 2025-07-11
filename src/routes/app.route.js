import { addFavorite, deleteFavorite, getFavorites } from "../controllers/app.controllers.js";
import express from 'express';

const router = express.Router();

router.post('/favorites', addFavorite);
router.delete('/favorites/:userId/:recipeId', deleteFavorite)
router.get('/favorites/:userId/all', getFavorites)


export default router