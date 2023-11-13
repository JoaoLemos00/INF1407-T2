from rest_framework import serializers
import sys
import os
from django.conf import settings
from django.core.files.storage import default_storage
from django.core.files.storage import FileSystemStorage
from blog.models import BlogPost, CommentBlogPost

IMAGE_SIZE_MAX_BYTES = 1024 * 1024 * 2 # 2MB
MIN_TITLE_LENGTH = 5
MIN_BODY_LENGTH = 50

class BlogPostSerializer(serializers.ModelSerializer):

    username = serializers.SerializerMethodField('get_username_from_author')

    class Meta:
        model = BlogPost
        fields = ['pk','title','slug','body','image','date_updated','date_published','username']

    def get_username_from_author(self, blog_post):
        username = blog_post.author.username
        return username
    

class BlogPostCreateSerializer(serializers.ModelSerializer):


	class Meta:
		model = BlogPost
		fields = ['title', 'body', 'image', 'date_updated', 'author']


	def save(self):
		
		try:
			image = self.validated_data['image']
			title = self.validated_data['title']
			body = self.validated_data['body']
			
			
			blog_post = BlogPost(
								author=self.validated_data['author'],
								title=title,
								body=body,
								image=image,
								)

			url = os.path.join(settings.TEMP , str(image))
			storage = FileSystemStorage(location=url)

			with storage.open('', 'wb+') as destination:
				for chunk in image.chunks():
					destination.write(chunk)
				destination.close()


			os.remove(url)
			blog_post.save()
			
			return blog_post
		
		except KeyError:
			raise serializers.ValidationError({"response": "É Obrigatorio colocar uma imagem"}) 


class BlogPostUpdateSerializer(serializers.ModelSerializer):

	class Meta:
		model = BlogPost
		fields = ['title', 'body', 'image']

	def validate(self, blog_post):
		
		try:
			image = blog_post['image']
			url = os.path.join(settings.TEMP , str(image))
			storage = FileSystemStorage(location=url)

			with storage.open('', 'wb+') as destination:
				for chunk in image.chunks():
					destination.write(chunk)
				destination.close()

			os.remove(url)
			
		except KeyError:
			pass
		return blog_post
	
