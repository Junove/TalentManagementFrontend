import "./index.css"
import { useState, useEffect } from "react";

const SearchBar = ( {onSearch}

) => {

    const [filters, setFilters] = useState(
        {
            jobTitle: "",
            status: "",
            dep: ""
        }
    );

    // const handleSearchClick = () => {
    //     onSearch(searchVal); // Pass the search value to the parent
    // };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [id]: value
        }));
    };

    useEffect(() => {
        onSearch(filters);
    },[filters, onSearch]);

    return (

        <div>
            <div className="row">
                <div > 
                    <div className = "pb-2">
                    <input 
                    id="jobTitle" 
                    className=" col-4 ps-5 form-control border-1 w-100 pe-5 override-border-black"
                    placeholder="Job Title"
                    onChange={handleInputChange}
                    value={filters.jobTitle}
                    >
                </input>
                    </div>

                    <div className="pb-2">
                    <select 
                    id="status" 
                    className=" col-4 ps-5 form-control border-1 w-100 pe-5 override-border-black"
                    placeholder="Listing Status"
                    onChange={handleInputChange}
                    value={filters.status}
                    >

                        <option value="">Select Listing Status</option>
                        <option value="Open">Open</option>
                        <option value="Closed">Closed</option>
                </select>

                    </div>
                
                <div className="pb-2">
                <input 
                    id="department" 
                    className=" col-4 ps-5 form-control border-1 w-100 pe-5 override-border-black"
                    placeholder="Department"
                    onChange={handleInputChange}
                    value={filters.department}
                    >
                </input>

                </div>
               
               

                </div>
            

            {/* <div className="col-1">
                    <button 
                        className="btn float-end ps-2 w-100 override-button-go"
                        // onClick={handleSearchClick}
                    >Go</button>
                </div> */}

            </div>

           
            
        </div>
    )

}

export default SearchBar;

