import { useParams, useNavigate } from 'react-router';
import { api } from '../../services/api';
import { type Book } from '../../types/book';
import {
  Container, Typography, Box, Card, CardContent, CardMedia,
  Chip, Button
} from '@mui/material';
import { useEffect, useState, Suspense } from 'react';


export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const navigate = useNavigate();
  let user_access_token:string|null = null;

  const is_user_authenticated = localStorage.access_token !== undefined;
  if (is_user_authenticated) {
    user_access_token = localStorage.access_token;
  }

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


  function handleAction() {
    const action = book?.is_borrowed_by_me ? 'return_book' : 'borrow';

    api.post(`/books/${id}/${action}/`, {}, {headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` }})
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.data;
      }).then(data => {
        console.log(data);
      }).catch(err => {
        console.log(err);
      }).finally(() =>{
        navigate(`/books/${id}/`);
      });
  }

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
            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color={book?.is_borrowed_by_me ? "secondary": "primary"} onClick={handleAction} >
                {book?.is_borrowed_by_me ? "Return" : "Borrow"}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Suspense>
  );
}