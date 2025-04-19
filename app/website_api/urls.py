from rest_framework import routers
from django.urls import path
from . import views


router = routers.DefaultRouter()
router.register('professors', views.ProfessorsApi)
router.register('news', views.NewsApi)
router.register('material', views.MaterialApi)
router.register('vacancy', views.VacancysApi)
router.register('useful_links', views.LinkApi)
router.register('work', views.WorkApi)
router.register('skills', views.SkillApi)



urlpatterns = [
    path('media/<str:folder>/<str:file_name>', views.getfile),
    path('status_user/', views.get_status),
    path('getcsrf/', views.get_csrf)
] + router.urls
