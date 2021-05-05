from rest_framework import serializers
from .models import Transaction


class TransactionSerializer(serializers.ModelSerializer):
    creationDate = serializers.DateTimeField(read_only=True)
    txnRefNo = serializers.IntegerField(read_only=True, allow_null=True)

    class Meta:
        model = Transaction
        fields = ('account', 'creationDate', 'txnType', 'amount', 'txnRefNo', 'txnDesc')
