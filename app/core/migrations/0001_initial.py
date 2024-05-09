# Generated by Django 5.0.3 on 2024-04-11 05:23

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Material',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Название материала')),
                ('description', models.CharField(blank=True, max_length=500, verbose_name='Краткое описание')),
                ('file', models.FileField(upload_to='', verbose_name='Файл')),
            ],
            options={
                'verbose_name': 'Учебный материал',
                'verbose_name_plural': 'Учебные материалы',
            },
        ),
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150, verbose_name='Название')),
                ('description', models.TextField(verbose_name='Содержание')),
                ('photo', models.ImageField(blank=True, upload_to='', verbose_name='Фото')),
            ],
            options={
                'verbose_name': 'Новость',
                'verbose_name_plural': 'Новости',
            },
        ),
        migrations.CreateModel(
            name='Professors',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=150, verbose_name='Фамилия Имя Отчество')),
                ('scientific_title', models.CharField(max_length=50, verbose_name='Ученое звание')),
                ('email_addres', models.EmailField(default='', max_length=100, verbose_name='Адрес электронной почты')),
                ('photo', models.ImageField(upload_to='', verbose_name='Фото')),
            ],
            options={
                'verbose_name': 'Преподаватель',
                'verbose_name_plural': 'Преподаватели',
            },
        ),
        migrations.CreateModel(
            name='Vacancy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Название вакансии')),
                ('skills', models.TextField(verbose_name='Необходимые навыки')),
            ],
            options={
                'verbose_name': 'Вакансия',
                'verbose_name_plural': 'Вакансии',
            },
        ),
        migrations.CreateModel(
            name='Work',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50, verbose_name='Название работы')),
                ('description', models.CharField(blank=True, max_length=500, verbose_name='Краткое описание')),
                ('file', models.FileField(upload_to='', verbose_name='Файл')),
            ],
            options={
                'verbose_name': 'Лабораторная работа',
                'verbose_name_plural': 'Лабораторные и практические работы',
            },
        ),
    ]
