from .models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        allow_null=True,
        required=False,
        style={'input_type': 'password', 'placeholder': 'Password'}
    )
    email = serializers.EmailField(required=False, allow_null=True,
                                   validators=[UniqueValidator(queryset=User.objects.all(),
                                                               message='Email id should be unique!')])
    first_name = serializers.CharField(required=False, allow_null=True)
    last_name = serializers.CharField(required=False, allow_null=True)
    ssn = serializers.CharField(required=False, allow_null=True)
    mobile = serializers.CharField(required=False, allow_null=True)

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'password',
            'first_name',
            'last_name',
            'role',
            'ssn',
            'mobile'
        )

    def create(self, validated_data):
        print(validated_data)
        auth_user = User.objects.create_user(**validated_data)
        print(auth_user)
        return auth_user



class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)
    token = serializers.CharField(read_only=True)
    # refresh = serializers.CharField(read_only=True)
    role = serializers.CharField(read_only=True)

    def create(self, validated_date):
        pass

    def update(self, instance, validated_data):
        pass

    def validate(self, data):
        email = data['email']
        password = data['password']
        user = authenticate(email=email, password=password)

        if user is None:
            raise serializers.ValidationError("Invalid login credentials")

        try:
            # refresh = RefreshToken.for_user(user)
            # refresh_token = str(refresh)
            # access_token = str(refresh.access_token)
            token, _ = Token.objects.get_or_create(user=user)
            print(token.key)
            print(_)

            #update_last_login(None, user)

            validation = {
                'token': token.key,
                'email': user.email,
                'role': user.role,
            }

            return validation
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid login credentials")

class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'email',
            'role'
        )