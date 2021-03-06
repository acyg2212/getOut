import React, { useState, useEffect } from "react";
import Campsites from './Campsites';
import ModalWindow from "./ModalWindow";




const SinglePlace = (props) => {

    const [imageArray, setImageArray] = useState([])
    const [siteData, setSiteData] = useState({})
    const [campsites, setCampsites] = useState([])
    const [show, setShow] = useState(false);
    const [campsite, setCampsite] = useState(null)

    const showModal = e => {
        setCampsite(e.target.getAttribute('value'));
        setShow(!show)
    }


    const styleObj = {
        'maxWidth': '700px',
        'textAlign': 'center',
        'borderTop': "1px solid black"
    }

    useEffect(() => {
        async function getPageInfo() {
            const response = await fetch(`/api/ridb/facility/${props.location.pathname}`)
            if (!response.ok) {
            } else {
                const responseData = await response.json();
                let data = responseData.response;
                let javaData = JSON.parse(data);
                setSiteData(javaData);
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
            }
        }
        getSingleFacilityPhoto()
    }, [props.location.pathname])

    useEffect(() => {
        async function getCampsites() {
            const response = await fetch(`/api/ridb/facility/${props.location.pathname}/campsites`);
            if (!response.ok) {
            } else {
                const responseData = await response.json()
                let data = responseData.response
                let javaData = JSON.parse(data)
                setCampsites(javaData.RECDATA)
            }
        }
        getCampsites()
    }, [props.location.pathname])

    return (
        <div className="single-place-container">
            {imageArray.length > 0 ? <div className="single-place-image-div">
                {imageArray.map(image => {

                    return <img className="single-place-image" key={image.EntityMediaID} src={image.URL} alt={image.Title} />

                })}
            </div> : "No Image Available"}
            {/* {imageArray.length > 0 ? <ImageSlideShow imageArray={imageArray} /> : "No Image Available"} */}
            <h1>{siteData.FacilityName}</h1>
            <div className="dangerously-set-div" dangerouslySetInnerHTML={{ __html: siteData.FacilityDescription }} style={styleObj} />
            <h1 className="campsites-headline">Campsites Nearby</h1>
            <h3> Click Campsite to Add to Places Traveled or Your Wish List</h3>
            <div className="campsite-group-div">
                {campsites.length > 0 ? campsites.map(campsite => {
                    return (
                        <button className="campsite-card-button" onClick={showModal} key={campsite.CampsiteID} value={campsite.CampsiteID}>
                            <div value={campsite.CampsiteID}>
                                <Campsites campsite={campsite} value={campsite.CampsiteID} />
                            </div>
                        </button>)
                }) : ""}
            </div>
            <div className="modal-window-container">
                <ModalWindow onClose={showModal} show={show} facilityName={siteData.FacilityName} campsite={campsite} />
            </div>
        </div>
    )
}

export default SinglePlace;