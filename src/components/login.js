import React, { useState } from 'react'
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [ _, setCookies] = useCookies(["access_token"])

    const toastVariables = {
        position: "top-right", 
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const navigate = useNavigate()
    const onSubmit = async (event)=> {
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:8000/auth/login", {username, password});
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            
          navigate ('/')

        } catch(error) {
            console.log(error)
        }

    }
    return (
        <div className='auth-container'>
            <form onSubmit= {onSubmit}>
                <h2> Login</h2>
                <div className='form-group'>
                    <label for="username"> Username: </label>
                    <input type='text' id="username" value= {username} onChange={(event) => setUsername(event.target.value)} />
                </div>

                <div className='form-group'>
                    <label for="password"> Password: </label>
                    <input type='password' id="password" value= {password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type='submit'>Login</button>
            </form>
            <ToastContainer/>
        </div>
    )
}
export default Login 