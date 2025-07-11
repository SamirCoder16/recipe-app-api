import { and, eq } from "drizzle-orm";
import { db } from "../config/db.js";
import { favoritesTable } from "../db/schema.js";

export const addFavorite = async (req, res) => {
    try {
        const { userId,recipeId,title,image,cookTime,servings } = req.body;

        if(!userId || !recipeId || !title){
            res.status(400).json({ message: "Missing required fields" });
            return;
        }
        const newFavorites = await db.insert(favoritesTable).values({
            userId,
            recipeId,
            title,
            image,
            cookTime,
            servings
        }).returning();

        res.status(201).json(newFavorites[0])
        
    } catch (error) {
        console.log("Error adding favorite:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const deleteFavorite = async (req,res) => {
    try {
        const { userId, recipeId } = req.params;

        await db.delete(favoritesTable).where(
            and(eq(favoritesTable.userId, userId), eq(favoritesTable.recipeId, parseInt(recipeId)))
        );
        res.status(200).json({ success: true, message: "Favorite deleted successfully" });

    } catch (error) {
        console.log("Error occurred while deleting favorites : ", error);
        res.status(500).json({ success: false , message: "Internal Server Error" });
    }
}

export const getFavorites = async (req, res) => {
    try {
       const { userId } = req.params;

       const userFavorites = await db.select().from(favoritesTable).where(eq(favoritesTable.userId, userId));
       res.status(200).json(userFavorites);

    } catch (error) {
        console.log("Error fetching favorites:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
        
    }
}