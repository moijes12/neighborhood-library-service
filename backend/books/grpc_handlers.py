# Add  grpc handler service registration 
from django_socio_grpc.services.app_handler_registry import AppHandlerRegistry
from books.grpc_services import BookService

def grpc_handlers(server):
    app_registry = AppHandlerRegistry("books",server)
    app_registry.register(BookService)