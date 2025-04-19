import requests
from rest_framework import viewsets
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.csrf import ensure_csrf_cookie

from core.models import Professors, News, Vacancy, Material, Link, Work, Skill
from .serializers import ProfessorSerializers, NewsSerializers, VacancySerializers, MaterialSerializers, LinkSerializers, WorkSerializers, SkillsSerializers

HSE_TIMETABLE_API_REQUEST_TEMPLATE = (
    ''
)


class ProfessorsApi(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Professors.objects.all()
    serializer_class = ProfessorSerializers

class NewsApi(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = News.objects.all()
    serializer_class = NewsSerializers


class VacancysApi(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Vacancy.objects.all()
    serializer_class = VacancySerializers


class MaterialApi(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Material.objects.all()
    serializer_class = MaterialSerializers


class LinkApi(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Link.objects.all()
    serializer_class = LinkSerializers

class WorkApi(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Work.objects.all()
    serializer_class = WorkSerializers

class SkillApi(viewsets.ModelViewSet):
    http_method_names = ['get']
    queryset = Skill.objects.all()
    serializer_class = SkillsSerializers


def getfile(request, folder, file_name):
    img = ['png', 'jpg', 'jpeg', 'webp']

    path_to_file = 'media/' + folder + '/' + file_name
    extension = file_name[file_name.rfind('.') + 1:]
    type_file = ''
    if extension in img:
        type_file = 'image'
    else:
        type_file = 'application'
    try:
        with open(path_to_file, "rb") as f:
            return HttpResponse(f.read(), content_type=f"{type_file}/{extension}")
    except Exception:
        return HttpResponseNotFound("<h1>Image not found</h1>")


def get_status(request):
    response = dict()
    if request.user.is_authenticated:
        response['authorized'] = 'true'
        response['username'] = str(request.user)
        if request.user.groups.filter(name='Удаленный доступ').exists():
            response['remote_access'] = 'true'
        else:
            response['remote_access'] = 'false'
        return JsonResponse(response, safe=False)
    else:
        response['authorized'] = 'false'
        return JsonResponse(response, safe=False)

@ensure_csrf_cookie
def get_csrf(request):
    return JsonResponse({})
