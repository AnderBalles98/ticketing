from rest_framework import serializers
from ticketing.models import CompanyUser, Company, User
from django.contrib.auth.models import User

from .company import CompanySerializer
from django.core.exceptions import ValidationError as ModelValidationError, ObjectDoesNotExist

class CompanyUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CompanyUser
        fields = '__all__'

