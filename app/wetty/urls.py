from . import views
from django.urls import path

urlpatterns = [
    path('', views.redirect_to_dist_server),
]
