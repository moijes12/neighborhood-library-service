from django_socio_grpc import proto_serializers
from .models import Book

class BookProtoSerializer(proto_serializers.ModelProtoSerializer):
    class Meta:
        model = Book
        fields = "__all__"