import { useState, useEffect, Suspense } from "react";
import { api } from "../../services/api";
import { getAuthHeader } from "../../utils/authServices";
import type { UserProfile } from "../../types/userProfile";
import {
  Container, Typography, Card, Grid, CardContent, CardActions,
  Chip, Button, CircularProgress
} from '@mui/material';

export default function Dashboard() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch the borrowing for the current user
    useEffect(() => {
        api.get('/member/profile/', {
              headers: getAuthHeader(),
            }).then(res => {
                setProfile(res.data);
            })
            .catch(err => {
                console.log("Error while fetching profile: " + err);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);
    
    if (loading) {
        return (
            <CircularProgress />
        );
    }

    function handleReturn(bookId: number) {
        setLoading(true);
        api.post(`/books/${bookId}/return_book/`, {}, {headers: getAuthHeader()})
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.data;
      }).then(data => {
        setProfile(prev => prev ? {
        ...prev,
        active_borrowings: prev.active_borrowings.filter(b => b.book !== bookId)
      } : null);
        console.log(data);
      }).catch(err => {
        console.log(err);
      }).finally(() =>{
        setLoading(false);
      });
    }

    return (
            <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {profile?.username}
      </Typography>
      <Typography variant="h6" color="textSecondary" gutterBottom>
            Your Current Checkouts
        </Typography>
      { profile?.active_borrowings.length !== 0 ? 
      (
        <Grid container spacing={3} sx={{ mt: 1 }}>
            {profile?.active_borrowings.map((checkout) => (
            <Grid key={checkout.id}>
                <Card sx={{ borderTop: checkout.is_overdue ? '4px solid red' : 'none' }}>
                <CardContent>
                    <Typography variant="h6">{checkout.book_title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                    Borrowed: {new Date(checkout.borrowed_date).toLocaleDateString()}
                    </Typography>
                    {checkout.is_overdue && (
                    <Chip label="OVERDUE" color="error" size="small" sx={{ mt: 1 }} />
                    )}
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => handleReturn(checkout.book)}>
                    Return Book
                    </Button>
                </CardActions>
                </Card>
            </Grid>
            ))}
        </Grid>) : (
        <Typography variant="h6" color="textSecondary" gutterBottom>
        You have no active checkouts.
      </Typography>
      )}
    </Container>

    );
}