from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from ticketing.serializers import CompanyUserSerializer
from ticketing.models import CompanyUser, Company
from rest_framework import serializers
from rest_framework.exceptions import NotFound
from django.core.exceptions import ValidationError as ModelValidationError, ObjectDoesNotExist

class CompanyUserCreateView(CreateAPIView):
    
    serializer_class = CompanyUserSerializer

    def post(self, request):
        return super(CompanyUserCreateView, self).post(request)
    
class CompanyUserListView(ListAPIView):
    serializer_class = CompanyUserSerializer
    queryset = CompanyUser.objects.all()
    
    def get(self, request):
        return super(CompanyUserListView, self).get(request)


class CompanyUserGetByMyUserView(RetrieveAPIView):

    serializer_class = CompanyUserSerializer
    queryset = CompanyUser.objects.all()

    def get_object(self):
        try:
            user = self.request.user
            return self.queryset.get(user=user)
        except ObjectDoesNotExist:
            raise NotFound()

    def get(self, request):
        return super(CompanyUserGetByMyUserView, self).get(request)

class CompanyUserListByCompanyView(ListAPIView):
    serializer_class = CompanyUserSerializer
    queryset = CompanyUser.objects.all()

    def get_queryset(self):
        try:
            company = Company.objects.get(pk=self.kwargs['company_pk'])
            return self.queryset.filter(company=company)
        except ModelValidationError:
            raise serializers.ValidationError({'company_id': ['This value is not a valid uuid.']})
        except ObjectDoesNotExist:
            raise NotFound()

    def get(self, request, company_pk=None):
        return super(CompanyUserListView, self).get(request)