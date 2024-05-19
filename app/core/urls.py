from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('labs/', views.index),
    path('material/', views.index),
    path('recrutement/', views.index),
    path('schedule/', views.index),
    path('useful_links/', views.index),
    path('wetty/', views.redirect_to_server),
    path('login/', views.login_view),
    path('signup/', views.index),
    path('logout/', views.logout_view),

]
