import React, { useContext, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthContext from '../auth';
import { useHistory } from 'react-router-dom'

const ModalWindow = (props) => {
    const { currentUserId, fetchWithCSRF } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());
    const [wishList, setWishList] = useState(false)
    const facilityName = props.facilityName;
    const campsiteName = props.campsite;
    let history = useHistory();

    console.log(wishList)
    const onClose = e => {
        props.onClose && props.onClose(e);
    };
    const checkboxChecked = (e) => {
        setWishList(!wishList)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        async function submitAdventure() {
            const response = await fetchWithCSRF(`api/trips/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    facilityName,
                    campsiteName,
                    wishList,
                    startDate,
                    currentUserId
                })
            });
            const responseData = await response.json();
            if (!response.ok) {
                console.error(responseData)
            } else {
                console.log(responseData)
                history.push('/')
            }
        }
        submitAdventure();
    }


    if (props.show === false) {
        return null;
    }
    return (
        <div className="modal-div" >
            <div className="button-container">
                <button className="close-button" onClick={onClose}>x</button>
            </div>
            <div className="create-adventure-container">
                <h2 className="create-post-headline">Create Your Outdoor Experience</h2>
                <form id="adventure-create-form" onSubmit={handleSubmit}>
                    <div className="modal-form-div">
                        <label for="facilityName">Facility Name:</label>
                        <input type="text" name="facilityName" value={props.facilityName} readOnly />
                    </div>
                    <div className="modal-form-div">
                        <label for="campsiteName">Campsite Name:</label>
                        <input type="text" name="campsiteName" value={props.campsite} readOnly />
                    </div>
                    <div className="modal-form-div">
                        <label for="wishList">Add to Wish List:</label>
                        <input type="checkbox" name="wishList" onChange={checkboxChecked} />
                    </div>
                    {wishList ? "" :
                        <div className="modal-form-div">
                            <label>Date Visited: </label>
                            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
                        </div>}
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div >
    );
}

export default ModalWindow;