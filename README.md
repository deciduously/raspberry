#Raspberry Dashboard#
I bought a raspberry pi, and want something fun, useful, and educational to run on it.  I wanted to learn Django.  I also needed a central spot to store other side projects.  So, this is a fun little Django project designed to run on my raspberry pi and serve as a central spot to store other side projects!  It will also provide a web frontend for the fileserver on the pi.
#### Target System ####

* [Raspberry Pi](https://www.raspberrypi.org/) 3 Model B V1.2
* [Arch Linux ARM](https://archlinuxarm.org/)
* [Nginx](http://nginx.org/en/) 1.8.1 - handling incoming requests and static content
* [Gunicorn](http://gunicorn.org/) 19.4
* [Django](https://www.djangoproject.com/) 1.9.4
* [PostgreSQL](http://www.postgresql.org/) 9.5.1

* * *

#Currently Included Projects#

## Dice ##

This is a quick and dirty implementation of **Pandemic: The Cure**, the dice-based version of the popular board game.

I am in this to learn me some Javascript/jQuery, *not* to infringe any IP, and only intend to use this personally.

It's a wonderful game and if you find this repo, you should do yourself a favor and go play it!

#### Currently used external libraries ####

* [jQuery](http://jquery.com/) 2.2.2
* [KnockoutJS](http://knockoutjs.com/) 3.4.0

#### TODO ####

* Finish basic functionality
* Design interface that doesn't make me cry myself to sleep
* Enable multiplayer, both hotseat and via internet
* Cry myself to sleep

* * *

#TODO#
* Think about project file struture
* Pretty start page
* Web interface to file server

## Eventually Look In To ##
* [Celery](http://docs.celeryproject.org/en/latest/index.html) for task management
* [Redis](http://redis.io/)
* [MongoDB](https://www.mongodb.org/) as a database replacement
* [http://munin-monitoring.org/](http://munin-monitoring.org/) for monitoring