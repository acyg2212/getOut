import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../../auth'
import SiteCard from './SiteCard'
import landScape from '../../assets/landscape.jpg'
import newyork from '../../assets/newyork.jpg'
import colorado from '../../assets/colorado.jpg'
import california from '../../assets/california.jpg'
import washington from '../../assets/washington.jpg'


const HomePage = () => {

    const [searchValue, setSearchValue] = useState("");
    const [searchData, setSearchData] = useState(null)
    const [activityArray, setActivityArray] = useState([])
    const [selectedValue, setSelectedValue] = useState(null)
    const { fetchWithCSRF } = useContext(AuthContext);

    const selectorValue = (e) => {
        setSelectedValue(e.target.value)
    }


    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`/api/activities/`)

                if (res.ok) {
                    const data = await res.json()
                    // shuffle(data.followerPosts[0])
                    setActivityArray(data.activities)
                }
            } catch (err) {
                console.error(err)
            }
        })()
    }, [])

    const searchBarFunction = (e) => {
        e.preventDefault();
        async function searchIt() {


            const response = await fetchWithCSRF(`/api/ridb/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({
                    selectedValue,
                    searchValue
                })
            });
            const responseData = await response.json();
            if (!response.ok) {
                console.error("ERROR")
            } else {
                let data = responseData.response
                let javaData = JSON.parse(data)
                setSearchData(javaData.RECDATA)
                window.scrollTo(0, 900);

            }
        }
        searchIt();
    }



    return (
        <div className="home-container">
            <h1>Find Your Next Adventure</h1>

            <form onSubmit={searchBarFunction}>
                <div className="search-bar-container">
                    <div>
                        <input className="search-bar" type="text"
                            placeholder="🔍 Try Allegheny National Forest"
                            onChange={e => setSearchValue(e.target.value)}
                            value={searchValue} />
                    </div>
                    <div>
                        <select onChange={selectorValue}>
                            {activityArray.length > 0 ? activityArray.map(activity => {
                                return <option key={activity.id} value={activity.activity}>{activity.activity}</option>
                            }) : ""}
                        </select>
                    </div>
                    <div>
                        <button type="submit">Search</button>
                    </div>
                </div>
            </form>
            <img className="landscape-img" src={landScape} alt="landscape of rocks and sand" />
            <div className="places-to-visit-container">
                <h2>Venture anywhere</h2>
                <div className="state-sites-div">
                    <button className="state-sites-button" onClick={e => { setSelectedValue("Camping"); setSearchValue("California"); searchBarFunction(e) }}>
                        <img className="state-sites-img" src={california} alt="a tent with sun shining through trees" />
                        <h4>California</h4>
                    </button>
                    <button className="state-sites-button" onClick={e => { setSelectedValue("Camping"); setSearchValue("New York"); searchBarFunction(e) }}>
                        <img className="state-sites-img" src={newyork} alt="a couple of cabins" />
                        <h4>New York</h4>
                    </button>
                    <button className="state-sites-button" onClick={e => { setSelectedValue("Camping"); setSearchValue("Washington"); searchBarFunction(e) }}>
                        <img className="state-sites-img" src={washington} alt="tent in the woods" />
                        <h4>Washington</h4>
                    </button>
                    <button className="state-sites-button" onClick={e => { setSelectedValue("Camping"); setSearchValue("Colorado"); searchBarFunction(e) }}>
                        <img className="state-sites-img" src={colorado} alt="campsite" />
                        <h4>Colorado</h4>
                    </button>
                </div>
            </div>
            <div>
                {searchData ? <h2>Adventures for {searchValue}</h2> : ""}
            </div>
            <div id="search" className="search-results-container">

                {searchData ? searchData.map(site => {
                    return (
                        <div key={site.FacilityID} className="search-results-div">
                            <SiteCard id={site.FacilityID} description={site.FacilityDescription} title={site.FacilityName} />
                        </div>
                    )
                }) : ""}

            </div>
        </div >
    )
}

export default HomePage;