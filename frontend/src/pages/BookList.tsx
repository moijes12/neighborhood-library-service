import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router';
import { type Book } from '../types/book';
import { api } from '../services/api';
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from '@mui/material';
import BookCard from '../components/books/BookCard';

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/books/')
      .then((response) => {
        // if (response.status !== 200) {
        //   throw new Error('Network response was not ok : ' + response.statusText);
        // }
        // return response.data;
        setBooks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // setError('Failed to fetch books');
        // setLoading(false);
        console.log('Error fetching books:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '50vh',
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" color="primary" sx={{ mb: 4 }}>
        Library Books
      </Typography>

      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid
            key={book.id}
            sx={{ xs: 12, sm: 6, md: 3, textDecoration: 'none' }}
            component={RouterLink}
            to={`/books/${book.id}`}
          >
            {/* <RouterLink to={`/books/${book.id}`} style={{ textDecoration: 'none' }}> */}
            <BookCard book={book} />
            {/* </RouterLink> */}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
