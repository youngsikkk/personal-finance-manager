import { useState } from 'react';
import BudgetForm from '../../components/finance/BudgetForm';
import BudgetList from '../../components/finance/BudgetList';
import { Container, Box, Typography } from '@mui/material';

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);

  const handleBudgetAdded = (budget) => {
    setBudgets([budget, ...budgets]);
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Your Budgets
        </Typography>
        <BudgetForm onBudgetAdded={handleBudgetAdded} />
        <BudgetList budgets={budgets} />
      </Box>
    </Container>
  );
}
