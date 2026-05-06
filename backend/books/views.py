from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response

from .serializers import BookSerializer
from .models import Book
from borrowings.models import Borrowing
from borrowings.serializers import BookSerializer as BorrowingBookSerializer
from django.utils import timezone

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by("-created_at")
    serializer_class = BorrowingBookSerializer
    authentication_classes = [JWTAuthentication] 
    permission_classes = [IsAuthenticatedOrReadOnly] 

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def borrow(self, request, pk=None):
        book = self.get_object()

        if not book.is_available:
            return Response({"error": "Book unavailable"} , status=status.HTTP_400_BAD_REQUEST)
    
        Borrowing.objects.create(book=book, user=request.user)
        book.is_available = False
        book.save()
        return Response({"error": "Book borrowed"} , status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def return_book(self, request, pk=None):
        book = self.get_object()

        # Check if the book has been borrowed
        borrowing = Borrowing.objects.filter(book=book, user=request.user, return_date__isnull=True).first()
        if not borrowing:
            return Response({"error": "No borrowing record found"}, status=status.HTTP_400_BAD_REQUEST)
        borrowing.return_date = timezone.now()
        book.is_available = True
        book.save()
        return Response({"error": "Book returned"}, status=status.HTTP_200_OK)
        


        

