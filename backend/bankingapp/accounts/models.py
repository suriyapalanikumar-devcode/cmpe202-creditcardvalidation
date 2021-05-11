from django.db import models
from users.models import User
import uuid
from django_random_id_model import RandomIDModel

class Account(models.Model):
    accountNumber = models.AutoField(primary_key=True)
    # accountNumber = models.UUIDField(
    #      primary_key = True,
    #      default = uuid.uuid4,
    #      editable = False)
    account_types = [('Savings', 'Savings'), ('Checking', 'Checking')]
    accountType = models.CharField(choices=account_types, default='Savings', max_length=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=12, decimal_places=2)
    isActive = models.CharField(max_length=1, default='Y')
