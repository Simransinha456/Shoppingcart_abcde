import React, { useEffect, useState } from "react";
import useGetUserID from "../hooks/useGetUserID.js";
import axios from "axios";
import { useCookies } from "react-cookie";
import "./add-to-cart.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Order = () => {
  const [order, setOrder] = useState([]);
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
    const fetchOrders = async () => {
      try {
        // console.log(userID,"=============")
        const response = await axios.get(`https://shoppingcart-backend.vercel.app/orders/${userID}`);
        setOrder(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchOrders();
    }, [userID]);


  const saveToCard = async (recipeID) => {
    try {
      const response = await axios.post(
        "https://shoppingcart-backend.vercel.app/orders",
        {
          recipeID,
          userID,
        },
        { headers: { authorization: cookies.access_token } }
      );
      console.log(response.data);
      toast.success("Items Saved Successfully", toastVariables);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mainbox">
      {cookies.access_token ? <h1>Your Orders</h1> : <h1>Login first</h1>}
      <ul className="saveMain">
        {order?.map((recipe,index) => (
          <li key={recipe._id}>
            <div>
              <h3 style={{ margin: 0 }}>{recipe.name}</h3>
            </div>
            <p>{recipe.description}</p>
            {/* <span>
              <button
                onClick={() => handleDelete(recipe._id)}
                className="Remove"
              >
                {" "}
                Remove from cart{" "}
              </button>
            </span> */}

            <img src={recipe.imageUrl} alt={recipe.name}  style={{height:"460px"}}/>
            <div style={{ display: "flex", alignItems: "center" }}></div>
            {/* {savedRecipes.length > 0 && (
              <button
                onClick={() =>
                  saveToCard(recipe._id)
                }
                className="BuyNow"
              >
                Buy Now
              </button>
            )} */}
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

export default Order;
