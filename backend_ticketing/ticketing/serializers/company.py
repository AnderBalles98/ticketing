from rest_framework import serializers
from django.contrib.auth.models import User
from ticketing.models import Company
from rest_framework.validators import UniqueValidator
from users.serializers import UserSerializer

class CompanySerializer(serializers.ModelSerializer):

    phone = serializers.RegexField('^([0-9]){7,15}$')
    nit = serializers.RegexField('^([0-9]){7,15}$',
                                 validators=[UniqueValidator(
                                     queryset=Company.objects.all())
                                 ])
    users = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Company
        fields = '__all__'

    def get_users(self, company):
        company_users = company.company_user.all()
        users = User.objects.filter(company_user__in=company_users)
        dict_users = users.values('id',
                  'email',
                  'username',
                  'first_name',
                  'last_name',)
        list_users = list(dict_users)
        return list_users