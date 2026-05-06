from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Borrowing
from .serializers import BorrowingSerializer

class BorrowingHistoryViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Optional: Viewset to see personal borrowing history
    """
    serializer_class = BorrowingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Borrowing.objects.filter(user=self.request.user).order_by('-borrow_date')
