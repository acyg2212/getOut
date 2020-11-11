import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../auth";

const Trips = () => {
    const [trips, setTrips] = useState([]);
    const { currentUserId } = useContext(AuthContext)
    console.log(trips)
    useEffect(() => {
        async function getTrips() {
            const response = await fetch(`api/trips/${currentUserId}`)
            if (response.ok) {
                const data = await response.json()
                setTrips(data.trips)


            }
        }
        getTrips();
    }, [])
    const convertDate = (data) => {
        let [month, date, year] = new Date(data).toLocaleDateString("en-US").split("/")
        return `${month}/ ${date}/ ${year}`

    }
    return (
        <div className="trip-container">
            <div className="trip-line">
                <h4>Date</h4>
                <h4>Campground</h4>
                <h4>Campsite</h4>
            </div>
            {trips.length > 0 ? trips.map((trip, index) => {
                return (
                    <div key={index} className="trip-line">
                        <h4>{convertDate(trip.date_traveled)}</h4>
                        <h4>{trip.site_name}</h4>
                        <h4>{trip.campName}</h4>
                    </div>
                )
            }) : ''}
        </div>
    )
}

export default Trips;