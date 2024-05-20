from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('labs/', views.index),
    path('material/', views.index),
    path('recrutement/', views.index),
    path('schedule/', views.index),
    path('useful_links/', views.index),
    path('signin/', views.index),
    path('signup/', views.index),
    path('wetty/', views.redirect_to_dist_server),
    path('account/login/', views.login_view, name='login'),
    path('account/logout/', views.logout_view),
    path('account/signup/', views.sign_up),
    path('account/reset-password/', views.PasswordReset.as_view()),
    path('account/password_reset_confirm/<uidb64>/<token>/', views.PasswordResetConfirm.as_view(), name="password_reset_confirm"),
    path('account/password_reset_done/', views.PasswordResetDone.as_view(), name="password_reset_done"),
    path('account/password_reset_complete/', views.PasswordResetComplete.as_view(), name='password_reset_complete')

]
