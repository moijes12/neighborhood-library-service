from rest_framework import serializers
from books.models import Book
from .models import Borrowing

class BookSerializer(serializers.ModelSerializer):
    is_borrowed_by_me = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = ["id", "author", "title", "description", "image", "is_available", "is_borrowed_by_me"]
    
    def get_is_borrowed_by_me(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Borrowing.objects.filter(book=obj, user=request.user, return_date__isnull=True).first()
        return False