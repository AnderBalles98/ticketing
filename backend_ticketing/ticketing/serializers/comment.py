from ticketing.models import Comment, Ticket
from rest_framework import serializers
from users.serializers import UserSerializer
from .ticket import TicketStateSerializer
import uuid

class CommentSerializer(serializers.ModelSerializer):

    created_by = UserSerializer(read_only=True)
    ticket_display_id = serializers.IntegerField(write_only=True)
    ticket = TicketStateSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'

    def create(self, validated_data):
        print(validated_data)
        ticket_display_id = validated_data.pop('ticket_display_id')
        ticket = Ticket.objects.get(display_id=ticket_display_id)
        comment = Comment(**validated_data)
        user = self.context['request'].user
        comment.created_by = user
        comment.ticket = ticket
        comment.save()
        return comment
