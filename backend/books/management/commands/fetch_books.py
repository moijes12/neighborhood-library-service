import requests
from django.core.management.base import BaseCommand
from django.core.files.base import ContentFile
from ...models import Book

class Command(BaseCommand):
    help = 'Fetches books from Gutendex and populates the database'

    def handle(self, *args, **options):
        # Gutendex URL - you can add filters like ?languages=en
        url = "https://gutendex.com/books/"
        self.stdout.write(f"Fetching data from {url}...")
        
        response = requests.get(url)
        if response.status_code != 200:
            self.stderr.write("Failed to fetch data from Gutendex")
            return

        data = response.json()
        books_data = data.get('results', [])

        for item in books_data:
            title = item.get('title')
            # Extract the first author if available
            authors = item.get('authors', [])
            author_name = authors[0].get('name') if authors else "Unknown Author"
            
            # Gutendex provides covers in the 'formats' dictionary
            image_url = item.get('formats', {}).get('image/jpeg')
            
            # Check if book already exists to avoid duplicates
            if not Book.objects.filter(title=title, author=author_name).exists():
                book = Book(
                    title=title,
                    author=author_name,
                    description=f"A Project Gutenberg ebook. ID: {item.get('id')}",
                    is_available=True
                )

                # Fetch and save the image cover if it exists
                if image_url:
                    img_resp = requests.get(image_url)
                    if img_resp.status_code == 200:
                        file_name = f"cover_{item.get('id')}.jpg"
                        book.image.save(file_name, ContentFile(img_resp.content), save=False)

                book.save()
                self.stdout.write(self.style.SUCCESS(f"Successfully added: {title}"))
            else:
                self.stdout.write(f"Skipped (Already exists): {title}")

        self.stdout.write(self.style.SUCCESS("Database population complete!"))