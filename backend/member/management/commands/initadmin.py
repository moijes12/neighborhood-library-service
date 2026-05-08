from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
import os

class Command(BaseCommand):
    def handle(self, *args, **options):
        User = get_user_model()
        username = os.getenv("DJANGO_SUPERUSER_USERNAME", "admin")
        email = os.getenv("DJANGO_SUPERUSER_EMAIL", "admin@example.com")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD", "password")

        if not User.objects.filter(username=username).exists():
            print(f"Creating superuser for {username}")
            User.objects.create_superuser(username=username, email=email, password=password)
        else:
            print("Superuser already exists, skipping.")