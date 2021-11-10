from django.urls import path
from ticketing.views import (CompanyCreateView, CompanyListView, CompanyUserListView, CompanyUserListByCompanyView, CompanyUserCreateView,
                             UserStoryCreateView, UserStoryListView, UserStoryUpdateView, UserStoryListByProjectView,
                             UserStoryDestroyApiView, TicketDestroyApiView, TicketListApiView,
                             TicketUpdateApiView, TicketCreateApiView, TicketingListByUserStoryView, TicketStateListView,
                             ProjectListApiView, ProjectCreateApiView, ProjectListByCompanyView, ProjectUpdateApiView, ProjectDestroyApiView)

urlpatterns = [
    path('company/create/', CompanyCreateView.as_view()),
    path('company/list/', CompanyListView.as_view()),
    path('company/user/create/', CompanyUserCreateView.as_view()),
    path('company/user/list/', CompanyUserListView.as_view()),
    path('company/project/create/', ProjectCreateApiView.as_view()),
    path('company/project/list/', ProjectListApiView.as_view()),
    path('company/project/list/by/company/<company_pk>/', ProjectListByCompanyView.as_view()),
    path('company/project/update/<pk>/', ProjectUpdateApiView.as_view()),
    path('company/project/delete/<pk>/', ProjectDestroyApiView.as_view()),
    path('company/userStory/create/', UserStoryCreateView.as_view()),
    path('company/userStory/list/', UserStoryListView.as_view()),
    path('company/userStory/list/by/project/<project_pk>/', UserStoryListByProjectView.as_view()),
    path('company/userStory/update/<pk>/', UserStoryUpdateView.as_view()),
    path('company/userStory/delete/<pk>/', UserStoryDestroyApiView.as_view()),
    path('company/ticket/create/', TicketCreateApiView.as_view()),
    path('company/ticket/state/list/', TicketStateListView.as_view()),
    path('company/ticket/list/', TicketListApiView.as_view()),
    path('company/ticket/list/by/userStory/<user_story_pk>/', TicketingListByUserStoryView.as_view()),
    path('company/ticket/update/<pk>/', TicketUpdateApiView.as_view()),
    path('company/ticket/delete/<pk>/', TicketDestroyApiView.as_view()),
]