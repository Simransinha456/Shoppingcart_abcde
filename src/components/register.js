import React, { useState } from 'react'
import Form from "../components/form.js"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


function Register() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:8000/auth/register", {username, password});
            alert ("Registration completed! Please Login");
            navigate("/login")
        }
        catch(error) {
            console.log(error);
        }
    };
    return (
        <Form 
        username = {username}
        setUsername = {setUsername}
        password = {password}
        setPassword = {setPassword} 
        label = "Register" 
        onSubmit = {onSubmit} />

    )
}

export default Register