import React, { useContext } from 'react';
import AuthContext from '../auth';
import SignIn from './SignUpLogInComponents/SignIn'


const ModalAuth = (props) => {
    const { currentUserId } = useContext(AuthContext)
    const closeWindow = (e) => {
        props.closeWindow && props.closeWindow(e)
    }
    if (props.authWindow === false || currentUserId) {
        return null;
    }
    return (
        <div className="login-modal">
            <div className="login-button-container">
                <button className="close-button" onClick={closeWindow}>x</button>
            </div>
            <SignIn />
        </div>
    )

}

export default ModalAuth