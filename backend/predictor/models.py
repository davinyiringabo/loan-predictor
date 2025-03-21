from django.db import models

class LoanApplication(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    age = models.IntegerField()
    education = models.CharField(max_length=20)
    income = models.FloatField()
    credit_score = models.IntegerField()
    loan_amount = models.FloatField()
    loan_term = models.IntegerField()
    existing_loans = models.CharField(max_length=3)
    approved = models.BooleanField(null=True, blank=True)
    probability = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - ${self.loan_amount}"