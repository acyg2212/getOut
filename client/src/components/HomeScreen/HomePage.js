import React, { useState } from 'react'


const HomePage = ({ currentUserId }) => {

    const [searchValue, setSearchValue] = useState("");
    const [searchData, setSearchData] = useState(null)

    const searchBarFunction = (e) => {
        e.preventDefault();
        async function searchIt() {
            let searchParams = encodeURIComponent(searchValue)

            const response = await fetch(`/api/ridb/${searchParams}`);
            const responseData = await response.json();
            if (!response.ok) {

            } else {
                let data = responseData.response
                let javaData = JSON.parse(data)
                console.log(javaData.RECDATA)
                setSearchData(javaData.RECDATA)

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
                        <button type="submit">Search</button>
                    </div>
                </div>
            </form>
            <div className="search-results-container">
                {searchData ? searchData.map(site => {
                    return (
                        <div key={site.RecAreaID} className="search-results-div">
                            <h3>{site.RecAreaName}</h3>
                            <p>{site.RecAreaDescription}</p>
                        </div>
                    )
                }) : ""}
            </div>

        </div >
    )
}

export default HomePage;