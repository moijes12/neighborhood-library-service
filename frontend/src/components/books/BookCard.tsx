import { Card, CardHeader, CardMedia } from '@mui/material';
import { type Book } from '../../types/book';
export default function BookCard({ book }: { book: Book }) {
  return (
    <Card
      elevation={2}
      sx={{
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': { transform: 'scale(1.02)' },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={book.image}
        alt={book.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardHeader title={book.title} subheader={book.author} />
    </Card>
  );
}
