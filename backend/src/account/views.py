from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from account.models import Account
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from account.serializers import RegistrationSerializer, AccountPropertiesSerializer, AccountDeleteSerializer
from rest_framework.authtoken.models import Token

@swagger_auto_schema(request_body = RegistrationSerializer, method = 'post')
@api_view(['POST', ])
def registration_view(request):
    
    if request.method == 'POST':
        serializer = RegistrationSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data['response'] = "Usuário registrado com sucesso"
            data['email'] = account.email
            data['username'] = account.username
            token = Token.objects.get(user = account).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)

@swagger_auto_schema(
    method = 'post',
    operation_summary = "Logout", 
    operation_description = "Fazer o Logout",
    request_body = openapi.Schema(
        type = openapi.TYPE_OBJECT,
        required = ['token'],
        properties = 
        {
            'token' : openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
)
@api_view(['POST', ])
def logout_view(request):
     if request.method == "POST":
          request.user.auth_token.delete()
          return Response({"Message":"Logout feito com sucesso!"},status=status.HTTP_200_OK)
     

@api_view(['GET',])
@permission_classes((IsAuthenticated,))
def account_properties_view(request):
    try:
        account = request.user
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = AccountPropertiesSerializer(account)
        return Response(serializer.data)
    

@swagger_auto_schema(request_body = RegistrationSerializer, method = 'put')
@api_view(['PUT',])
@permission_classes((IsAuthenticated,))
def update_account_view(request):
    try:
        account = request.user
    except Account.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'PUT':
        serializer = AccountPropertiesSerializer(account, data=request.data)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['response'] = "Conta atuliazada com sucesso!"
            return Response(data=data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@swagger_auto_schema(
    method = 'post',
    operation_summary = "Deletar conta", 
    operation_description = "Deletar conta",
    request_body = openapi.Schema(
        type = openapi.TYPE_OBJECT,
        required = ['username','password'],
        properties = 
        {
            'username' : openapi.Schema(type=openapi.TYPE_STRING),
            'password' : openapi.Schema(type=openapi.TYPE_STRING),
        },
    ),
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def delete_account(request):
    serializer = AccountDeleteSerializer(data=request.data)
    if serializer.is_valid():
        user = request.user
        if user.check_password(serializer.validated_data['password']) and user.username == serializer.validated_data['username']:
            user.delete()
            return Response({'message': 'Conta deletada!'}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({'error': 'Senha ou usuario incorreto'}, status=status.HTTP_400_BAD_REQUEST)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ObtainAuthTokenView(APIView):
    authentication_classes = []
    permission_classes = []

    @swagger_auto_schema(
        operation_summary = "Login", 
        operation_description = "Fazer Login",
        request_body = openapi.Schema(
            type = openapi.TYPE_OBJECT,
            required = ['username','password'],
            properties = {
                'username' : openapi.Schema(type=openapi.TYPE_STRING),
                'password' : openapi.Schema(type=openapi.TYPE_STRING),
            },
        ),
    )

    def post(self, request):
        context = {}

        email = request.POST.get('username')
        password = request.POST.get('password')
        account = authenticate(email=email, password=password)
        if account:
            try:
                token = Token.objects.get(user=account)
            except Token.DoesNotExist:
                token = Token.objects.create(user=account)
                context['response'] = 'Autentificacao certa'
                context['pk'] = account.pk
                context['email'] = email
                context['token'] = token.key
            else:
                context['response'] = 'Error'
                context['error_message'] = 'Credenciais Invalidas'

        return Response(context)
     
    