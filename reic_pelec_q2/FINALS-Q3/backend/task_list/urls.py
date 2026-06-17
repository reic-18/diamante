from django.urls import path
from .views import Task_List, Task_Update


urlpatterns = [
    path('tasks/', Task_List),
    path('tasks/<int:pk>/', Task_Update),
]