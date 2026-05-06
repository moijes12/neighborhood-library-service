from django.db import models
from books.models import Book
from django.contrib.auth.models import User

class Borrowing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='borrowings')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='borrowings')
    borrowed_date = models.DateTimeField(auto_now_add=True)
    returned_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} borrowed {self.book.title}"