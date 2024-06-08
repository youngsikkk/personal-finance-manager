import { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Container, Box, Typography } from '@mui/material';

export default function Statistics() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      try {
        const res = await axios.get('/api/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(res.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response.data.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <Container>
        <Box mt={5}>
          <Typography variant="h6" component="h2">
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Box mt={5}>
          <Typography variant="h6" component="h2" color="error">
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }

  const categories = transactions.reduce((acc, transaction) => {
    const { category, amount, type } = transaction;
    if (!acc[category]) {
      acc[category] = { income: 0, expense: 0 };
    }
    acc[category][type] += amount;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: 'Income',
        data: Object.keys(categories).map((category) => categories[category].income),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Expense',
        data: Object.keys(categories).map((category) => categories[category].expense),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Statistics
        </Typography>
        <Bar data={data} />
      </Box>
    </Container>
  );
}
