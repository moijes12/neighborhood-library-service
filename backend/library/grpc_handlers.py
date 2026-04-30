from django_socio_grpc.services.app_handler_registry import AppHandlerRegistry
from books import grpc_handlers as books_grpc_handlers
from grpc_reflection.v1alpha import reflection


def grpc_handlers(server):
    books_grpc_handlers.grpc_handlers(server)

    reflection.enable_server_reflection(
        ['books.BookService', reflection.SERVICE_NAME],
        server
    )



