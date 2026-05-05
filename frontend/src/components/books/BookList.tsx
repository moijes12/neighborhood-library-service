import { useState, useEffect } from 'react';
import { Link } from "react-router";
import { type Book } from '../../types/book';
import { api } from '../../services/api';
import {
  Card, CardContent, CardMedia, Typography, Grid, Button,
  Container, Box
} from '@mui/material';
// import SearchIcon from '@mui/icons-material/Search';

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
//   const [searchTerm, setSearchTerm] = useState('');

  const fetchBooks = async () => {
    try {
      const response = await api.get('/books/');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);


//   const filteredBooks = books.filter(book =>
//     book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     book.author.toLowerCase().includes(searchTerm.toLowerCase())
//   );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Library Books
        </Typography>
        {/* <TextField
          placeholder="Search books..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        /> */}
      </Box>

      <Grid container spacing={3}>
        {books.map((book) => (
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={book.image || '/placeholder-book.jpg'}
                alt={book.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {book.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  by {book.author}
                </Typography>
                <Typography variant="body2" color={book.is_available ? 'success.main' : 'error.main'}>
                  {book.is_available ? 'Available' : 'Borrowed'}
                </Typography>

                <Button
                  component={Link}
                  to={`/books/${book.id}`}
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
        ))}
      </Grid>
    </Container>
  );
}