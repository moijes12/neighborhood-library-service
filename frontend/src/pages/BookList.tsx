import { useState, useEffect } from 'react';
import { Link } from "react-router";
import { type Book } from '../types/book';
import { api } from '../services/api';
import { Container, Typography, Grid, CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import BookCard from '../components/books/BookCard';


export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    api.get('/books/')
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok : ' + response.statusText);
        }
        return response.data;
      })
      .then(data => {
        setBooks(data);
        // setLoading(false);
      })
      .catch(error => {
        // setError('Failed to fetch books');
        // setLoading(false);
        console.log('Error fetching books:', error);
      });
  }, []);



  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1">
        Library Books
      </Typography>
      <Suspense fallback={<CircularProgress />}>
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {books.map((book) => (
            <Link to={`/books/${book.id}`} key={book.id} style={{ textDecoration: 'none' }}>
              <BookCard book={book} />
            </Link>
          ))}
        </Grid>
      </Suspense>
    </Container>
  );
}