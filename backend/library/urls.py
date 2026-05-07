"""
URL configuration for library project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import include, path
from rest_framework import routers

from books import views as books_views
from member import views as member_views
from borrowings import views as borrowing_views
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import ( TokenObtainPairView, TokenRefreshView)

router = routers.DefaultRouter()
router.register(r"books", books_views.BookViewSet, basename="books")
router.register(r"member",  member_views.MemberViewSet, basename="member")
router.register(r"borrowings",  borrowing_views.BorrowingViewSet, basename="borrowings")


urlpatterns = [
    path("api/", include(router.urls)),
    path('api/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
