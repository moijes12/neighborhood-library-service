// src/app/books/[id]/page.tsx
import { Container, Typography, Box, Chip, Divider } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { Book } from '@/types/books';


async function getBook(id: string): Promise<Book> {
  const res = await fetch(`http://localhost:8000/api/books/${id}/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Book not found');
  return res.json();
}

export default async function BookDetailPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  return (
    <Container sx={{ py: 8 }}>
      <Link href="/books" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <ArrowBackIcon sx={{ mr: 1 }} /> Back to Catalog
      </Link>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6 }}>
        <Box sx={{ flex: 1, maxWidth: 400 }}>
          <img 
            src={book.image || '/placeholder-book.png'} 
            alt={book.title} 
            style={{ width: '100%', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
          />
        </Box>
        
        <Box sx={{ flex: 2 }}>
          <Typography variant="h2" component="h1" gutterBottom>{book.title}</Typography>
          <Typography variant="h5" color="text.secondary" gutterBottom>by {book.author}</Typography>
          
          <Chip 
            label={book.is_available ? "Available" : "On Loan"} 
            color={book.is_available ? "success" : "error"} 
            sx={{ my: 2, fontWeight: 'bold' }} 
          />
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>Summary</Typography>
          <Typography variant="body1" color="text.primary" sx={{ lineHeight: 1.8 }}>
            {book.description}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}