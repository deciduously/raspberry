from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from django.core import serializers
from .models import Continent
# Create your views here.
def index(request):
	json_data = serializers.serialize("json",Continent.objects.all())
	context = {
	"json": json_data,
	}
	return render(request, 'dice/index.html', context)