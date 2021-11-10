from ticketing.models import Project, Company
from rest_framework import serializers
from .company import CompanySerializer
from django.core.exceptions import ValidationError as ModelValidationError, ObjectDoesNotExist

class ProjectSerializer(serializers.ModelSerializer):

    company = CompanySerializer(read_only=True)

    class Meta:
        model = Project
        fields = '__all__'

    def create(self, validated_data):
        project = Project(**validated_data)
        context_data = self.context['request'].data
        if not 'company' in context_data.keys():
            raise serializers.ValidationError({'company': ['This value is required']})
        company_id = context_data['company']
        try:
            company = Company.objects.get(pk=company_id)
            project.company = company
        except ObjectDoesNotExist:
            raise serializers.ValidationError({'company': ['company doesn\'t exist']})
        except ModelValidationError:
            raise serializers.ValidationError({'company': ['This value is not a valid uuid']})
        project.save()
        return project
