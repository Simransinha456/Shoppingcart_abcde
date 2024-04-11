import React, { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID.js";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gif from "../components/200w.gif";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, _] = useCookies(["access_token"]);
  const [loading, setLoading] = useState(true); // State variable for loading indicator
  const userID = useGetUserID();

  const toastVariables = {
    position: "top-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("https://shoppingcart-backend.vercel.app/recipes");
        setRecipes(response.data);
        setLoading(false); // Set loading to false once recipes are fetched
      } catch (err) {
        console.error("Error fetching recipes:", err);
        toast.error("Failed to fetch recipes. Please try again later.", toastVariables);
        setLoading(false); // Set loading to false in case of error
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://shoppingcart-backend.vercel.app/recipes/savedRecipes/ids/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.error("Error fetching saved recipes:", err);
        toast.error("Failed to fetch saved recipes. Please try again later.", toastVariables);
      }
    };

    fetchRecipes();

    if (cookies.access_token) fetchSavedRecipes();
  }, [userID, cookies.access_token, toastVariables]);

  const saveRecipe = async (recipeID) => {
    try {
      const response = await axios.put(
        "https://shoppingcart-backend.vercel.app/recipes",
        { recipeID, userID },
        { headers: { authorization: cookies.access_token } }
      );
      setSavedRecipes(response?.data.savedRecipes);
      toast.success("Recipe saved successfully", toastVariables);
    } catch (err) {
      console.error("Error saving recipe:", err);
      toast.error("Failed to save recipe. Please try again later.", toastVariables);
    }
  };

  const isRecipeSaved = (id) => savedRecipes?.includes(id);

  return (
    <div className="centre">
      <h1>Explore New Recipes</h1>
      {loading ? (
        <div>
        <img src={gif} style={{height:"200px",width:"200px",marginLeft:"50px"}} alt="" />
        </div>
      ) : (
        <ul className="cardMain">
          {recipes.map((recipe) => (
            <div className="card" key={recipe._id}>
              <li>
                <div>
                  <h3>{recipe.name}</h3>
                  <button
                    onClick={() => saveRecipe(recipe._id)}
                    disabled={isRecipeSaved(recipe._id)}
                  >
                    {isRecipeSaved(recipe._id) ? "Saved" : "Add to Cart"}
                  </button>
                </div>
                <div className="instructions">
                  <p>{recipe.instructions}</p>
                </div>
                <img src={recipe.imageUrl} alt={recipe.name} />
              </li>
            </div>
          ))}
        </ul>
      )}
      <ToastContainer />
    </div>
  );
};

export default Home;
