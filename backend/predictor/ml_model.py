import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

class LoanPredictionModel:
    def __init__(self):
        # Define the model pipeline
        self.model = self._build_model()
        # Train the model with sample data
        self._train_model()
    
    def _build_model(self):
        # Define preprocessing for numerical features
        numerical_features = ['age', 'income', 'credit_score', 'loan_amount', 'loan_term']
        numerical_transformer = StandardScaler()
        
        # Define preprocessing for categorical features
        categorical_features = ['education', 'existing_loans']
        categorical_transformer = OneHotEncoder(handle_unknown='ignore')
        
        # Combine preprocessing steps
        preprocessor = ColumnTransformer(
            transformers=[
                ('num', numerical_transformer, numerical_features),
                ('cat', categorical_transformer, categorical_features)
            ])
        
        # Create and return the model pipeline
        model = Pipeline(steps=[
            ('preprocessor', preprocessor),
            ('classifier', RandomForestClassifier(n_estimators=100, random_state=42))
        ])
        
        return model
    
    def _train_model(self):
        # Generate synthetic training data
        np.random.seed(42)
        n_samples = 1000
        
        # Generate features
        age = np.random.randint(18, 65, n_samples)
        education = np.random.choice(['high_school', 'bachelors', 'masters', 'phd'], n_samples)
        income = np.random.normal(50000, 20000, n_samples)
        credit_score = np.random.randint(300, 850, n_samples)
        loan_amount = np.random.uniform(1000, 100000, n_samples)
        loan_term = np.random.choice([1, 3, 5, 10], n_samples)
        existing_loans = np.random.choice(['yes', 'no'], n_samples)
        
        # Create a rule-based target
        # Higher probability of approval with:
        # - Higher credit score
        # - Higher income
        # - Lower loan amount
        # - No existing loans
        probability = (
            0.4 * ((credit_score - 300) / 550) +  # Credit score contribution
            0.3 * np.minimum(income / 100000, 1) +  # Income contribution
            0.2 * (1 - np.minimum(loan_amount / 100000, 1)) +  # Loan amount contribution
            0.1 * (existing_loans == 'no')  # Existing loans contribution
        )
        
        # Add some noise
        probability = np.clip(probability + np.random.normal(0, 0.1, n_samples), 0, 1)
        approved = probability > 0.5
        
        # Create DataFrame
        data = pd.DataFrame({
            'age': age,
            'education': education,
            'income': income,
            'credit_score': credit_score,
            'loan_amount': loan_amount,
            'loan_term': loan_term,
            'existing_loans': existing_loans,
            'approved': approved
        })
        
        # Train the model
        X = data.drop('approved', axis=1)
        y = data['approved']
        self.model.fit(X, y)
    
    def predict(self, features):
        # Convert input features to DataFrame
        input_df = pd.DataFrame([features])
        
        # Make prediction
        probability = self.model.predict_proba(input_df)[0, 1]
        approved = probability > 0.5
        
        # Calculate suggested interest rate based on risk factors
        base_rate = 3.0
        risk_premium = 0
        
        if features['credit_score'] < 650:
            risk_premium += 2.0
        elif features['credit_score'] < 750:
            risk_premium += 1.0
            
        if features['income'] < 30000:
            risk_premium += 1.5
        elif features['income'] < 60000:
            risk_premium += 0.75
            
        if features['existing_loans'] == 'yes':
            risk_premium += 0.5
            
        if int(features['loan_term']) > 5:
            risk_premium += 0.25
            
        suggested_interest_rate = base_rate + risk_premium
        
        return {
            'approved': approved,
            'probability': float(probability),
            'suggested_interest_rate': suggested_interest_rate if approved else None
        }

# Create a singleton instance
loan_model = LoanPredictionModel()