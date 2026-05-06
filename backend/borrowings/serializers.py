from rest_framework import serializers
from .models import Borrowing
from django.contrib.auth.models import User

class BorrowingSerializer(serializers.ModelSerializer):
    # Including book_title or username can be helpful for listing history
    book_title = serializers.ReadOnlyField(source='book.title')
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Borrowing
        fields = [
            'id', 
            'book', 
            'book_title', 
            'user', 
            'username', 
            'borrow_date', 
            'return_date'
        ]
        read_only_fields = ['borrow_date', 'user']

class MemberSerializer(serializers.ModelSerializer):
    """
    If you are building a profile page, this helps show 
    all books currently borrowed by a specific user.
    """
    active_borrowings = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'active_borrowings']

    def get_active_borrowings(self, obj):
        # Returns only the books the user hasn't returned yet
        borrowings = Borrowing.objects.filter(user=obj, return_date__isnull=True)
        return BorrowingSerializer(borrowings, many=True).data
