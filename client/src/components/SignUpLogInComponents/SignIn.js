import React, { useContext, useState } from "react";
import { useHistory } from 'react-router-dom'
import AuthContext from '../../auth'

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errs, setErrors] = useState("");
    const { fetchWithCSRF, setCurrentUserId } = useContext(AuthContext);
    let history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        async function loginUser() {
            const response = await fetchWithCSRF(`api/users/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const responseData = await response.json();
            if (!response.ok) {
                setErrors(responseData.errors);
            } else {
                setCurrentUserId(responseData.setCurrentUserId);
                history.push('/')
            }
        }
        loginUser();
    }


    return (
        <div className="signin-container">
            <ul>
                {errs.length ? errs.map(error => <li key={error}>{error}</li>) : ""}
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