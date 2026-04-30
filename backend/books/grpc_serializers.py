from django_socio_grpc import proto_serializers
from .models import Book
from books.grpc.books_pb2 import BookResponse, BookListResponse

class BookProtoSerializer(proto_serializers.ModelProtoSerializer):
    class Meta:
        model = Book
        fields = ['id', 'title', 'author', 'isbn', 'is_available', 'created_at', 'updated_at']
        # proto_class = BookResponse
        # proto_class_list = BookListResponse