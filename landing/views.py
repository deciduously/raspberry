from django.shortcuts import get_object_or_404, render
from django.http import HttpResponse
from django.template import loader

from .models import App, Post

# Create your views here.
def index(request):
	posts = Post.objects.all()
	context = {'posts': posts}
	return render(request, 'landing/index.html')

def list(request):
	apps = App.objects.all()
	context = {'apps': apps}
	return render(request, 'landing/list.html', context)

def detail(request, app_id):
	app = get_object_or_404(App, pk=app_id)
	context = {'app_id': app_id, 'app': app}
	return render(request, 'landing/detail.html', context)

def resources(request):
	return HttpResponse("This is where I give credit where credit is due!")