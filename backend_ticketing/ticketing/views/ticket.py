from ticketing.models import Ticket, TicketState, UserStory, TicketState
from ticketing.serializers import TicketSerializer
from rest_framework.generics import CreateAPIView, UpdateAPIView, ListAPIView, DestroyAPIView
from rest_framework import serializers
from rest_framework.exceptions import NotFound
from django.core.exceptions import ValidationError as ModelValidationError, ObjectDoesNotExist
from django.forms.models import model_to_dict


class TicketCreateApiView(CreateAPIView):

    serializer_class = TicketSerializer

    def post(self, request):
        request.data['created_by'] = request.user.id
        return super(TicketCreateApiView, self).post(request)

class TicketListApiView(ListAPIView):

    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

    def get(self, request):
        return super(TicketListApiView, self).get(request)

class TicketingListByUserStoryView(ListAPIView):

    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

    def get_queryset(self):
        try:
            user_story = UserStory.objects.get(pk=self.kwargs['user_story_pk'])
            return self.queryset.filter(user_story=user_story)
        except ModelValidationError:
            raise serializers.ValidationError({'user_story_id': ['This value is not a valid uuid.']})
        except ObjectDoesNotExist:
                raise NotFound()


    def get(self, request, user_story_pk=None):
        return super(TicketingListByUserStoryView, self).get(request)

class TicketUpdateApiView(UpdateAPIView):

    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

    def get_queryset(self):
        try:
            return self.queryset.filter(pk=self.kwargs['pk'])
        except ModelValidationError:
            raise serializers.ValidationError({'id': ['This value is not a valid uuid']})
    
    def put(self, request, pk=None):
        return super(TicketUpdateApiView, self).patch(request)

class TicketDestroyApiView(DestroyAPIView):

    serializer_class = TicketSerializer
    queryset = Ticket.objects.all()

    def get_queryset(self):
        try:
            return self.queryset.filter(pk=self.kwargs['pk'])
        except ModelValidationError:
            raise serializers.ValidationError({'id': ['This value is not a valid uuid']})

    def delete(self, request, pk=None):
        return super(TicketDestroyApiView, self).delete(request)
