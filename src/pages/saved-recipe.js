import React, { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID.js"
import axios from "axios";
import { useCookies } from "react-cookie";
import "./saved-recipe.css";

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, setcookies] = useCookies("access_token");
  const userID = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, []);
  return (
    <div className="mainbox">
      {cookies.access_token ? <h1>Saved Recipes</h1> : <h1>Login first</h1>}
      <ul className="saveMain">
        {savedRecipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2>{recipe.name}</h2>
            </div>
            <p>{recipe.description}</p>
            <span><button className="Remove"> Remove </button></span>

            <p>{recipe.instructions}</p>
            <img src={recipe.imageUrl} alt={recipe.name} />
            <div style={{ display: "flex", alignItems: "center" }}>
              <p>Cooking Time: {recipe.cookingTime} minutes</p>
            </div>

          </li>

        ))}
      </ul>
    </div>
  );
};

export default SavedRecipes;