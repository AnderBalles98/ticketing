import datetime

from django.db import models
from uuid import uuid4
from django.contrib.auth.models import User

class StampModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Company(StampModel):
    name = models.CharField(unique=True, max_length=50)
    nit = models.CharField(unique=True, max_length=15)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    email = models.EmailField()
    description = models.CharField(max_length=150)

class CompanyUser(models.Model):
    user = models.ForeignKey(User, unique=True, related_name='company_user', on_delete=models.CASCADE)
    company = models.ForeignKey(Company, null=True, related_name='company_user', on_delete=models.SET_NULL)
    date_join = datetime.datetime.now()

class UserStory(StampModel):
    name = models.CharField(max_length=70)
    description = models.TextField(null=True)
    company = models.ForeignKey(Company, null=True, related_name='user_stories', on_delete=models.SET_NULL)
    created_by = models.ForeignKey(User, null=True, related_name='user_stories', on_delete=models.SET_NULL)

class TicketState(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    description = models.TextField(null=True)

class Ticket(StampModel):
    name = models.CharField(max_length=70)
    description = models.TextField(null=True)
    user_story = models.ForeignKey(UserStory, null=True, related_name='tickets', on_delete=models.SET_NULL)
    state = models.ForeignKey(TicketState, null=True, default=1, related_name='tickets', on_delete=models.SET_NULL)
    crated_by = models.ForeignKey(User, null=True, related_name='tickets', on_delete=models.SET_NULL)

class Comment(StampModel):
    text = models.TextField()
    ticket = models.ForeignKey(Ticket, null=True, related_name='comments', on_delete=models.SET_NULL)
    created_by = models.ForeignKey(User, null=True, related_name='comments', on_delete=models.SET_NULL)
