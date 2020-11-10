import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../auth';
import Trips from './Trips';
import WishList from './WishList';
import Reviews from './Reviews';
import ProfileForm from './ProfileForm';

const Profile = () => {
    const { currentUserId, fetchWithCSRF } = useContext(AuthContext);
    const [profileToggle, setProfileToggle] = useState(0)
    const [profileForm, setProfileForm] = useState(false)
    const [firstName, setFirstName] = useState('')

    useEffect(() => {
        async function getFirstName() {
            const response = await fetch(`api/users/${currentUserId}`)
            if (response.ok) {
                const data = await response.json()
                setFirstName(data.user.firstName)

            }
        }
        getFirstName();
    }, [])

    const profileSwitch = (e) => {
        setProfileToggle(e.target.value);
    }

    const showProfileForm = (e) => {
        setProfileForm(!profileForm)
    }

    return (
        <div className="profile-container">
            <div className="profile-first-name">
                <h1>{firstName}</h1>
                {/* <button className="create-a-trip-button" onClick={showProfileForm} > Create A Trip </button>
                {profileForm ? <ProfileForm /> : ''} */}
            </div>
            <div className="profile-right-side">
                <div className="profile-trip-div">
                    <button className="profile-buttons" onClick={profileSwitch} value="1">Trips</button>
                    <button className="profile-buttons" onClick={profileSwitch} value="2">Wish List</button>
                    <button className="profile-buttons" onClick={profileSwitch} value="3">Reviews</button>
                </div>
                <div className="list-view">
                    {profileToggle === '1' ? <Trips /> : profileToggle === '2' ? <WishList /> : profileToggle === '3' ? <Reviews /> : ''}
                </div>
            </div>
        </div>
    )
}

export default Profile;