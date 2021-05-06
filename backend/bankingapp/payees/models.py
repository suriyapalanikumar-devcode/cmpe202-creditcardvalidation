from django.db import models
from accounts.models import Account
from users.models import User


class Payee(models.Model):

    payeeName = models.CharField(max_length=255)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    payeeAccount = models.PositiveBigIntegerField()
    frequency_types = [('Monthly', 'Monthly'), ('Weekly', 'Weekly'), ('Yearly', 'Yearly'), ('Once', 'Once')]
    frequency = models.CharField(choices=frequency_types, default='Once', max_length=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    registrationDate = models.DateField(auto_now_add=True)
    nextDueDate = models.DateField(null=True)
    lastPaymentDate = models.DateField(null=True)
