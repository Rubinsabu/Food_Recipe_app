const express = require("express");
const { getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload } = require("../controller/recipeController");
const { verifyToken } = require("../middleware/auth");
const router = express.Router();

router.get("/",getRecipes); //get all recipes
router.get("/:id",getRecipe) //get recipe by id
router.post("/",upload.single('file'),verifyToken,addRecipe) //add recipe
router.put("/:id",upload.single('file'),editRecipe) //Edit recipe
router.delete("/:id",deleteRecipe) //Delete recipe

module.exports=router