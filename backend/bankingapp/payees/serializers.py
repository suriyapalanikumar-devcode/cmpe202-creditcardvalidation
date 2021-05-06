from rest_framework import serializers
from .models import Payee


class PayeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payee
        fields = ('id', 'payeeName', 'payeeAccount', 'frequency', 'amount', 'lastPaymentDate', 'nextDueDate', 'account')
