import { useParams } from 'react-router';
import { api } from '../../services/api';
import { type Book } from '../../types/book';
import {
  Container, Typography, Box, Card, CardContent, CardMedia
} from '@mui/material';
import { useEffect, useState, useCallback } from 'react';


export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  const fetchBook = useCallback(async () => {
    try {
      const response = await api.get(`/books/${id}/`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchBook();
  }, [fetchBook]);

  if (!book) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <CardMedia
          component="img"
          sx={{ width: { md: 300 }, height: 400, objectFit: 'cover' }}
          image={book.image || '/placeholder-book.jpg'}
          alt={book.title}
        />
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            by {book.author}
          </Typography>
          <Typography variant="h3" component="p">
            {book.description}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1">
              Status: {book.is_available ? 'Available' : 'Checked Out'}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}