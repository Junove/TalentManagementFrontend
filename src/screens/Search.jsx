import SearchBar from "../components/Universal/SearchBar.jsx"
import JobPosting from "../components/Jobs/JobPosting.jsx";
import './index.css'
import axios from 'axios';
import { useState, useEffect } from "react";

function Search() {
    const REST_URL = 'http://localhost:8080/jobs';
    const [jobs, getJobs] = useState([]);
    //const [refresh, setRefresh] = useState(false); // state to trigger re-fetch
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filters, setFilters] = useState({
        jobTitle: "",
        status: "",
        department: ""
    });

    useEffect(() => { 
        getJobListings(); 
      }, []);

    useEffect(() => {
        const {jobTitle, status, department} = filters;
        const filtered = jobs.filter(job => {
            return (
                (!jobTitle || job.job_title.toLowerCase().includes(jobTitle.toLowerCase())) &&
                (!status || job.listing_status.toLowerCase().includes(status.toLowerCase())) &&
                (!department || job.department.toLowerCase().includes(department.toLowerCase())) 
            );
        });
        setFilteredJobs(filtered);
    }, [filters, jobs]);

    const getJobListings = async () => {
        try {
          const response = await axios.get(`${REST_URL}`);
          getJobs(response.data);
          //nextId = getNextId(response.data);
          setFilteredJobs(response.data);
          console.log("Job Listings (JSON):", JSON.stringify(response.data, null, 2));
          } catch(error){
              console.error("error fetching jobs: ", error);}
        }


        function getNextId(jobs){
            let maxid = 0;
            for( let item of jobs){
              maxid = (item.id > maxid)?item.id:maxid;
            }  
            return maxid + 1;
          }
        
          var nextId;

        const handleSearch = (newFilters) => {
            setFilters(prevFilters => ({
                ...prevFilters,
                ...newFilters
            }));
        };

    return (
        <div> 
            <div className = "p-2">
            <SearchBar onSearch={handleSearch}/>
            </div>
            
            <div className = "row ps-5 pe-5"  >
                
                
                <div className = "col-12">
                    <ul className="list-group">
                    {filteredJobs.map(job => <JobPosting
                        key={job.id}
                        job={job}/>)}
                    </ul>
                

                </div>
                
                
            </div>

        </div>
        
    )
}

export default Search;