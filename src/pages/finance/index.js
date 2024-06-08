import { useState } from 'react';
import TransactionForm from '../../components/finance/TransactionForm';
import TransactionList from '../../components/finance/TransactionList';
import { Container, Box, Typography } from '@mui/material';

export default function Finance() {
  const [transactions, setTransactions] = useState([]);

  const handleTransactionAdded = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Your Finances
        </Typography>
        <TransactionForm onTransactionAdded={handleTransactionAdded} />
        <TransactionList transactions={transactions} />
      </Box>
    </Container>
  );
}
