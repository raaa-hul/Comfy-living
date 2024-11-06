# my_project/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls', namespace='v1')),
    path('api/v2/', include('api_v2.urls', namespace='v2')),
]
