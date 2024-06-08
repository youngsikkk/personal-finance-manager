import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography } from '@mui/material';

export default function BudgetForm({ onBudgetAdded }) {
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/budgets', {
        category,
        amount,
        date,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onBudgetAdded(res.data.data);
      setCategory('');
      setAmount('');
      setDate('');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            label="Date"
            variant="outlined"
            fullWidth
            margin="normal"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Budget
          </Button>
        </form>
      </Box>
    </Container>
  );
}
