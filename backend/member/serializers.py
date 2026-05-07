from rest_framework import serializers
from django.contrib.auth.models import User
from borrowings.models import Borrowing
from borrowings.serializers import BorrowingSerializer

class ProfileSerializer(serializers.ModelSerializer):
    active_borrowings = serializers.SerializerMethodField()
    total_fines = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'active_borrowings', 'total_fines']

    def get_active_borrowings(self, obj):
        # Import Borrowing here to avoid circular imports if necessary
        borrowings = Borrowing.objects.filter(user=obj, returned_date__isnull=True)
        return BorrowingSerializer(borrowings, many=True).data

    def get_total_fines(self, obj):
        borrowings = Borrowing.objects.filter(user=obj, returned_date__isnull=True)
        return sum(b.current_fine for b in borrowings)
