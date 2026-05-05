import {Card, CardContent, CardMedia, Typography} from '@mui/material';
import { type Book } from '../../types/book';
export default function BookCard({book}: {book: Book}) {
    return (
        <Card sx={{ maxHeight: '250', maxWidth:'250', display: 'flex', flexDirection: 'column'}}>
            <CardMedia
                component="img"
                height="140"
                image={book.image}
                alt={book.title}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {book.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {book.author}
                </Typography>
            </CardContent>
        </Card>
    )
}