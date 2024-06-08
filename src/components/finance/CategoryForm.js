import { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Container, Box, Typography } from '@mui/material';

export default function CategoryForm({ onCategoryAdded }) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/categories', { name }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onCategoryAdded(res.data.data);
      setName('');
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Category Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {error && (
            <Typography color="error" variant="body2" gutterBottom>
              {error}
            </Typography>
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Category
          </Button>
        </form>
      </Box>
    </Container>
  );
}
