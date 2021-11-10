from ticketing.serializers import ProjectSerializer
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, DestroyAPIView
from rest_framework import serializers
from rest_framework.exceptions import NotFound
from ticketing.models import UserStory, Project, Company
from django.core.exceptions import ValidationError as ModelValidationError, ObjectDoesNotExist

class ProjectCreateApiView(CreateAPIView):
    
    serializer_class = ProjectSerializer
    
    def post(self, request):
        user = request.user
        request.data['created_by'] = user.id
        return super(ProjectCreateApiView, self).post(request)

class ProjectListApiView(ListAPIView):

    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def get(self, request):
        return super(ProjectListApiView, self).get(request)


class ProjectUpdateApiView(UpdateAPIView):

    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def get_queryset(self, pk=None):
        try:
            return self.queryset.filter(pk=self.kwargs['pk'])
        except ModelValidationError:
            raise serializers.ValidationError({'id': ['This value is not a valid uuid']})

    def put(self, request, pk=None):
        return super(ProjectUpdateApiView, self).patch(request)

class ProjectListByCompanyView(ListAPIView):

    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def get_queryset(self):
        try:
            company = Company.objects.get(pk=self.kwargs['company_pk'])
            return self.queryset.filter(company=company)
        except ModelValidationError:
            raise serializers.ValidationError({'company_id': ['This value is not a valid uuid.']})
        except ObjectDoesNotExist:
            raise NotFound()

    def get(self, request, company_pk=None):
        return super(ProjectListByCompanyView, self).get(request)

class ProjectDestroyApiView(DestroyAPIView):

    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def get_queryset(self, pk=None):
        try:
            return self.queryset.filter(pk=self.kwargs['pk'])
        except ModelValidationError:
            raise serializers.ValidationError({'id': ['This value is not a valid uuid']})

    def delete(self, request, pk=None):
        return super(ProjectDestroyApiView, self).delete(request)



