from rest_framework import serializers
from django.contrib.auth.models import User, Group
from django.core.exceptions import ValidationError as ModelValidationError, ObjectDoesNotExist
import re

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id',
                  'email',
                  'username',
                  'is_active',
                  'date_joined',
                  'is_superuser',
                  'first_name',
                  'last_name',
                  'groups')

    def create(self, validated_data):
        groups = []
        context_data = self.context['request'].data
        if not 'password' in context_data.keys():
            raise serializers.ValidationError({'password': ['This value is required']})
        password = context_data['password']
        if not re.search('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$', password):
            raise serializers.ValidationError({'password': ['This value is not valid']})
        if 'groups' in validated_data:
            groups = validated_data.pop('groups')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        groups.append(Group.objects.get(name='default').id)
        if groups:
            user.groups.set(groups)
        return user
