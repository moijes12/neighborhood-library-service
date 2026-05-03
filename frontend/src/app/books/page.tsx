// src/app/books/page.tsx
import { Book } from '@/types/books';
import { Container, Grid, Item, Box, Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Link from 'next/link';


async function getBooks(): Promise<Book[]> {
  const res = await fetch('http://localhost:8000/api/books/', { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
}

export default async function BookListPage() {
  const books = await getBooks();

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom>Library Books</Typography>
      <Grid container spacing={4}>
        {books.map((book) => (
            <Card key={book.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                sx={{ height: 260, objectFit: 'contain', p: 2, bgcolor: '#f5f5f5' }}
                image={book.image || '/placeholder-book.png'}
                alt={book.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2" noWrap>
                  {book.title}
                </Typography>
                <Typography color="text.secondary">
                  {book.author}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2 }}>
                <Link href={`/books/${book.id}`} passHref>
                  <Button size="small" variant="contained" fullWidth>
                    View Details
                  </Button>
                </Link>
              </Box>
            </Card>
        ))}
      </Grid>
    </Container>
  );
}