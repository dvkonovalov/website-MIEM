from django.db import models
import requests


# Create your models here.
class Professors(models.Model):
    class Meta:
        verbose_name = 'Преподаватель'
        verbose_name_plural = 'Преподаватели'

    full_name = models.CharField(max_length=150, blank=False, verbose_name='Фамилия Имя Отчество',unique=True)
    scientific_title = models.CharField(max_length=50, blank=False, verbose_name='Ученое звание')
    email_addres = models.EmailField(max_length=100, blank=False, verbose_name='Адрес электронной почты', default='')
    external_link = models.CharField(max_length=150, blank=False, verbose_name='Внешняя ссылка')
    photo = models.ImageField(upload_to='professors_photo', verbose_name='Фото')

    def __str__(self):
        return self.full_name

    def get_lectureroid(self):
        try:
            html_code = requests.get(self.external_link).text
            html_code = html_code[html_code.find('idx.push(')+10:]
            html_code = html_code[:html_code.find('\n')-3]
        except requests.exceptions.MissingSchema:
            html_code = -1
        return html_code


class News(models.Model):
    class Meta:
        verbose_name = 'Новость'
        verbose_name_plural = 'Новости'

    title = models.CharField(max_length=150, blank=False, verbose_name='Название')
    description = models.TextField(blank=False, verbose_name='Содержание')
    photo = models.ImageField(upload_to='news', verbose_name='Фото', blank=True)

    def __str__(self):
        return self.title


class Skill(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name='Навык')

    def __str__(self):
        return self.name

class Vacancy(models.Model):
    class Meta:
        verbose_name = 'Вакансия'
        verbose_name_plural = 'Вакансии'

    title = models.CharField(max_length=50, blank=False, verbose_name='Название вакансии')
    skills = models.ManyToManyField(Skill, blank=True, verbose_name='Необходимые навыки')

    def __str__(self):
        return self.title

    def get_skills_list(self):
        return [skill.name for skill in self.skills.all()]

class Material(models.Model):
    class Meta:
        verbose_name = 'Учебный материал'
        verbose_name_plural = 'Учебные материалы'

    title = models.CharField(max_length=50, blank=False, verbose_name='Название материала')
    description = models.CharField(max_length=500, blank=True, verbose_name='Краткое описание')
    file = models.FileField(upload_to='material', verbose_name='Файл')

    def __str__(self):
        return self.title


class Work(models.Model):
    class Meta:
        verbose_name_plural = 'Лабораторные и практические работы'
        verbose_name = 'Лабораторная работа'

    title = models.CharField(max_length=50, blank=False, verbose_name='Название работы')
    description = models.CharField(max_length=500, blank=True, verbose_name='Краткое описание')
    file = models.FileField(upload_to='works', verbose_name='Файл')

    def __str__(self):
        return self.title