import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Button, MenuItem, Select } from '@mui/material';
import axios from 'axios';

function JobDetailView() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [candidatesMap, setCandidatesMap] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editingStatusId, setEditingStatusId] = useState(null);

  useEffect(() => {
    fetchJobDetail();
    fetchApplications();
  }, [jobId]);

  const fetchJobDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/jobs/${jobId}`);
      setJob(response.data);
    } catch (error) {
      console.error('Error fetching job details', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/jobapps/jobspec/${jobId}`);
      setApplications(response.data);
      fetchCandidates(response.data);
    } catch (error) {
      console.error('Error fetching applications', error);
    }
  };

  const fetchCandidates = async (applications) => {
    try {
      const candidateIds = applications.map(app => app.candidate_id);
      const candidateRequests = candidateIds.map(id => axios.get(`http://localhost:8080/candidates/${id}`));
      const candidateResponses = await Promise.all(candidateRequests);

      const candidatesData = candidateResponses.reduce((map, response) => {
        map[response.data.id] = response.data;
        return map;
      }, {});
      
      setCandidatesMap(candidatesData);
    } catch (error) {
      console.error('Error fetching candidate details', error);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      const applicationToUpdate = applications.find(app => app.id === applicationId);
      applicationToUpdate.application_status = newStatus;
      
      await axios.put(`http://localhost:8080/jobapps/${applicationId}`, applicationToUpdate);
      setApplications(applications.map(app => app.id === applicationId ? { ...app, application_status: newStatus } : app));
      setEditingStatusId(null); // Hide the dropdown after updating the status
    } catch (error) {
      console.error('Error updating application status', error);
    }
  };

  const handleDownload = (filePath) => {
    if (!filePath) {
      console.error('File path is undefined or null');
      return;
    }

    const fileName = filePath.split('/').pop();
    console.log('Downloading file:', fileName);
    const url = `http://localhost:8080/uploads/${fileName}`;

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredApplications = applications.filter(application => {
    const candidate = candidatesMap[application.candidate_id];
    const fullName = candidate?.fullName || `Candidate ${application.candidate_id}`;
    const email = candidate?.email || `candidate${application.candidate_id}@example.com`;
    const applicationStatus = application.application_status || '';

    const matchesSearchQuery = fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicationStatus.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatusFilter = statusFilter === 'All' || applicationStatus === statusFilter;

    return matchesSearchQuery && matchesStatusFilter;
  });

  return (
    <Container component="main" maxWidth="lg" sx={{ mt: 1 }}>
      {job && (
        <Box marginBottom={3}>
          <Typography variant="h4" component="h1">
            {job.job_title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
            Department: {job.department}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" sx={{ mt: 1 }}>
            Posted on: {new Date(job.date_listed).toLocaleDateString()}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {job.job_description}
          </Typography>
        </Box>
      )}

      <Box display="flex" alignItems="center" marginBottom={3}>
        <TextField
          label="Search Applicants"
          variant="outlined"
          size="small"
          style={{ width: '40%', marginRight: 16 }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          variant="outlined"
          size="small"
          style={{ width: '20%' }}
        >
          <MenuItem value="All">All Statuses</MenuItem>
          <MenuItem value="Under Review">Under Review</MenuItem>
          <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
          <MenuItem value="Hired">Hired</MenuItem>
        </Select>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Applicant Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date Applied</TableCell>
              <TableCell>Resume</TableCell>
              <TableCell>Cover Letter</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredApplications.map((application) => {
              const candidate = candidatesMap[application.candidate_id];
              const fullName = candidate?.fullName || `Candidate ${application.candidate_id}`;
              const email = candidate?.email || `candidate${application.candidate_id}@example.com`;
              const isEditingStatus = editingStatusId === application.id;

              return (
                <TableRow key={application.id}>
                  <TableCell>{fullName}</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{new Date(application.date_applied).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDownload(application.custom_resume)}
                      variant="outlined"
                      size="small"
                      disabled={!application.custom_resume} // Disable if no resume
                    >
                      Download Resume
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDownload(application.cover_letter)}
                      variant="outlined"
                      size="small"
                      disabled={!application.cover_letter} // Disable if no cover letter
                    >
                      Download Cover Letter
                    </Button>
                  </TableCell>
                  <TableCell>
                    {isEditingStatus ? (
                      <Select
                        value={application.application_status}
                        onChange={(e) => handleStatusChange(application.id, e.target.value)}
                      >
                        <MenuItem value="Under Review">Under Review</MenuItem>
                        <MenuItem value="Interview Scheduled">Interview Scheduled</MenuItem>
                        <MenuItem value="Rejected">Rejected</MenuItem>
                        <MenuItem value="Hired">Hired</MenuItem>
                      </Select>
                    ) : (
                      application.application_status
                    )}
                  </TableCell>
                  <TableCell>
                    {!isEditingStatus ? (
                      <Button variant="outlined" size="small" onClick={() => setEditingStatusId(application.id)}>
                        Update Status
                      </Button>
                    ) : (
                      <Button variant="contained" size="small" onClick={() => handleStatusChange(application.id, application.application_status)}>
                        Save
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default JobDetailView;
