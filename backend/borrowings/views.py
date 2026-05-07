from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Borrowing
from .serializers import BorrowingSerializer

class BorrowingViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Optional: Viewset to see personal borrowing history
    """
    serializer_class = BorrowingSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Borrowing.objects.filter(user=self.request.user).order_by('-borrowed_date')
        active_only = self.request.query_params.get('active', None)

        if active_only == "true":
            queryset = queryset.filter(returned_date__isnull=True)
        return queryset

    
