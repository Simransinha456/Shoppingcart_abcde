import React, { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID.js";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./add-to-cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddtoCart = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, setcookies] = useCookies("access_token");
  const userID = useGetUserID();

  const toastVariables = {
    position: "top-right",
    autoClose: 1000,
    pauseOnHover: true,
    draggable: true, 
    theme: "dark",
  };

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `https://shoppingcart-backend.vercel.app/recipes/savedRecipes/${userID}`
        );
        setSavedRecipes(response.data.savedRecipes);
      } catch (err) {
        console.log(err);
      }
    };

    fetchSavedRecipes();
  }, [userID]);

  const handleDelete = async (recipeID) => {
    const data = await axios.put(
      `http://localhost:8000/recipes/remove/${userID}/${recipeID}`
    );
    console.log(data.data);
    setSavedRecipes(savedRecipes.filter((recipe) => recipe._id !== recipeID));

    toast.success("Items Removed Successfully", toastVariables);
  };

  const saveToCard = async (recipeID) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/orders",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      console.log(response.data);
      toast.success("Items saved in your orders successfully", toastVariables);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mainbox">
      {cookies.access_token ? <h1>Saved Products</h1> : <h1>Login first</h1>}
      <ul className="saveMain">
        {savedRecipes.map((recipe,index) => (
          <li key={recipe._id}>
            <div>
              <h3 style={{ margin: 0 }}>{recipe.name}</h3>
            </div>
            <p>{recipe.description}</p>
            <span>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="Remove"
              >
                {" "}
                Remove from cart{" "}
              </button>
            </span>

            <img src={recipe.imageUrl} alt={recipe.name} />
            <div style={{ display: "flex", alignItems: "center" }}></div>
            {savedRecipes.length > 0 && (
              <button
                onClick={() =>
                  saveToCard(recipe._id)
                }
                className="BuyNow"
              >
                Buy Now
              </button>
            )}
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default AddtoCart;
