import SearchBar from "../components/Universal/SearchBar.jsx"
import JobPosting from "../components/Jobs/JobPosting.jsx";
import './index.css'

function Search() {

    return (
        <div> 
            <div className = "p-2">
            <SearchBar />
            </div>
            
            <div className = "row ps-5 pe-5"  >
                
                
                <div className = "col-12">
                    <ul className="list-group">
                        <JobPosting/>
                    </ul>
                

                </div>
                
                
            </div>

        </div>
        
    )
}

export default Search;