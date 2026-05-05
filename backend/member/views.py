from rest_framework import viewsets, permissions, response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from .serializers import UserSerializer

class MemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    # For the endpoint /api/member/profile/
    @action(detail=False, methods=['get'])
    def profile(self, request):
        serializer = self.get_serializer(request.user)
        return response.Response(serializer.data)