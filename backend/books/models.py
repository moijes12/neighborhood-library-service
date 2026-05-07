from django.db import models


class Book(models.Model):
    """
    The model class for each Book.
    """

    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    description = models.TextField(blank=True, help_text="A brief summary of the book")
    image = models.ImageField(upload_to="book_covers/", null=True, blank=True)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Book"
        verbose_name_plural = "Books"

    def __str__(self):
        return f"{self.title} by {self.author}"

    # def mark_as_available(self):
    #     self.is_available = True
    #     self.save()

    # def mark_as_unavailable(self):
    #     self.is_available = False
    #     self.save()
