import SearchBar from "../components/Universal/SearchBar.jsx"
import JobPosting from "../components/Jobs/JobPosting.jsx";
import './index.css'

function Search() {

    return (
        <div> 
            <div className = "p-2">
            <SearchBar />
            </div>
            
            <div className = "row">
                <div className = "col-3">

                </div>
                <div className = "col-6">
                <ul className="list-group">
                <JobPosting/>
                </ul>
                <div className = "col-3">

                </div>

                </div>
                
                
            </div>

        </div>
        
    )
}

export default Search;