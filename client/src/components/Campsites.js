import React from 'react';


const Campsites = ({ campsite }) => {

    return (

        <div value={campsite.CampsiteID} className="campsite-card" >

            {campsite.ENTITYMEDIA.length > 0 ? <img value={campsite.CampsiteID} className="campsite-card-image" src={campsite.ENTITYMEDIA[0].URL} alt={campsite.Title} /> : <div value={campsite.CampsiteID} className="campsite-no-image">No Image Available</div>}

            <h3 value={campsite.CampsiteID}>{campsite.CampsiteName}</h3>
            <ul value={campsite.CampsiteID}>
                <h5 value={campsite.CampsiteID}>Permitted Equipment</h5>
                {campsite.PERMITTEDEQUIPMENT.length > 0 ? campsite.PERMITTEDEQUIPMENT.map((equipment, i) => {
                    return <li value={campsite.CampsiteID} key={i}>{equipment.EquipmentName}</li>
                }) : <div value={campsite.CampsiteID}></div>}
            </ul>


        </div >
    )

}

export default Campsites;