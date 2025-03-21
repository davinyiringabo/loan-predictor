/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/sonner"
// import { useToast } from "@/hooks/use-toast"
import { LoanPredictionResult } from "@/components/loan-prediction-results"
import { toast } from "sonner"

export default function Home() {
  // const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    education: "",
    income: 0,
    creditScore: 0,
    loanAmount: 0,
    loanTerm: "",
    existingLoans: "",
  })
  const [predictionResult, setPredictionResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (field: any, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Django backend
      const response = await fetch("http://localhost:8000/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Failed to get prediction")
      }

      const data = await response.json()
      setPredictionResult(data)
      setIsLoading(false)
    } catch {
      toast.error("Failed to get prediction. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8">Student Loan Eligibility Predictor</h1>

        <Tabs defaultValue="application" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="application">Loan Application</TabsTrigger>
            <TabsTrigger value="results" disabled={!predictionResult}>
              Results
            </TabsTrigger>
          </TabsList>

          <TabsContent value="application">
            <Card>
              <CardHeader>
                <CardTitle>Student Loan Application</CardTitle>
                <CardDescription>Fill out the form below to check your eligibility for a student loan.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="21"
                        min="18"
                        max="65"
                        value={formData.age}
                        onChange={(e) => handleChange("age", e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="education">Education Level</Label>
                      <Select onValueChange={(value) => handleChange("education", value)} required>
                        <SelectTrigger id="education">
                          <SelectValue placeholder="Select education level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high_school">High School</SelectItem>
                          <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                          <SelectItem value="masters">Master's Degree</SelectItem>
                          <SelectItem value="phd">PhD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="income">Annual Income ($)</Label>
                      <Input
                        id="income"
                        type="number"
                        placeholder="30000"
                        min="0"
                        value={formData.income}
                        onChange={(e) => handleChange("income", Number.parseInt(e.target.value))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="creditScore">Credit Score (300-850)</Label>
                      <div className="pt-6">
                        <Slider
                          id="creditScore"
                          min={300}
                          max={850}
                          step={1}
                          value={[formData.creditScore || 300]}
                          onValueChange={(value) => handleChange("creditScore", value[0])}
                        />
                        <div className="mt-2 text-center">{formData.creditScore || 300}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanAmount">Loan Amount ($)</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        placeholder="10000"
                        min="1000"
                        max="100000"
                        value={formData.loanAmount}
                        onChange={(e) => handleChange("loanAmount", Number.parseInt(e.target.value))}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="loanTerm">Loan Term</Label>
                      <Select onValueChange={(value) => handleChange("loanTerm", value)} required>
                        <SelectTrigger id="loanTerm">
                          <SelectValue placeholder="Select loan term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Year</SelectItem>
                          <SelectItem value="3">3 Years</SelectItem>
                          <SelectItem value="5">5 Years</SelectItem>
                          <SelectItem value="10">10 Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="existingLoans">Existing Loans</Label>
                      <Select onValueChange={(value) => handleChange("existingLoans", value)} required>
                        <SelectTrigger id="existingLoans">
                          <SelectValue placeholder="Do you have existing loans?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Check Eligibility"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            {predictionResult && <LoanPredictionResult result={predictionResult} />}
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </main>
  )
}

