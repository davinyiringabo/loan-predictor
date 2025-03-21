from rest_framework import serializers
from .models import LoanApplication

class LoanApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = LoanApplication
        fields = '__all__'
        read_only_fields = ['approved', 'probability', 'created_at']

class PredictionRequestSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    age = serializers.IntegerField(min_value=18, max_value=65)
    education = serializers.CharField(max_length=20)
    income = serializers.FloatField(min_value=0)
    creditScore = serializers.IntegerField(min_value=300, max_value=850)
    loanAmount = serializers.FloatField(min_value=1000)
    loanTerm = serializers.CharField(max_length=5)
    existingLoans = serializers.CharField(max_length=3)

class PredictionResponseSerializer(serializers.Serializer):
    approved = serializers.BooleanField()
    probability = serializers.FloatField()
    suggestedInterestRate = serializers.FloatField(required=False)
    message = serializers.CharField()