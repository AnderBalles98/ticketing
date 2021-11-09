from django.contrib.auth.models import Group
from django.utils.translation import ugettext_lazy as _
from rest_framework.response import Response
from rest_framework.status import HTTP_403_FORBIDDEN


class CheckGroup(object):

    def __init__(self, groupname):
        self.groupname = groupname
        self.group = Group.objects.get(name=groupname)

    def __call__(self, method):
        def check_group(*args, **kwargs):
            request = args[1]
            user = request.user
            if (self.group in user.groups.all()) or ('admin' in user.groups.all()):
                return method(*args, **kwargs)
            else:
                return Response(
                    {'detail': _('The user doesn\'t have access to this method.')}, status=HTTP_403_FORBIDDEN)
        return check_group


class CheckAnyGroup(object):
    def __init__(self, groupnames):
        self.groupnames = groupnames
        self.groups = Group.objects.filter(name__in=groupnames)

    def __call__(self, method):
        def check_group(*args, **kwargs):
            request = args[1]
            user = request.user
            counter = 0

            if 'admin' in user.groups.all():
                counter += 1
            else:
                for group in self.groups:
                    if group in user.groups.all():
                        counter += 1

            if counter > 0:
                return method(*args, **kwargs)
            else:
                return Response(
                    {'detail': _('The user doesn\'t have access to this method.')}, status=HTTP_403_FORBIDDEN)

        return check_group