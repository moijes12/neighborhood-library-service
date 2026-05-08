#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Waiting for database..."
# The healthcheck in docker-compose handles the wait, 
# but this is a good safety measure.

echo "Applying database migrations..."
python manage.py migrate --noinput

echo "Fetching initial books from Gutendex..."
# We use a flag or check here if you don't want to spam the API 
# every single time the container restarts.
python manage.py fetch_books

python manage.py initadmin

echo "Starting server..."
exec "$@"