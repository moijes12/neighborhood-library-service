from rest_framework import serializers
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
    # This keeps your dashboard data bundled with the user profile
    active_borrowings = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'active_borrowings']

    def get_active_borrowings(self, obj):
        # Import Borrowing here to avoid circular imports if necessary
        from borrowings.models import Borrowing
        from borrowings.serializers import BorrowingSerializer
        
        borrowings = Borrowing.objects.filter(user=obj, returned_date__isnull=True)
        return BorrowingSerializer(borrowings, many=True).data
