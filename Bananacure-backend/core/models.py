from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('Standard User', 'Standard User'),
        ('Administrator', 'Administrator'),
    )
    
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default='Standard User')

    def __str__(self):
        return f"{self.username} - {self.role}"