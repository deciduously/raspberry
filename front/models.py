from django.db import models

# Create your models here.
class News(models.Model):
    title_text = models.CharField(max_length=200)
    body_text = models.TextField(blank=True, null=True)
    post_date = models.DateTimeField('date created')
    def __str__(self):
        return self.title_text

class Update(models.Model):
    title_text = models.CharField(max_length=200)
    body_text = models.TextField(blank=True, null=True)
    post_date = models.DateTimeField('date updated')
    def __str__(self):
        return self.title_text

