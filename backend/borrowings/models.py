from django.db import models
from books.models import Book
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta

class Borrowing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='borrowings')
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='borrowings')
    borrowed_date = models.DateTimeField(auto_now_add=True)
    returned_date = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} borrowed {self.book.title}"
    
    @property
    def is_overdue(self):
        due_date = self.borrowed_date + timedelta(days=14)
        return self.returned_date is None and timezone.now() > due_date

    @property
    def days_overdue(self):
        overdue_days = 0
        if self.is_overdue:
            due_date = self.borrowed_date + timedelta(days=14)
            overdue_days = timezone.now() - due_date
        return overdue_days