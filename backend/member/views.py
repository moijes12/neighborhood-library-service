from django.contrib.auth.models import User
from rest_framework import permissions, response, viewsets
from rest_framework.decorators import action

from .serializers import ProfileSerializer


class MemberViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=["get"])
    def profile(self, request):
        serializer = self.get_serializer(request.user)
        return response.Response(serializer.data)
