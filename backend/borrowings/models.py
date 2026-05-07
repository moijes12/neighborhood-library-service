from datetime import timedelta

from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

from books.models import Book


class Borrowing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="borrowings")
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="borrowings")
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

    @property
    def current_fine(self):
        """Calculate $1 fine per day for overdue books."""
        fine = 0
        if self.returned_date:
            # Lets keep fines only for borowed books and not for returned ones
            return fine
        return max(0, self.days_overdue)  # $1 per day overdue
