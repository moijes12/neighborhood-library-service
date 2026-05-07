from rest_framework import serializers

from borrowings.models import Borrowing

from .models import Book


class BookSerializer(serializers.ModelSerializer):
    is_borrowed_by_me = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = [
            "id",
            "title",
            "author",
            "description",
            "image",
            "is_available",
            "created_at",
            "is_borrowed_by_me",
        ]

    def get_is_borrowed_by_me(self, obj):
        request = self.context.get("request")
        print(f"--- Debugging is_borrowed_by_me for Book: {obj.title} ---")
        print(f"Request in context: {request is not None}")

        if request:
            print(f"User from request: {request.user}")
            print(f"Is Authenticated: {request.user.is_authenticated}")
        else:
            print("WARNING: Request object missing from Serializer context!")

        if request and request.user.is_authenticated:
            result = Borrowing.objects.filter(
                book=obj, user=request.user, returned_date__isnull=True
            ).exists()
            print(
                f"Borrowing record for user {request.user} and book '{obj.title}': {result}"
            )
            return result
        return False
