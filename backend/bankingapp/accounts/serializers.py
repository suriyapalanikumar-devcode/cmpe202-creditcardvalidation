from rest_framework import serializers
from .models import Account
from users.serializers import UserRegistrationSerializer


class AccountSerializer(serializers.ModelSerializer):
    user = UserRegistrationSerializer()

    class Meta:
        model = Account
        fields = ('accountNumber', 'accountType', 'user', 'balance')

