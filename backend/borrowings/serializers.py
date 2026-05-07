from rest_framework import serializers
from .models import Borrowing

class BorrowingSerializer(serializers.ModelSerializer):
    # These ReadOnlyFields pull data from the related Book and User models
    book_title = serializers.ReadOnlyField(source='book.title')
    username = serializers.ReadOnlyField(source='user.username')
    
    # These pull directly from the @property methods we added to the Borrowing model
    is_overdue = serializers.ReadOnlyField()
    days_overdue = serializers.ReadOnlyField()

    fine = serializers.ReadOnlyField(source='current_fine')

    class Meta:
        model = Borrowing
        fields = [
            'id', 
            'book',        # The Book ID (useful for API actions)
            'book_title',  # The Book Title (useful for UI display)
            'user', 
            'username', 
            'borrowed_date', 
            'returned_date',
            'is_overdue',
            'days_overdue',
            'fine'
        ]
        # 'user' and 'borrow_date' are read_only because they are set automatically
        # 'is_overdue' and 'days_overdue' are properties, so they are read-only by nature
        read_only_fields = ['borrowed_date', 'user']
