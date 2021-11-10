from rest_framework.generics import CreateAPIView, ListAPIView
from ticketing.serializers import TicketStateSerializer
from ticketing.models import TicketState


class TicketStateListView(ListAPIView):
    serializer_class = TicketStateSerializer
    queryset = TicketState.objects.all()

    def get(self, request):
        return super(TicketStateListView, self).get(request)

