import React, { useState, useEffect } from "react";
import Campsites from './Campsites';




const SinglePlace = (props) => {

    const [imageArray, setImageArray] = useState([])
    const [siteData, setSiteData] = useState({})
    const [campsites, setCampsites] = useState([])

    const styleObj = {
        'max-width': '700px',
        'text-align': 'center',
        'border-top': "1px solid black"
    }

    useEffect(() => {
        console.log(props.location.pathname)
        async function getPageInfo() {
            const response = await fetch(`/api/ridb/facility/${props.location.pathname}`)
            if (!response.ok) {
            } else {
                const responseData = await response.json();
                let data = responseData.response;
                let javaData = JSON.parse(data);
                setSiteData(javaData);
                console.log("SinglePlaceSiteData", javaData)
            }
        }
        getPageInfo()
    }, [props.location.pathname])

    useEffect(() => {
        async function getSingleFacilityPhoto() {
            const response = await fetch(`/api/ridb/facility/${props.location.pathname}/media`);
            if (!response.ok) {
            } else {
                const responseData = await response.json()
                let data = responseData.response
                let javaData = JSON.parse(data)
                setImageArray(javaData.RECDATA)
                console.log(javaData.RECDATA)
            }
        }
        getSingleFacilityPhoto()
    }, [props.location.pathname])
    console.log(imageArray.length > 0)

    useEffect(() => {
        async function getCampsites() {
            const response = await fetch(`/api/ridb/facility/${props.location.pathname}/campsites`);
            if (!response.ok) {
            } else {
                const responseData = await response.json()
                let data = responseData.response
                let javaData = JSON.parse(data)
                setCampsites(javaData.RECDATA)
                console.log(javaData.RECDATA)
            }
        }
        getCampsites()
    }, [props.location.pathname])

    return (
        <div className="single-place-container">
            {imageArray.length > 0 ? <div className="single-place-image-div">
                {imageArray.map(image => {

                    return <img className="single-place-image" src={image.URL} alt={image.Title} />

                })}
            </div> : "No Image Available"}
            <h1>{siteData.FacilityName}</h1>
            <div className="dangerously-set-div" dangerouslySetInnerHTML={{ __html: siteData.FacilityDescription }} style={styleObj} />
            <h1 className="campsites-headline">Campsites Nearby</h1>
            <div className="campsite-group-div">
                {campsites.length > 0 ? campsites.map(campsite => <Campsites campsite={campsite} />) : ""}
            </div>
        </div>
    )
}

export default SinglePlace;