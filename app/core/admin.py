from django.contrib import admin
from .models import (
    Professors,
    News,
    Skill,
    Vacancy,
    Material,
    Work,
)

# Register your models here.
admin.site.register(Professors)
admin.site.register(News)
admin.site.register(Skill)
admin.site.register(Vacancy)
admin.site.register(Material)
admin.site.register(Work)
