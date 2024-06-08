import Head from 'next/head';
import AppBar from '../components/layout/AppBar';
import styles from '../styles/Home.module.css';
import { Container, Box, Typography, Button, Grid, Paper } from '@mui/material';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Personal Finance Manager</title>
        <meta name="description" content="Manage your personal finances" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar />

      <main className={styles.main}>
        <Container maxWidth="lg">
          <Box mt={5} textAlign="center">
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Personal Finance Manager
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Take control of your finances with ease
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push('/auth/register')}
            >
              Get Started
            </Button>
          </Box>

          <Box mt={5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper className={styles.paper} elevation={3}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Track Expenses
                  </Typography>
                  <Typography component="p">
                    Easily track your expenses and manage your budget to save more money.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={styles.paper} elevation={3}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Set Budgets
                  </Typography>
                  <Typography component="p">
                    Set budgets for different categories and get notified when you exceed them.
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper className={styles.paper} elevation={3}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Generate Reports
                  </Typography>
                  <Typography component="p">
                    Generate monthly, quarterly, and annual reports to understand your financial health.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>

          <Box mt={5} textAlign="center">
            <Typography variant="h4" component="h2" gutterBottom>
              Ready to get started?
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => router.push('/auth/register')}
            >
              Sign Up Now
            </Button>
          </Box>

          <Box mt={5} textAlign="center">
            <Typography variant="h6" component="h3" gutterBottom>
              Have feedback? <a href="mailto:hys7309.dev@gmail.com">Email us</a>
            </Typography>
          </Box>
        </Container>
      </main>
    </div>
  );
}
