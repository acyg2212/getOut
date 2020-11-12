import React, { useEffect, useState, useContext } from 'react'
import AuthContext from '../../auth'
import SiteCard from './SiteCard'
import landScape from '../../assets/landscape.jpg'


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
                const res = await fetch(`/api/activities`)

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
                console.log("DATA", javaData)

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

            <div className="search-results-container">
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