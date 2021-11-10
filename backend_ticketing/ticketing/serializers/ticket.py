from ticketing.models import Ticket, TicketState, UserStory
from rest_framework import serializers
from .ticket_state import TicketStateSerializer
from .user_story import UserStorySerializer
from rest_framework.exceptions import NotFound
from django.core.exceptions import ValidationError as ModelValidationError, ObjectDoesNotExist

class TicketSerializer(serializers.ModelSerializer):

    state = TicketStateSerializer(required=False)
    user_story = UserStorySerializer(read_only=True)

    class Meta:
        model = Ticket
        fields = '__all__'


    def create(self, validated_data):
        ticket = Ticket(**validated_data)
        context_data = self.context['request'].data
        if not 'user_story' in context_data.keys():
            raise serializers.ValidationError({'user_story': ['This value is required']})
        user_story_id = context_data['user_story']
        try:
            user_story = UserStory.objects.get(pk=user_story_id)
            ticket.user_story = user_story
        except ObjectDoesNotExist:
            raise serializers.ValidationError({'user_story': ['user_story doesn\'t exist']})
        except ModelValidationError:
            raise serializers.ValidationError({'user_story': ['This value is not a valid uuid']})

        if 'state' in context_data.keys():
            state_id = context_data['state']
            try:
                state = TicketState.objects.get(pk=state_id)
                ticket.state = state
            except ObjectDoesNotExist:
                raise serializers.ValidationError({'state': ['state doesn\'t exist']})
            except ModelValidationError:
                raise serializers.ValidationError({'state': ['This value is not a valid uuid']})
        ticket.save()
        return ticket

    def update(self, ticket, validated_data):

        for key in validated_data.keys():
            setattr(ticket, key, validated_data[key])
        context_data = self.context['request'].data
        if 'state' in context_data.keys():
            state_id = context_data['state']
            try:
                state = TicketState.objects.get(pk=state_id)
                ticket.state = state
            except ObjectDoesNotExist:
                raise NotFound()
            except ModelValidationError:
                raise serializers.ValidationError({'state': 'state doesn\'t exist'})
        ticket.save()
        return ticket
