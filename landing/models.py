from django.db import models

# Create your models here.
class App(models.Model):
	title = models.CharField(max_length=200)
	latest_version = models.IntegerField()
	synopsis = models.TextField(blank=True, null=True)
	start_date = models.DateTimeField('date initiated')
	last_update = models.DateTimeField('date updated')
	page = models.CharField(max_length=200, blank=True, null=True)
	def __str__(self):
		return self.title

class Post(models.Model):
    title_text = models.CharField(max_length=200)
    body_text = models.TextField(blank=True, null=True)
    post_date = models.DateTimeField('date created')
    def __str__(self):
        return self.title_text

class Comment(models.Model):
    title_text = models.CharField(max_length=200)
    body_text = models.TextField(blank=True, null=True)
    post_date = models.DateTimeField('date updated')
    def __str__(self):
        return self.title_text