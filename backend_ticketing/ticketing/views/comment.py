from rest_framework.generics import CreateAPIView, ListAPIView, DestroyAPIView, UpdateAPIView
from ticketing.serializers import CommentSerializer
from rest_framework import serializers
from users.decorators import CheckGroup
from ticketing.models import Comment, Ticket
from rest_framework.exceptions import NotFound
import uuid
from django.core.exceptions import ValidationError as ModelValidationError, ObjectDoesNotExist


class CommentCreateView(CreateAPIView):
    serializer_class = CommentSerializer

    def post(self, request):
        return super(CommentCreateView, self).post(request)


class CommentListByTicketView(ListAPIView):

    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def get_queryset(self):
        try:
            ticket_input_pk = self.kwargs['ticket_pk']
            ticket = None
            if (self.is_valid_uuid(ticket_input_pk)):
                ticket = Ticket.objects.get(pk=ticket_input_pk)
            else:
                ticket = Ticket.objects.get(display_id=ticket_input_pk)
            return self.queryset.filter(ticket=ticket)
        except ModelValidationError:
            raise serializers.ValidationError({'id': ['This value is not valid']})
        except ObjectDoesNotExist:
                raise NotFound()


    def get(self, request, ticket_pk=None):
        return super(CommentListByTicketView, self).get(request)


    def is_valid_uuid(self, value):
        try:
            uuid.UUID(value)

            return True
        except ValueError:
            return False


class CommentUpdateApiView(UpdateAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def get_queryset(self, pk=None):
        try:
            return self.queryset.filter(pk=self.kwargs['pk'])
        except ModelValidationError:
            raise serializers.ValidationError({'id': ['This value is not a valid uuid']})

    def put(self, request, pk=None):
        return super(CommentUpdateApiView, self).patch(request)


class CommentDestroyById(DestroyAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

    def delete(self, request, pk=None):
        return super(CommentDestroyById, self).delete(request)
