import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Typography, Box } from '@mui/material';

export default function TransactionList() {
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

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1">
          Transactions
        </Typography>
        <List>
          {transactions.map((transaction) => (
            <ListItem key={transaction._id}>
              <ListItemText
                primary={`${transaction.type === 'income' ? 'Income' : 'Expense'}: ${transaction.amount} - ${transaction.category}`}
                secondary={`${transaction.date} - ${transaction.description}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
