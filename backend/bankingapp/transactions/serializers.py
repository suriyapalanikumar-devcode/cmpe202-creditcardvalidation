from rest_framework import serializers
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    creationDate = serializers.DateTimeField(read_only=True)
    txnRefNo = serializers.IntegerField(read_only=True, allow_null=True)
    balance = serializers.DecimalField(read_only=True, allow_null=True, max_digits=12, decimal_places=2)

    class Meta:
        model = Transaction
        fields = ('account', 'creationDate', 'txnType', 'amount', 'balance', 'txnRefNo', 'txnDesc')
