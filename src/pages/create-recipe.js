import React, { useState } from 'react';
import axios from 'axios'
import useGetUserID from '../hooks/useGetUserID';
import { useNavigate } from 'react-router-dom';

function CreateRecipe() {
  const userID = useGetUserID();

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: useGetUserID,
  });

  const navigate = useNavigate();
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name,value)
    setRecipe({ ...recipe, [name]: value });
  }; 

  const handleIngredientsChange = (event, idx) => {
    const { value } = event.target;
    console.log(value)
    const ingredients = [...recipe.ingredients];
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const onSubmit =async (event)=>{
    event.preventDefault();
    try{
      const a = window.localStorage.getItem("userID");
      if (a == null) {
        return alert("you have to login first then create Recipe");
      }
      recipe.userOwner = a;
      const response = await axios.post("http://localhost:8000/recipes", { ...recipe });
      console.log(response.data)
      alert("Recipe created");
      navigate("/");
    } catch (error){
      console.log("error", error)
    }

  }

  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form onSubmit = {onSubmit}>
        <label htmlFor="name">Name</label>
        <input type='text' id='name' name='name' onChange={handleChange}></input>

        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientsChange(event, idx)}
          />
        ))}
        <button onClick={addIngredients} type="button">Add ingredients</button>

        <label htmlFor="instructions">Instructions</label>
        <textarea id='instructions' name='instructions' onChange={handleChange}></textarea>

        <label htmlFor="imageUrl">Image URL</label>
        <input type='text' id='imageUrl' name='imageUrl' onChange={handleChange}></input>

        <label htmlFor="cookingTime">Cooking Time (minutes)</label>
        <input type='number' id='cookingTime' name='cookingTime' onChange={handleChange}></input>

        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}

export default CreateRecipe;
