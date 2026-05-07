from django.utils import timezone
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.response import Response

from books.models import Book
from books.serializers import BookSerializer
from borrowings.models import Borrowing


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=True, methods=["post"])
    def borrow(self, request, pk=None):
        book = self.get_object()
        if not book.is_available:
            return Response(
                {"error": "Book not available"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Create record and update availability
        Borrowing.objects.create(book=book, user=request.user)
        book.is_available = False
        book.save()

        # Return updated book data to frontend
        serializer = self.get_serializer(book)
        return Response(serializer.data)

    @action(detail=True, methods=["post"])
    def return_book(self, request, pk=None):
        book = self.get_object()
        borrowing = Borrowing.objects.filter(
            book=book, user=request.user, returned_date__isnull=True
        ).first()

        if not borrowing:
            return Response(
                {"error": "No active borrowing record"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        borrowing.returned_date = timezone.now()
        borrowing.save()
        book.is_available = True
        book.save()

        # Return updated book data to frontend
        serializer = self.get_serializer(book)
        return Response(serializer.data)
