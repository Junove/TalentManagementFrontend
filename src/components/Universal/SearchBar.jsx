import "./index.css"
import { useState, useEffect } from "react";

const SearchBar = ( {onSearch}

) => {

    const [searchVal, setSearchVal] = useState("");
    const [matches, setMatches] = useState("");

    // const handleSearchClick = () => {
    //     onSearch(searchVal); // Pass the search value to the parent
    // };

    useEffect(() => {
        onSearch(searchVal);
    },[searchVal, onSearch]);

    return (

        <div>
            <div className="row">
                <div className = "col-11"> 
                <input
                    id="search" 
                    className="ps-5 form-control rounded-pill border-1 w-100 pe-5 override-border-black"
                    placeholder="Search by Job Title.."
                    onChange={e => setSearchVal(e.target.value)}
                    value={searchVal}
                    >
                </input>

                </div>
            

            <div className="col-1">
                    <button 
                        className="btn float-end ps-2 w-100 override-button-go"
                        // onClick={handleSearchClick}
                    >Go</button>
                </div>

            </div>

           
            
        </div>
    )

}

export default SearchBar;

