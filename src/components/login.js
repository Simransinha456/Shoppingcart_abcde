import React, { useState } from 'react'
import Form from './form'
import {useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [ _, setCookies] = useCookies(["access_token"])

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
        <Form 
        username = {username}
        setUsername = {setUsername}
        password = {password}
        setPassword = {setPassword} 
        label= "Login" 
        onSubmit= {onSubmit}
         />
    )
}

export default Login