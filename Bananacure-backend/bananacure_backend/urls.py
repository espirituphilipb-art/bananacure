from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from core.views import login_view, UserViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet, basename='user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/login/', login_view, name='login'),
    path('api/', include(router.urls)),
]