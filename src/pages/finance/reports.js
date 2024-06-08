import { useState } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Button } from '@mui/material';

export default function Reports() {
  const [period, setPeriod] = useState('');

  const handleDownload = async (period) => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`/api/reports?period=${period}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${period}-report.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Financial Reports
        </Typography>
        <Button variant="contained" color="primary" onClick={() => handleDownload('monthly')}>
          Download Monthly Report
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleDownload('quarterly')} style={{ marginLeft: '10px' }}>
          Download Quarterly Report
        </Button>
        <Button variant="contained" color="primary" onClick={() => handleDownload('yearly')} style={{ marginLeft: '10px' }}>
          Download Yearly Report
        </Button>
      </Box>
    </Container>
  );
}
