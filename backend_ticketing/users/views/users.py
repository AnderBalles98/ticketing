from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from users.serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from users.decorators import CheckGroup
from django.contrib.auth.models import User, Group


class UserView(CreateAPIView):

    serializer_class = UserSerializer
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        return super(UserView, self).post(request)
