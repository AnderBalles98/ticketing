from django.urls import path
from rest_framework_jwt.views import ObtainJSONWebToken


urlpatterns = [
    path('login/', ObtainJSONWebToken.as_view()),
]