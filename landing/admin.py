from django.contrib import admin

# Register your models here.

from .models import App, Comment, Post

admin.site.register(App)
admin.site.register(Comment)
admin.site.register(Post)