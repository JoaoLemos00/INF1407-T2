from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.generics import ListAPIView
from rest_framework.authentication import TokenAuthentication

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from account.models import Account
from blog.models import BlogPost
from blog.serializers import BlogPostSerializer, BlogPostUpdateSerializer, BlogPostCreateSerializer

@swagger_auto_schema(
    method = 'get',
    operation_summary = "Deltalhes Post", 
    operation_description = "Detalhes de um post",
    request_body = openapi.Schema(
        type = openapi.TYPE_OBJECT,
        required = ['title','body','image'],
        properties = 
        {
            'title' : openapi.Schema(type=openapi.TYPE_STRING),
            'body' : openapi.Schema(type=openapi.TYPE_STRING),
            'image' : openapi.Schema(type=openapi.TYPE_FILE),
        },
    ),
)
@api_view(['GET', ])
@permission_classes((IsAuthenticated,))
def api_detail_blog_view(request,slug):

    try:
        blog_post = BlogPost.objects.get(slug=slug)
    except BlogPost.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == "GET":
        serializer = BlogPostSerializer(blog_post)
        return Response(serializer.data)
    
@swagger_auto_schema(
    method = 'put',
    operation_summary = "Atualizar Post", 
    operation_description = "Atualizar um post",
    request_body = openapi.Schema(
        type = openapi.TYPE_OBJECT,
        required = ['title','body','image'],
        properties = 
        {
            'title' : openapi.Schema(type=openapi.TYPE_STRING),
            'body' : openapi.Schema(type=openapi.TYPE_STRING),
            'image' : openapi.Schema(type=openapi.TYPE_FILE),
        },
    ),
)
@api_view(['PUT', ])
@permission_classes((IsAuthenticated,))
def api_update_blog_view(request,slug):

    try:
        blog_post = BlogPost.objects.get(slug=slug)
    except BlogPost.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    user = request.user
    if blog_post.author != user:
        return Response({'response':'Você não tem permissao para editar esse post'})
    
    if request.method == 'PUT':
        serializer = BlogPostUpdateSerializer(blog_post, data=request.data, partial=True)
        data = {}
        if serializer.is_valid():
            serializer.save()
            data['response'] = "POST atualizado com sucesso!"
            data['pk'] = blog_post.pk
            data['title'] = blog_post.title
            data['body'] = blog_post.body
            data['slug'] = blog_post.slug
            data['date_updated'] = blog_post.date_updated
            image_url = str(request.build_absolute_uri(blog_post.image.url))
            data['image'] = image_url
            data['username'] = blog_post.author.username
            return Response(data=data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['DELETE', ])
@permission_classes((IsAuthenticated,))
def api_delete_blog_view(request,slug):

    try:
        blog_post = BlogPost.objects.get(slug=slug)
    except BlogPost.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    user = request.user
    if blog_post.author != user:
        return Response({'response':'Você não tem permissao para excluir esse post'})
    
    if request.method == "DELETE":
        operation = blog_post.delete()
        data = {}
        
        if operation:
            data["success"] = "Post excluído com sucesso!"
        else:
            data["failure"] = "Post não foi excluído!"
        
        return Response(data=data)
    
@swagger_auto_schema(
    method = 'post',
    operation_summary = "Criar Post", 
    operation_description = "Fazer um post",
    request_body = openapi.Schema(
        type = openapi.TYPE_OBJECT,
        required = ['title','body','image'],
        properties = 
        {
            'title' : openapi.Schema(type=openapi.TYPE_STRING),
            'body' : openapi.Schema(type=openapi.TYPE_STRING),
            'image' : openapi.Schema(type=openapi.TYPE_FILE),
        },
    ),
)
@api_view(['POST', ])
@permission_classes((IsAuthenticated,))
def api_create_blog_view(request):

    if request.method == 'POST':

        data = request.data
        data['author'] = request.user.pk
        serializer = BlogPostCreateSerializer(data=data)

        data = {}
        if serializer.is_valid():
            blog_post = serializer.save()
            data['response'] = 'POST Criado com sucesso!'
            data['pk'] = blog_post.pk
            data['title'] = blog_post.title
            data['body'] = blog_post.body
            data['slug'] = blog_post.slug
            data['date_updated'] = blog_post.date_updated
            image_url = str(request.build_absolute_uri(blog_post.image.url))
            data['image'] = image_url
            data['username'] = blog_post.author.username
            return Response(data=data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ApiBlogListView(ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    #authentication_classes = [TokenAuthentication,]
    #permission_classes = [IsAuthenticated,]
    pagination_class = PageNumberPagination


