from ticketing.serializers import UserStorySerializer
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, DestroyAPIView
from rest_framework import serializers
from ticketing.models import UserStory, Project, Company
from rest_framework.exceptions import NotFound
from django.core.exceptions import ValidationError as ModelValidationError, ObjectDoesNotExist

class UserStoryCreateView(CreateAPIView):
    
    serializer_class = UserStorySerializer

    def post(self, request):
        user = request.user
        request.data['created_by'] = user.id
        return super(UserStoryCreateView, self).post(request)

class UserStoryListView(ListAPIView):
    serializer_class = UserStorySerializer
    queryset = UserStory.objects.all()

    def get(self, request):
        return super(UserStoryListView, self).get(request)

class UserStoryListByProjectView(ListAPIView):

    serializer_class = UserStorySerializer
    queryset = UserStory.objects.all()

    def get_queryset(self):
        try:
            project = Project.objects.get(pk=self.kwargs['project_pk'])
            return self.queryset.filter(project=project)
        except ModelValidationError:
            raise serializers.ValidationError({'project_id': ['This value is not a valid uuid.']})
        except ObjectDoesNotExist:
                raise NotFound()

class UserStoryListByProjectNameAndCompanyNameView(ListAPIView):
    serializer_class = UserStorySerializer
    queryset = UserStory.objects.all()

    def get_queryset(self):
        try:
            company = Company.objects.get(name=self.kwargs['company_name'])
            try:
                project = Project.objects.get(name=self.kwargs['project_name'], company=company)
                return self.queryset.filter(project=project)
            except ModelValidationError:
                raise serializers.ValidationError({'project_name': ['This value is not a valid name.']})
        except ModelValidationError:
            raise serializers.ValidationError({'company_name': ['This value is not a valid name.']})
        except ObjectDoesNotExist:
            raise NotFound()

    def get(self, request, company_name=None, project_name=None):
        return super(UserStoryListByProjectNameAndCompanyNameView, self).get(request)

class UserStoryUpdateView(UpdateAPIView):

    serializer_class = UserStorySerializer
    queryset = UserStory.objects.all()

    def get_queryset(self, pk=None):
        try:
            return self.queryset.filter(pk=self.kwargs['pk'])
        except ModelValidationError:
            raise serializers.ValidationError({'id': ['This value is not a valid uuid']})

    def put(self, request, pk=None):
        return super(UserStoryUpdateView, self).patch(request)

class UserStoryDestroyApiView(DestroyAPIView):

    serializer_class = UserStorySerializer
    queryset = UserStory.objects.all()

    def get_queryset(self, pk=None):
        try:
            return self.queryset.filter(pk=self.kwargs['pk'])
        except ModelValidationError:
            raise serializers.ValidationError({'id': ['This value is not a valid uuid']})

    def delete(self, request, pk=None):
        return super(UserStoryDestroyApiView, self).delete(request)




