from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from .models import Payee


class PayeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Payee
        fields = ('id', 'payeeName', 'payeeAccount', 'frequency', 'amount', 'lastPaymentDate', 'nextDueDate', 'account')
        validators = [
            UniqueTogetherValidator(
                queryset=Payee.objects.all(),
                fields=['payeeName', 'user'],
                message='Please enter a unique payee name'
            )
        ]