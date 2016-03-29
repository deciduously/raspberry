from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^list/$', views.list, name='list'),
    url(r'^apps/(?P<app_id>[0-9]+)/$', views.detail, name='detail'),
    url(r'^resources/$', views.resources, name='resources')
]