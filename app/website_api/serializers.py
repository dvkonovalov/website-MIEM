from rest_framework import serializers
from core.models import Professors, News, Vacancy, Material, Work, Link, Skill


class ProfessorSerializers(serializers.ModelSerializer):
    class Meta:
        model = Professors
        fields = '__all__'


class NewsSerializers(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'


class SkillsSerializers(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ('name',)


class VacancySerializers(serializers.ModelSerializer):
    skills = SkillsSerializers(many = True, read_only = True)
    class Meta:
        model = Vacancy
        fields = ('title', 'skills',)


class MaterialSerializers(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = '__all__'


class WorkSerializers(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'

class LinkSerializers(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = '__all__'
