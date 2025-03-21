# Student Loan Eligibility Predictor

A full-stack application that uses machine learning to predict student loan eligibility based on various factors such as credit score, income, education level, and more.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)

## 🔍 Overview

This application helps students determine their eligibility for loans by analyzing various financial and personal factors. The frontend collects user data through a form, sends it to the backend for processing by a machine learning model, and displays the prediction results to the user.

## ✨ Features

- User-friendly form for inputting personal and financial information
- Real-time credit score slider
- Machine learning model for loan eligibility prediction
- Detailed results page showing approval status, confidence score, and suggested interest rate
- Responsive design for mobile and desktop

## 🛠️ Technologies Used

### Frontend
- React
- TypeScript
- Tailwind CSS
- shadcn
- Sonner (for toast notifications)

### Backend
- Django
- Django REST Framework
- scikit-learn (for machine learning)
- pandas
- numpy

## 🚀 Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.10 or higher)
- pip (Python package manager)
- Git

### Clone the Repository
```bash
### Frontend
git clone https://github.com/davinyiringabo/student-loan-predictor.git
cd frontend
pnpm install && pnpm dev

### Backend
cd backend
pip install -r requirements.txt
python manage.py runserver
