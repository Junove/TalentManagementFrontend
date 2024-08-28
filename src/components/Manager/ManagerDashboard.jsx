

import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, Button, Grid, IconButton, Pagination, Paper, TextField } from '@mui/material';
import { Link } from 'react-router-dom';  // Import Link component
import EditIcon from '@mui/icons-material/Edit';
import SortIcon from '@mui/icons-material/Sort';
import axios from 'axios';

function ManagerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByDate, setSortByDate] = useState('asc');
  const [sortByStatus, setSortByStatus] = useState('asc');
  const jobsPerPage = 5;

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8080/jobs/managerspec/1'); // Replace with actual manager ID
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs', error);
    }
  };

  const handleStatusToggle = async (jobId) => {
    try {
      const updatedJob = jobs.find(job => job.id === jobId);
      const newStatus = updatedJob.listing_status === 'Open' ? 'Closed' : 'Open';
      updatedJob.listing_status = newStatus;

      await axios.put(`http://localhost:8080/jobs/${jobId}`, updatedJob);

      setJobs((prevJobs) =>
        prevJobs.map((job) => (job.id === jobId ? { ...job, listing_status: newStatus } : job))
      );
    } catch (error) {
      console.error('Error updating job status', error);
    }
  };

  const handleSortByDate = () => {
    const sortedJobs = [...jobs].sort((a, b) => {
      return sortByDate === 'asc'
        ? new Date(a.date_listed) - new Date(b.date_listed)
        : new Date(b.date_listed) - new Date(a.date_listed);
    });
    setJobs(sortedJobs);
    setSortByDate(sortByDate === 'asc' ? 'desc' : 'asc');
  };

  const handleSortByStatus = () => {
    const sortedJobs = [...jobs].sort((a, b) => {
      return sortByStatus === 'asc'
        ? a.listing_status.localeCompare(b.listing_status)
        : b.listing_status.localeCompare(a.listing_status);
    });
    setJobs(sortedJobs);
    setSortByStatus(sortByStatus === 'asc' ? 'desc' : 'asc');
  };

  const filteredJobs = jobs.filter(job => 
    job.job_title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 1 }} >
      <Box marginBottom={3}>
        <Typography variant="h4" component="h1">
          Manager Dashboard
        </Typography>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={2}>
        <Typography variant="h6">Job Listings</Typography>
        <Button variant="contained" color="primary">
          Create Job
        </Button>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom={3}>
        <TextField
          label="Search"
          variant="outlined"
          size="small"
          style={{ width: '50%' }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Box display="flex" alignItems="center">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleSortByDate}
            startIcon={<SortIcon />}
            style={{ marginRight: '10px' }}
          >
            Sort by Date
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={handleSortByStatus}
            startIcon={<SortIcon />}
          >
            Sort by Status
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2}>
        {currentJobs.map((job) => (
          <Grid item xs={12} key={job.id}>
            <Paper elevation={1} style={{ padding: '10px', display: 'flex', alignItems: 'center' }}>
              <Box flexGrow={1}>
                {/* Wrap the job title in a Link component */}
                <Typography variant="subtitle1" fontWeight="bold" component={Link} to={`/job/${job.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  {job.job_title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {job.department} - Posted on {new Date(job.date_listed).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color={job.listing_status === 'Open' ? 'green' : 'red'}>
                  Status: {job.listing_status}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  color={job.listing_status === 'Open' ? 'secondary' : 'success'}
                  size="small"
                  onClick={() => handleStatusToggle(job.id)}
                  style={{ marginRight: '10px' }}
                >
                  {job.listing_status === 'Open' ? 'Close Listing' : 'Reopen Listing'}
                </Button>
                <IconButton color="primary" onClick={() => console.log('Edit job', job.id)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(filteredJobs.length / jobsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
}

export default ManagerDashboard;

