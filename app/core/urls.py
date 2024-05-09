from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('labs/', views.index),
    path('material/', views.index),
    path('recrutement/', views.index),
    path('signin/', views.index),
    path('schedule/', views.index),


]
