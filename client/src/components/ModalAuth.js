import React, { useContext } from 'react';
import AuthContext from '../auth';
import SignIn from './SignUpLogInComponents/SignIn'
import SignUp from './SignUpLogInComponents/SignUp'

const ModalAuth = (props) => {
    const { currentUserId } = useContext(AuthContext)
    const closeWindow = (e) => {
        props.closeWindow(e)
    }
    if (props.authWindow === "0" || currentUserId) {
        return null;
    }
    return (
        <div className="login-modal">
            <div className="login-button-container">
                <button className="close-button" value="0" onClick={closeWindow}>x</button>
            </div>
            {props.authWindow === "1" ? <SignIn /> : <SignUp />}
        </div>
    )

}

export default ModalAuth