"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, ArrowRight } from "lucide-react"

interface LoanPredictionResultProps {
  result: {
    approved: boolean
    probability: string
    suggestedInterestRate?: string
    message: string
  }
}

export function LoanPredictionResult({ result }: LoanPredictionResultProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Loan Eligibility Result</CardTitle>
          <Badge variant={result.approved ? "default" : "destructive"}>
            {result.approved ? "Approved" : "Not Approved"}
          </Badge>
        </div>
        <CardDescription>{result.message}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              {result.approved ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">Approval Status</span>
            </div>
            <span>{result.approved ? "Eligible" : "Not Eligible"}</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-blue-500" />
              <span className="font-medium">Confidence Score</span>
            </div>
            <span>{(Number.parseFloat(result.probability) * 100).toFixed(0)}%</span>
          </div>

          {result.approved && result.suggestedInterestRate && (
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span className="font-medium">Suggested Interest Rate</span>
              </div>
              <span>{result.suggestedInterestRate}%</span>
            </div>
          )}
        </div>

        <div className="bg-muted p-4 rounded-lg">
          <h3 className="font-medium mb-2">What does this mean?</h3>
          <p className="text-sm text-muted-foreground">
            {result.approved
              ? "Based on our AI model's analysis of your information, you are likely to be approved for a student loan. The suggested interest rate is an estimate based on your profile."
              : "Based on our AI model's analysis, you may face challenges getting approved for this loan. Consider improving your credit score, reducing the loan amount, or providing additional collateral."}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Start Over
        </Button>
        {result.approved && (
          <Button className="flex items-center gap-2">
            Continue Application <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

