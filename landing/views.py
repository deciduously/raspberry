from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

from .models import App

# Create your views here.
def index(request):
	return render(request, 'landing/index.html')

def list(request):
	return HttpResponse("These are all the things I have.")

def detail(request, app_id):
	app = App.objects.get(id=app_id)
	if app.title == 'dice' || app.title == 'Dice':
		return render(request, 'landing/dice.html')
	else:
		context = {'app_id': app_id}
		return render(request, 'landing/detail.html', context)

def resources(request):
	return HttpResponse("This is where I give credit where credit is due!")