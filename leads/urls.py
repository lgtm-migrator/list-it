from django.urls import path
from . import views

urlpatterns = [
    path('current_user/', views.current_user),
    path('users/', views.UserList.as_view()),
    path('api/v1/lists/', views.ListGet.as_view()),
    path('api/v1/lists/new', views.ListCreate.as_view()),
    path('api/v1/lists/<int:id>/',
         views.ListRetrieveUpdateDestroy.as_view()
         ),
]
