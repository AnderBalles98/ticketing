from ticketing.models import TicketState
from rest_framework import serializers


class TicketStateSerializer(serializers.ModelSerializer):

    class Meta:
        model = TicketState
        fields = '__all__'
