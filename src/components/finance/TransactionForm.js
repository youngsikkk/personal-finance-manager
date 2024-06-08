import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, MenuItem, Box } from '@mui/material';

export default function TransactionForm({ onTransactionAdded }) {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/transactions', {
        type,
        amount,
        category,
        date,
        description,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onTransactionAdded(res.data.data);
      setType('income');
      setAmount('');
      setCategory('');
      setDate('');
      setDescription('');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <form onSubmit={handleSubmit}>
          <TextField
            select
            label="Type"
            variant="outlined"
            fullWidth
            margin="normal"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>
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
            label="Category"
            variant="outlined"
            fullWidth
            margin="normal"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
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
          <TextField
            label="Description"
            variant="outlined"
            fullWidth
            margin="normal"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Transaction
          </Button>
        </form>
      </Box>
    </Container>
  );
}
