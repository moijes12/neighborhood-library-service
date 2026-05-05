# syntax=docker/dockerfile:experimental
FROM python:3.14-trixie

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the Workdir and copy the requirements.txt
WORKDIR /app
COPY requirements.txt .

RUN apt-get update && rm -rf /var/lib/apt/lists/*

# Install dependencies
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY . .

# Expose port
EXPOSE 8000