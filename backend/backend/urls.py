"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path
from chat.routes import login, register, hello_world, get_user_chat_history, user_message, start_chat

urlpatterns = [
    path('admin/', admin.site.urls),
    re_path('api/chat/login', login),
    re_path('api/chat/register', register),
    re_path('api/chat/hello', hello_world),
    re_path('api/chat/history', get_user_chat_history),
    re_path('api/chat/message', user_message),
    re_path('api/chat/start', start_chat),
]
