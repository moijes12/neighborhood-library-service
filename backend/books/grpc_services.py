from .grpc_serializers import BookProtoSerializer
from django_socio_grpc import GenericService
from .models import Book

class BookService(GenericService):
    """
    gRPC service for Book Operations.
    """
    queryset = Book.objects.all()
    serializer_class = BookProtoSerializer
    pass
