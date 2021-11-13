from ticketing.models import UserStory, Project
from rest_framework import serializers
from rest_framework import validators
from .project import ProjectSerializer
from django.core.exceptions import ValidationError as ModelValidationError, ObjectDoesNotExist
from users.serializers import UserSerializer


class UserStorySerializer(serializers.ModelSerializer):

    project = ProjectSerializer(read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = UserStory
        fields = '__all__'

    def create(self, validated_data):
        user_story = UserStory(**validated_data)
        context_data = self.context['request'].data
        user = self.context['request'].user
        if not 'project' in context_data.keys():
            raise serializers.ValidationError({'project': ['This value is required']})
        project_id = context_data['project']
        try:
            project = Project.objects.get(pk=project_id)
            user_story.project = project
            user_story.created_by = user
        except ObjectDoesNotExist:
            raise serializers.ValidationError({'project': ['project doesn\'t exist']})
        except ModelValidationError:
            raise serializers.ValidationError({'project': ['This value is not a valid uuid']})
        user_story.save()
        return user_story

    def update(self, user_story, validated_data):

        for key in validated_data.keys():
            setattr(user_story, key, validated_data[key])
        context_data = self.context['request'].data
        if not 'project' in context_data.keys():
            raise serializers.ValidationError({'project': ['This value is required']})
        project_id = context_data['project']
        try:
            project = Project.objects.get(pk=project_id)
            user_story.project = project
        except ObjectDoesNotExist:
            raise serializers.ValidationError({'project': ['project doesn\'t exist']})
        except ModelValidationError:
            raise serializers.ValidationError({'project': ['This value is not a valid uuid']})
        user_story.save()
        return user_story