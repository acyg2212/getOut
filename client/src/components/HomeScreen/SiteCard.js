import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../../auth';

const SiteCard = ({ title, id }) => {
    const { fetchWithCSRF } = useContext(AuthContext);
    const [imageArray, setImageArray] = useState([]);
    console.log(id)
    useEffect(() => {
        async function getPhoto() {
            const response = await fetchWithCSRF(`/api/ridb/facility`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    id
                })
            });
            if (!response.ok) {
            } else {
                const responseData = await response.json()
                let data = responseData.response
                let javaData = JSON.parse(data)
                setImageArray(javaData.RECDATA)
            }
        }
        getPhoto()
    }, [id])
    const url = `/${id}`
    return (

        <a href={url}>
            <div className="card-container">
                <div>
                    {imageArray.length > 0 ? <img className="card-image" src={imageArray[0].URL}
                        alt={imageArray[0].Title} /> : <div className="card-div">No Image Available</div>}
                </div>
                <div className="card-h3">
                    <h3 >{title}</h3>
                </div>
            </div>
        </a>
    )
}

export default SiteCard;