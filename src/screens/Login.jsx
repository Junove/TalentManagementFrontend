import {Link, useNavigate} from "react-router-dom";
import React , {useState, useContext} from 'react';
import axios from 'axios';
import {LoginComponent} from "./components/LoginComponent";

export default function Login(){
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");
    const {login, logout} = useContext(LoginContext);
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let url = "https://localhost:8080/login";
            let credentials ={"username":usernameInput, "password":passwordInput};
            const response = await axios.post(url, credentials);
            if(response.status == 200){
                let user = response.data;
                login(user)
                navigate("/")
            }
        }catch(error){
            setError(error.message);
        }
    };
    return (<><form onSubmit={handleSubmit}>
        <label htmlFor="usernameInput">Username:</label>
        <input type="text" 
                id="usernameInput" 
                value={usernameInput} 
                onChange={(e)=>setUsernameInput(e.target.value)}/>
        <label htmlFor="passwordInput">Password:</label>
        <input type="text"
            id="passwordInput"
            value={passwordInput}
            onChange={(e)=>setPasswordInput(e)}/>
        <button type="submit">Login</button>
    </form></>
    );
}