import React from 'react';


const Campsites = ({ campsite }) => {

    return (

        <div className="campsite-card">

            {campsite.ENTITYMEDIA.length > 0 ? <img className="campsite-card-image" src={campsite.ENTITYMEDIA[0].URL} alt={campsite.Title} /> : <div className="campsite-no-image">No Image Available</div>}

            <h3>{campsite.CampsiteName}</h3>
            <ul>
                <h5>Permitted Equipment</h5>
                {campsite.PERMITTEDEQUIPMENT.length > 0 ? campsite.PERMITTEDEQUIPMENT.map(equipment => {
                    return <li>{equipment.EquipmentName}</li>
                }) : ""}
            </ul>


        </div >
    )

}

export default Campsites;