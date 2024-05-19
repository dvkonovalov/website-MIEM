from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('labs/', views.index),
    path('material/', views.index),
    path('recrutement/', views.index),
    path('signin/', views.index),
    path('signup/', views.index),
    path('schedule/', views.index),
    path('signout/', views.logout_view),
    path('useful_links/', views.index),
    path('wetty/', views.redirect_to_server),




]
