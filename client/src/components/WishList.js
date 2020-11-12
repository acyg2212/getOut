import React, { useEffect, useContext, useState } from 'react';
import AuthContext from '../auth'

const WishList = () => {
    const [trips, setTrips] = useState([]);
    const { currentUserId } = useContext(AuthContext)
    console.log(trips)
    useEffect(() => {
        async function getTrips() {
            const response = await fetch(`api/trips/wishlist/${currentUserId}`)
            if (response.ok) {
                const data = await response.json()
                setTrips(data.trips)


            }
        }
        getTrips();
    }, [])
    return (
        <div className="trip-container">
            <div className="trip-line">
                <h4 className="profile-trip-header">Campground</h4>
                <h4 className="profile-trip-header">Campsite</h4>
            </div>
            {trips.length > 0 ? trips.map((trip, index) => {
                return (
                    <a href={`/${trip.facility_id}`}>
                        <div key={index} className="trip-line">
                            <h4>{trip.site_name}</h4>
                            <h4>{trip.campName}</h4>
                        </div>
                    </a>
                )
            }) : ''}
        </div>
    )
}

export default WishList;