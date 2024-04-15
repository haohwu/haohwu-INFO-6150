import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, TableBody, TableCell, TableHead, TableRow, Container, Typography } from '@mui/material';
import { setJobs } from '../assignment10/jobSlice';

function EmployeePage() {
  const jobs = useSelector(state => state.job.jobs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setJobs([{ companyName: "Tech Inc.", jobTitle: "Developer", description: "Develop stuff", salary: "100000" }]));
  }, [dispatch]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Job Listings</Typography>
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

export default EmployeePage;
