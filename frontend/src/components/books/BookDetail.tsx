import { useParams } from 'react-router';
import { api } from '../../services/api';
import { type Book } from '../../types/book';
import {
  Container, Typography, Box, Card, CardContent, CardMedia,
  Chip
} from '@mui/material';
import { useEffect, useState, Suspense } from 'react';


export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    api.get(`/books/${id}/`)
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok : ' + response.statusText);
        }
        return response.data;
      })
      .then(data => {
        setBook(data);
      })
      .catch(error => {
        console.log('Error fetching book:', error);
      }); 
  }, [id]);



  return (
    <Suspense fallback={<Typography variant="h6">Loading...</Typography>}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
          <CardMedia
            component="img"
            sx={{ width: { md: 300 }, height: 400, objectFit: 'cover' }}
            image={book?.image || '/placeholder-book.jpg'}
            alt={book?.title}
          />
          <CardContent>
            <Typography variant="h3" component="h1" gutterBottom>
              {book?.title}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              by {book?.author}
            </Typography>
            <Typography component="p">
              {book?.description}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                Status: {book?.is_available ? 
                <Chip label="Available" color="success" /> :
                <Chip label="Not Available" color="error" />  }
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Suspense>
  );
}