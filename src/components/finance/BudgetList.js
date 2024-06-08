import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, List, ListItem, ListItemText, Typography, Box } from '@mui/material';

export default function BudgetList() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBudgets = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }

      try {
        const res = await axios.get('/api/budgets', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBudgets(res.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response.data.message);
        setLoading(false);
      }
    };

    fetchBudgets();
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
          Budgets
        </Typography>
        <List>
          {budgets.map((budget) => (
            <ListItem key={budget._id}>
              <ListItemText
                primary={`${budget.category}: ${budget.amount}`}
                secondary={`${budget.date}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
