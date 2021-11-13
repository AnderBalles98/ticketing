from rest_framework import serializers
from ticketing.models import CompanyUser, Company, User
from django.contrib.auth.models import User

from .company import CompanySerializer
from django.core.exceptions import ValidationError as ModelValidationError, ObjectDoesNotExist

class CompanyUserSerializer(serializers.ModelSerializer):

    company = CompanySerializer(read_only=True)

    class Meta:
        model = CompanyUser
        fields = '__all__'

    def create(self, validated_data):
        company_user = CompanyUser(**validated_data)
        context_data = self.context['request'].data
        if not 'company' in context_data.keys():
            raise serializers.ValidationError({'company': ['This value is required']})
        company_id = context_data['company']
        try:
            company = Company.objects.get(pk=company_id)
            company_user.company = company
        except ObjectDoesNotExist:
            raise serializers.ValidationError({'company': ['company doesn\'t exist']})
        except ModelValidationError:
            raise serializers.ValidationError({'company': ['This value is not a valid uuid']})
        company_user.save()
        return company_user

