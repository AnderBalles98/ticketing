from django.urls import path
from rest_framework_jwt.views import ObtainJSONWebToken
from users.views import UserView

urlpatterns = [
    path('login/', ObtainJSONWebToken.as_view()),
    path('create/', UserView.as_view())
]