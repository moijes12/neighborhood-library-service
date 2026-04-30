from django.contrib import admin
from .models import Book

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ["title", "author", "isbn", "is_available", "created_at"]
    list_filter = ["is_available"]
    search_fields = ["title", "author", "isbn"]
    readonly_fields = ["created_at", "updated_at"]
