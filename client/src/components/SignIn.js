import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { NavLink, Redirect } from "react-router-dom";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
    }

    return (
        <div className="signin-container">
            <ul>

            </ul>
            <form onSubmit={handleSubmit}>
                <h1 className="login-header">Sign In</h1>
                <p className="form-p">Sign in below or</p>
                <a className="form-link" href='/sign-up'>create an account.</a>
                <div>
                    <input onChange={e => setEmail(e.target.value)}
                        value={email || ""}
                        type="email"
                        placeholder="Email"
                        required />
                    <input onChange={e => setPassword(e.target.value)}
                        value={password || ""}
                        type="password"
                        placeholder="Password"
                        required />
                    <button type="submit">Sign In</button>
                </div>
            </form>
        </div>
    )
}

export default SignIn;