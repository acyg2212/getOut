import React, { useState, useContext } from "react";
import AuthContext from '../../auth'

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("")

    const { fetchWithCSRF, setCurrentUserId } = useContext(AuthContext);
    const [errors, setErrors] = useState([]);

    const signUpSubmit = (e) => {
        e.preventDefault();
        // Make the following an IIFE?
        async function signupUser() {
            const response = await fetchWithCSRF(`/api/users/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    username,
                    password,
                    password2

                })
            });

            const responseData = await response.json();
            if (!response.ok) {
                setErrors(responseData.errors);
            } else {
                setCurrentUserId(responseData.current_user_id)
                // history.push('/users')
            }
        }
        signupUser();
    }


    return (
        <div className="sign-up-container">
            <form onSubmit={signUpSubmit}>
                <h3>Create a getOut Account</h3>
                <p className="form-p">Create a new account below</p>
                <a className="form-link" href=" /signin">or sign in here.</a>
                {errors.length ? errors.map(err => <li key={err} >{err}</li>) : ''}
                <input onChange={e => setFirstName(e.target.value)}
                    value={firstName}
                    type="text"
                    placeholder="First Name"
                    required />
                <input onChange={e => setLastName(e.target.value)}
                    value={lastName}
                    type="text"
                    placeholder="Last Name"
                    required />
                <input onChange={e => setUsername(e.target.value)}
                    value={username}
                    type="text"
                    placeholder="username"
                    required />
                <input onChange={e => setEmail(e.target.value)}
                    value={email}
                    type="email"
                    placeholder="Email"
                    required />
                <input onChange={e => setPassword(e.target.value)}
                    value={password}
                    type="password"
                    placeholder="Password"
                    required />
                <input onChange={e => setPassword2(e.target.value)}
                    value={password2}
                    type="password"
                    placeholder="Confirm Password"
                    required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;