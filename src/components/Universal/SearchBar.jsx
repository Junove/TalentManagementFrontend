const SearchBar = (

) => {
    return (

        <div>
            <div className="row">
                <div className = "col-11"> 
                <input
                    id="search" 
                    className="ps-5 form-control rounded-pill border-1 w-100 pe-5"
                    placeholder="Search by Job Title.."/>

                </div>
            

            <div className="col-1">
                    <button className="btn override-button float-end ps-2">Go</button>
                </div>

            </div>

           
            
        </div>
    )

}

export default SearchBar;

