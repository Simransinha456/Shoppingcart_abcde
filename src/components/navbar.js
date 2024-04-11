import React from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import "./navbar.css"
import logo from "../components/logo2.png"

function Navbar() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const Logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/login");
  };

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <img src={logo} alt='Logo' style={{ height: "50px", width: "150px", margin: "10px" }} />
      </div>
      <div className='navbar-right'>
        <Link to="/">Home</Link>
        {!cookies.access_token ? (
          <Link to="/login">Login/Register</Link>
        ) : (
          <div className='button'>
            <Link to="/add-to-cart">Add to cart</Link>
            <Link to="/orders">Orders</Link> 
            <button onClick={Logout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
