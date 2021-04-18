from django.db import models
from users.models import User


class Account(models.Model):
    accountNumber = models.AutoField(primary_key=True)
    account_types = [('Savings', 'Savings'), ('Checking', 'Checking')]
    accountType = models.CharField(choices=account_types, default='Savings', max_length=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=12, decimal_places=2)
    isActive = models.CharField(max_length=1, default='Y')
