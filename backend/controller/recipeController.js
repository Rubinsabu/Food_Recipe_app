const Recipes= require("../models/recipeSchema")
const getRecipes = async(req,res)=>{
    const recipes=await Recipes.find()
    console.log("getRecipes done !!")
    return res.json(recipes)
}

const getRecipe = async(req,res)=>{
    const recipe = await Recipes.findById(req.params.id)
    console.log("getRecipes by Id done !!")
    res.json(recipe)
}

const addRecipe = async(req,res)=>{

try{
    const {title,ingredients,instructions,time}= req.body

    if(!title || !ingredients || !instructions){
        res.json({message:"Required fields can't be empty"})
    }

const newRecipe = await Recipes.create({
    title,ingredients,instructions,time
})
console.log(newRecipe);
return res.json(newRecipe) 
} catch(error){
    console.log("Error saving recipe:",error.message);
    return res.status(500).json({ message: "Internal Server Error" });
}

}

const editRecipe = async(req,res)=>{
    const {title,ingredients,instructions,time}= req.body
    let recipe= await Recipes.findById(req.params.id);
    try{
        if(recipe){
            await Recipes.findByIdAndUpdate(req.params.id, req.body,{new:true})
        }
        res.json({title,ingredients,instructions,time})
    }catch(err){
        return res.status(404).json({message:"Couldn't Update"})
    }
    
}

const deleteRecipe = async(req,res)=>{

}

module.exports={getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe}