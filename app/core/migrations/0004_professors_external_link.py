# Generated by Django 5.0.3 on 2024-04-14 12:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_material_file_alter_news_photo_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='professors',
            name='external_link',
            field=models.CharField(blank=True, max_length=150, verbose_name='Внешняя ссылка'),
        ),
    ]
