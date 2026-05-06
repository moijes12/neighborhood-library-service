import {Card, CardHeader,CardMedia} from '@mui/material';
import { type Book } from '../../types/book';
export default function BookCard({book}: {book: Book}) {
    return (
        <Card sx={{ maxHeight: '250', maxWidth:'250'}}>
            <CardMedia
                component="img"
                height="140"
                image={book.image}
                alt={book.title}
                sx={{ objectFit: 'cover' }}
            />
            <CardHeader title={book.title} subheader={book.author}  />
        </Card>
    )
}