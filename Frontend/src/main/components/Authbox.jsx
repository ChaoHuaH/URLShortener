import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useGlobalContext } from "../../context/GlobalContext";
import "../../styles/style.scss";
const AuthBox = ({register}) => {
    const {loggedin, setLoggedin} = useGlobalContext();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        const formData = new URLSearchParams();
    
        if (register){
            formData.append('name', name);
            formData.append('email', email);
            formData.append('password', password);
        } else {
            formData.append('email', email);
            formData.append('password', password);
        }
    
        try {
            const response = await axios.post(
                register ? "http://localhost:8080/api/auth/register" : "http://localhost:8080/api/auth/login",
                formData,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    }
                }
            );
            
            setLoading(false);
            if (register) {
                if (response.data === "User registered successfully") {
                    alert("User registered successfully");
                    navigate('/login');
                }
            } else {
                navigate('/customization');
                setLoggedin(true);
            }
        } catch (err) {
            setLoading(false);
            console.error("An error occurred", err);
        }
    };
    return (
        <div className="auth">
            <div className="auth__box">
                <div className="auth__header">
                    <h1> {register ? "Register" : "Login"}</h1>
                </div>
                <form onSubmit={onSubmit}>
                    {register &&                     
                        <div className="auth__field">
                            <label>Name</label>
                            <input type="text" value={name}
                            onChange={(e) => setName(e.target.value)}/>
                        </div>
                    }
                    <div className="auth__field">
                        <label>Email</label>
                        <input type="text" value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="auth__field">
                        <label>Password</label>
                        <input type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                    </div>

                    <div className="auth__footer">
                        <button className="btn" disabled={loading} type="submit"> {register ? "Register" : "Login"} </button>
                        {!register ? (
                            <div className="auth__register">
                                <p>
                                    Not a member? <Link to="/register">Register Now!</Link>
                                </p>
                            </div>
                        ) : (
                            <div className="auth__register">
                                <p>
                                    Already a member? <Link to="/login">Login Now!</Link>
                                </p>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuthBox;