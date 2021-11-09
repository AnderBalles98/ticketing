from rest_framework import serializers
from django.contrib.auth.models import User, Group

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id',
                  'email',
                  'username',
                  'is_active',
                  'password',
                  'date_joined',
                  'is_superuser',
                  'first_name',
                  'last_name',
                  'groups')

    def create(self, validated_data):
        groups = []
        print(validated_data)
        if 'password' in validated_data:
            password = validated_data.pop('password')
        if 'groups' in validated_data:
            groups = validated_data.pop('groups')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        groups.append(Group.objects.get(name='default').id)
        if groups:
            user.groups.set(groups)
        return user
