from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import PredictionRequestSerializer, PredictionResponseSerializer, LoanApplicationSerializer
from .models import LoanApplication
from .ml_model import loan_model

class PredictLoanView(APIView):
    def post(self, request):
        # Validate input data
        serializer = PredictionRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Extract validated data
        data = serializer.validated_data
        
        # Feature Engineering
        features = {
            'age': int(data['age']),
            'education': data['education'],
            'income': float(data['income']),
            'credit_score': int(data['creditScore']),
            'loan_amount': float(data['loanAmount']),
            'loan_term': int(data['loanTerm']),
            'existing_loans': data['existingLoans']
        }
        
        # Get prediction from model
        prediction = loan_model.predict(features)
        
        # Save application to database
        loan_application = LoanApplication(
            name=data['name'],
            email=data['email'],
            age=features['age'],
            education=features['education'],
            income=features['income'],
            credit_score=features['credit_score'],
            loan_amount=features['loan_amount'],
            loan_term=features['loan_term'],
            existing_loans=features['existing_loans'],
            approved=prediction['approved'],
            probability=prediction['probability']
        )
        loan_application.save()
        
        # Prepare response
        response_data = {
            'approved': prediction['approved'],
            'probability': str(prediction['probability']),
            'message': 'Based on the provided information, we\'ve made a prediction on your loan eligibility.'
        }
        
        if prediction['approved'] and prediction['suggested_interest_rate'] is not None:
            response_data['suggestedInterestRate'] = str(prediction['suggested_interest_rate'])
        
        response_serializer = PredictionResponseSerializer(data=response_data)
        if response_serializer.is_valid():
            return Response(response_serializer.validated_data, status=status.HTTP_200_OK)
        else:
            return Response(response_serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LoanApplicationListView(APIView):
    def get(self, request):
        applications = LoanApplication.objects.all().order_by('-created_at')
        serializer = LoanApplicationSerializer(applications, many=True)
        return Response(serializer.data)