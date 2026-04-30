from django.shortcuts import render
from rest_framework import viewsets

from .serializers import BookSerializer
from .models import Book

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all().order_by("-created_at")
    serializer_class = BookSerializer
