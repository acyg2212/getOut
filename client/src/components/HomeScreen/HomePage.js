import React, { useState } from 'react'


const HomePage = ({ currentUserId }) => {

    const [searchValue, setSearchValue] = useState("");


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
                console.log(javaData)

            }
        }
        searchIt();
    }



    return (
        <div className="home-container">
            <h1>Find Your Next Adventure</h1>
            <form onSubmit={searchBarFunction}>
                <div className="search-bar">
                    <div>
                        <input type="text"
                            placeholder="🔍 Try Allegheny National Forest"
                            onChange={e => setSearchValue(e.target.value)}
                            value={searchValue} />
                    </div>
                    <div>
                        <button type="submit">Search</button>
                    </div>
                </div>
            </form>
            <div className="search-results-div">

            </div>

        </div>
    )
}

export default HomePage;