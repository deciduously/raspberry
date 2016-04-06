from django.db import models

# Create your models here.

class Zone(models.Model):
	name=models.CharField(max_length=200)
	red=models.IntegerField()
	blue=models.IntegerField()
	black=models.IntegerField()
	yellow=models.IntegerField()
	def __str__(self):
		return self.name

	class Meta:
		abstract=True


class Continent(Zone):
	num=models.PositiveIntegerField(primary_key=True)

class Game(models.Model):
	EASY = 0
	NORMAL = 5
	HARD = 10
	DIFFICULTIES= (
		(EASY, 'Easy'),
		(NORMAL, 'Normal'),
		(HARD, 'Hard')
	)

	outbreaks=models.PositiveIntegerField(default=0)
	epidemicCount=models.PositiveIntegerField(default=NORMAL)

class Player(models.Model):
	name=models.CharField(max_length=200)
	role=models.CharField(max_length=50)
	def __str__(self):
		return self.name