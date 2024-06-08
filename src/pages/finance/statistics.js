import Statistics from '../../components/finance/Statistics';
import { Container, Box, Typography } from '@mui/material';

export default function StatisticsPage() {
  return (
    <Container>
      <Box mt={5}>
        <Typography variant="h4" component="h1" gutterBottom>
          Financial Statistics
        </Typography>
        <Statistics />
      </Box>
    </Container>
  );
}
