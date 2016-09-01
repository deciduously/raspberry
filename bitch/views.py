from django.shortcuts import render
from twilio import twiml
from django_twilio.decorators import twilio_view

# Create your views here.
from django.http import HttpResponse


def index(request):
    return HttpResponse("The bitch is rebuilding, be patient...")

@twilio_view
def reply_to_sms_messages(request):
    r = twiml.Response()
    r.message('Thanks for the SMS message!')
    return r