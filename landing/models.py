from django.db import models

# Create your models here.
class App(models.Model):
	title = models.CharField(max_length=200)
	latest_version = models.IntegerField()
	synopsis = models.TextField(blank=True, null=True)
	start_date = models.DateTimeField('date initiated')
	last_update = models.DateTimeField('date updated')
	def __str__(self):
		return self.title