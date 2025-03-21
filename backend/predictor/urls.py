from django.urls import path
from .views import PredictLoanView, LoanApplicationListView

urlpatterns = [
    path('predict/', PredictLoanView.as_view(), name='predict'),
    path('applications/', LoanApplicationListView.as_view(), name='applications'),
]