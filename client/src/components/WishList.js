import React, { useEffect, useContext, useState } from 'react';
import AuthContext from '../auth';
import { useHistory } from 'react-router-dom';


const WishList = () => {
    const [trips, setTrips] = useState([]);
    const [response, setData] = useState(null)
    const { currentUserId, fetchWithCSRF } = useContext(AuthContext)
    let history = useHistory();


    const handleDelete = (e) => {
        e.preventDefault();
        async function deleteTrip() {
            const response = await fetchWithCSRF(`/api/trips/delete/${e.target.value}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({})
            });

            const responseData = await response.json();
            if (!response.ok) {

            } else {
                // setCurrentUserId(responseData.current_user_id)
                history.push('/profile')
                setData(responseData)
            }
        }
        deleteTrip()
    }

    useEffect(() => {
        async function getTrips() {
            const response = await fetch(`api/trips/wishlist/${currentUserId}`)
            if (response.ok) {
                const data = await response.json()
                setTrips(data.trips)


            }
        }
        getTrips();
    }, [response])


    return (
        <div className="trip-container">
            <div className="trip-line">
                <h4 className="profile-trip-header">Campground</h4>
                <h4 className="profile-trip-header">Campsite</h4>
            </div>
            {trips.length > 0 ? trips.map((trip, index) => {
                return (

                    <div key={index} className="trip-line">
                        <a href={`/${trip.facility_id}`} className="link-wishlist">
                            <div className="trips-wishlist-link">
                                <h4>{trip.site_name}</h4>
                                <h4>{trip.campName}</h4>
                            </div>
                        </a>
                        <button className="delete-trip-button" onClick={handleDelete} value={trip.id}>x</button>
                    </div>

                )
            }) : ''}
        </div>
    )
}

export default WishList;