from django.db import models
from django.utils.translation import gettext_lazy as _
from accounts.models import Account
from users.models import User


class Transaction(models.Model):

    class TxnTypes(models.TextChoices):
        DEBIT = 'DR', _('Debit')
        CREDIT = 'CR', _('Credit')
        CHECK = 'CH', _('Check')
        FEES = 'FE', _('Fees')
        REFUND = 'RF', _('Refund')

    txnRefNo = models.PositiveBigIntegerField()
    account = models.ForeignKey(Account, on_delete=models.DO_NOTHING)
    txnType = models.CharField(choices=TxnTypes.choices, default=TxnTypes.DEBIT, max_length=10)
    createdBy = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    txnDesc = models.CharField(max_length=255)
    creationDate = models.DateTimeField(auto_now_add=True)
