from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

from chat.chatbot import DialogFlowChatBot
from chat.models import Chat, Message
from chat.serializers import ChatSerializer, LoginSerializer, MessageSerializer, UserSerializer

from django.utils import timezone

@api_view(['POST'])
def login(request):

    serializer = LoginSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = get_object_or_404(User, username=serializer.data['username'])
    if not user.check_password(serializer.data['password']):
        return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        token = Token.objects.get(user=user)
        return Response({"message": "Login successful", "token": token.key, "user": UserSerializer(user).data}, status=status.HTTP_200_OK)


@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()

        token = Token.objects.create(user=user)
        print(token.key)
        return Response({"message": "Registation successful", "user": serializer.data, "token": token.key}, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def get_user_chat_history(request: Request):

    user = request.user
    chats = Chat.objects.filter(user=user)
    return Response({"chats": ChatSerializer(chats, many=True).data})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def get_chat(request: Request, chat_id: str):


    chat = get_object_or_404(Chat, id=chat_id)
    user = request.user
    if chat.user != user:
        return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)

    return Response({"chat": ChatSerializer(chat).data})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def chat_message(request: Request, chat_id: str):

    user = request.user
    # get the most recent chat ordered by created_at
    chat = None

    if 'chat_id' in request.data:
        chat = get_object_or_404(Chat, id=chat_id)
        if chat.user != user:
            return Response({"message": "Unauthorized"}, status=status.HTTP_401_UNAUTHORIZED)
    else:
        chat = Chat.objects.filter(user=user).order_by('-created_at').first()

    # create a new message
    message = Message.objects.create(chat=chat, sender='user', content=request.data['message'])
    message.save()

    # chatbot message
    # TODO: This should work as a singleton or a service to avoid creating a new instance every time
    chatbot_response = DialogFlowChatBot().get_response(request.data['message'])
    # create a new message
    response = Message.objects.create(chat=chat, sender='chatbot', content=chatbot_response)
    response.save()


    return Response({"response": MessageSerializer(response).data, "chat": ChatSerializer(chat).data}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([TokenAuthentication])
def start_chat(request: Request):

    user = request.user
    chat = Chat.objects.create(user=user)
    chat.save()

    first_message = Message.objects.create(chat=chat, sender='user', content=request.data['message'])
    first_message.save()

    chatbot_response = 'Hello, I am a chatbot. How can I help you?'

    response = Message.objects.create(chat=chat, sender='chatbot', content=chatbot_response)
    response.save()

    return Response({"response": MessageSerializer(response).data, "chat": ChatSerializer(chat).data}, status=status.HTTP_201_CREATED)


