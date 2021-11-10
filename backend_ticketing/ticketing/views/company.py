from rest_framework.generics import CreateAPIView, ListAPIView
from ticketing.serializers import CompanySerializer
from users.decorators import CheckGroup
from ticketing.models import Company

class CompanyCreateView(CreateAPIView):
    
    serializer_class = CompanySerializer

    @CheckGroup('admin')
    def post(self, request):
        return super(CompanyCreateView, self).post(request)

class CompanyListView(ListAPIView):

    serializer_class = CompanySerializer
    queryset = Company.objects.all()

    def get(self, request):
        return super(CompanyListView, self).get(request)

