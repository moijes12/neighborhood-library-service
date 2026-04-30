from django_socio_grpc.generics import ModelService
from .models import Book
from .grpc_serializers import BookProtoSerializer

class BookService(ModelService):
    """
    gRPC Service for Book operations (CRUD)
    """
    queryset = Book.objects.all().order_by('-created_at')
    serializer_class = BookProtoSerializer