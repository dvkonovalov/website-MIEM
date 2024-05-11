import requests
from rest_framework import viewsets
from django.http import HttpResponse, HttpResponseNotFound, JsonResponse
from django.core.exceptions import ObjectDoesNotExist

from core.models import Professors, News, Vacancy, Material
from .serializers import ProfessorSerializers, NewsSerializers, VacancySerializers, MaterialSerializers

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


def getschedule(request):
    fromdate = request.GET.get('fromdate')
    todate = request.GET.get('todate')
    try:
        local_ids = Professors.objects.values_list('id', flat=True)
        all_schedules = []
        for id in local_ids:
            try:
                lectureroid = Professors.objects.get(id=id).get_lectureroid()
                if lectureroid == -1:
                    return HttpResponseNotFound("<h1>Professor not found</h1>")
                res = requests.get(
                    'http://www.hse.ru/api/timetable/lessons?receiverType=1&'
                    f'fromdate={fromdate}&todate={todate}&lectureroid={lectureroid}'
                )
            except Professors.DoesNotExist:
                continue
            res = res.json()
            schedule = dict()
            schedule['Count'] = res['Count']
            lessons = []
            for i in res['Lessons']:
                lessons.append({
                    'auditorium': i['auditorium'],
                    'beginLesson': i['beginLesson'],
                    'building': i['building'],
                    'date': i['date'],
                    'dayOfWeekString': i['dayOfWeekString'],
                    'discipline': i['discipline'],
                    'endLesson': i['endLesson'],
                    'kindOfWork': i['kindOfWork'],
                    'lecturer': i['lecturer'],
                    'lecturer_rank': i['lecturer_rank']
                })
            schedule['Lessons'] = lessons
            all_schedules.append(schedule)
        return JsonResponse(all_schedules, safe=False)
    except ObjectDoesNotExist:
        return HttpResponseNotFound("<h1>Professor not found</h1>")


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
