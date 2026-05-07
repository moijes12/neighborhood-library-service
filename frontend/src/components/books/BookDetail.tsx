import { useParams, useNavigate } from 'react-router';
import { api } from '../../services/api';
import { type Book } from '../../types/book';
import {
  Container, Typography, Box, Card, CardContent, CardMedia,
  Chip, Button
} from '@mui/material';
import { useEffect, useState, Suspense } from 'react';
import { getAuthHeader } from '../../utils/authServices';

// function getAuthHeader() {
//   const token = localStorage.getItem('access_token');
  
//   // Only return the header if the token is a valid string
//   if (token && token !== "undefined") {
//     return { Authorization: `Bearer ${token}` };
//   }
//   return {}; // Return empty object for guests
// }

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setIsLoading] = useState(true);
  const isAuthenticated = !!localStorage.getItem('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/books/${id}/`, {
      headers: getAuthHeader(),
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error('Network response was not ok : ' + response.statusText);
        }
        return response.data;
      })
      .then(data => {
        setBook(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log('Error fetching book:', error);
        setIsLoading(false);
      }); 
  }, [id]);


  function handleAction() {
    // If not logged in, redirect to sign-in page
    if (!isAuthenticated) {
      // Pass the current path in state to redirect back after login
      navigate('/', { state: { from: `/books/${id}` } });
      return;
    }
    const action = book?.is_borrowed_by_me ? 'return_book' : 'borrow';
    setIsLoading(true);

    api.post(`/books/${id}/${action}/`, {}, {headers: getAuthHeader()})
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.data;
      }).then(data => {
        setBook(data);
        console.log(data);
      }).catch(err => {
        console.log(err);
      }).finally(() =>{
        setIsLoading(false);
      });
  }

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
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
          {/* <CardContent>
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
          </CardContent> */}
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

            <Box sx={{ mt: 3 }}>
                        {book?.is_borrowed_by_me ? (
        <Button variant="contained" color="secondary" onClick={handleAction}>
          Return Book
        </Button>
      ) : (
        <Box>
          {book?.is_available ? (
            <Button variant="contained" color="primary" onClick={handleAction}>
              Borrow Book
            </Button>
          ) : (
            <Chip label="Unavailable" color="error" />
          )}
        </Box>
      )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Suspense>
  );
}