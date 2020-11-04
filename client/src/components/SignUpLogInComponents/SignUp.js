import React, { useState } from "react";

const SignUp = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const signUpSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="sign-up-container">
            <form onSubmit={signUpSubmit}>
                <h3>Create a getOut Account</h3>
                <p className="form-p">Create a new account below</p>
                <a className="form-link" href=" /signin">or sign in here.</a>
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
                    type="pasword"
                    placeholder="Password"
                    required />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUp;