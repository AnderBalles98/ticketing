from rest_framework.generics import CreateAPIView
from users.serializers import UserSerializer


class UserView(CreateAPIView):

    serializer_class = UserSerializer
    authentication_classes = []
    permission_classes = []

    def post(self, request):
        return super(UserView, self).post(request)
