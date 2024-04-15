import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, CircularProgress, Alert, Table, TableBody, TableCell, TableHead, TableRow, Container, Typography } from '@mui/material';
import { setJobs } from './jobSlice';  // Adjust path as needed

function AdminPage() {
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [salary, setSalary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/jobs');
        const data = await response.json();
        if (response.ok) {
          dispatch(setJobs(data));  // Assuming data is the array of jobs
        } else {
          throw new Error(data.message || 'Failed to fetch jobs');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [dispatch]);

  const handleAddJob = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3000/create/job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyName,
          jobTitle,
          description,
          salary
        })
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(setJobs([...jobs, data]));  // Update Redux state
      } else {
        throw new Error(data.message || 'Failed to add job');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Admin Dashboard - Job Management</Typography>
      <div style={{ margin: '20px 0' }}>
        <TextField label="Company Name" value={companyName} onChange={e => setCompanyName(e.target.value)} margin="normal" />
        <TextField label="Job Title" value={jobTitle} onChange={e => setJobTitle(e.target.value)} margin="normal" />
        <TextField label="Description" value={description} onChange={e => setDescription(e.target.value)} margin="normal" />
        <TextField label="Salary" type="number" value={salary} onChange={e => setSalary(e.target.value)} margin="normal" />
        <Button variant="contained" color="primary" onClick={handleAddJob} disabled={loading} style={{ margin: '20px 0' }}>
          {loading ? <CircularProgress size={24} /> : 'Add Job'}
        </Button>
      </div>
      {error && <Alert severity="error">{error}</Alert>}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company Name</TableCell>
            <TableCell>Job Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Salary</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job, index) => (
            <TableRow key={index}>
              <TableCell>{job.companyName}</TableCell>
              <TableCell>{job.jobTitle}</TableCell>
              <TableCell>{job.description}</TableCell>
              <TableCell>{job.salary}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
}

export default AdminPage;


