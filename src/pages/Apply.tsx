import { useState } from "react";
import { CheckCircle2, Upload, ArrowLeft, ArrowRight, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Layout from "@/components/layout/Layout";

const steps = ["Eligibility Check", "Personal Details", "Document Upload", "Review & Submit"];

const Apply = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    isCommunity: false, isIncome: false, isResident: false,
    fullName: "", aadhaar: "", phone: "", email: "", address: "", district: "", scheme: "",
    docs: [] as string[],
  });

  const updateForm = (field: string, value: any) => setForm((p) => ({ ...p, [field]: value }));

  const canProceed = () => {
    if (currentStep === 0) return form.isCommunity && form.isIncome && form.isResident;
    if (currentStep === 1) return form.fullName && form.aadhaar && form.phone && form.district;
    return true;
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container max-w-lg text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold">Application Submitted!</h1>
            <p className="mt-3 text-muted-foreground">Your application has been received successfully.</p>
            <Card className="mt-6">
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground">Your Application ID</p>
                <p className="text-2xl font-bold text-primary mt-1">TGCMFC-2026-{Math.floor(Math.random() * 90000) + 10000}</p>
                <p className="text-sm text-muted-foreground mt-3">Please save this ID for future reference and tracking.</p>
              </CardContent>
            </Card>
            <div className="mt-6 flex justify-center gap-3">
              <Button onClick={() => { setSubmitted(false); setCurrentStep(0); setForm({ isCommunity: false, isIncome: false, isResident: false, fullName: "", aadhaar: "", phone: "", email: "", address: "", district: "", scheme: "", docs: [] }); }}>
                New Application
              </Button>
              <Button variant="outline" onClick={() => window.location.href = "/grievance"}>
                Track Status
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="gov-gradient text-primary-foreground py-10">
        <div className="container">
          <h1 className="text-3xl font-bold">Apply for Scheme</h1>
          <p className="mt-2 opacity-80">Complete the application in 4 simple steps</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-2xl">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, i) => (
                <div key={step} className="flex items-center">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    i < currentStep ? "bg-green-600 text-primary-foreground" : i === currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {i < currentStep ? <CheckCircle2 className="h-5 w-5" /> : i + 1}
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`hidden sm:block h-0.5 w-12 md:w-20 lg:w-28 mx-1 ${i < currentStep ? "bg-green-600" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
            <p className="text-sm font-medium text-center mt-2">Step {currentStep + 1}: {steps[currentStep]}</p>
          </div>

          <Card>
            <CardContent className="p-6">
              {/* Step 0: Eligibility */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Eligibility Check</h2>
                  <p className="text-sm text-muted-foreground">Please confirm you meet the basic eligibility criteria.</p>
                  <div className="space-y-3 mt-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox checked={form.isCommunity} onCheckedChange={(c) => updateForm("isCommunity", c)} />
                      <span className="text-sm">I belong to the Christian minority community</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox checked={form.isIncome} onCheckedChange={(c) => updateForm("isIncome", c)} />
                      <span className="text-sm">My annual family income is within the eligible limit</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <Checkbox checked={form.isResident} onCheckedChange={(c) => updateForm("isResident", c)} />
                      <span className="text-sm">I am a resident of Telangana</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 1: Personal Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Personal Details</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" value={form.fullName} onChange={(e) => updateForm("fullName", e.target.value)} placeholder="Enter full name" />
                    </div>
                    <div>
                      <Label htmlFor="aadhaar">Aadhaar Number *</Label>
                      <Input id="aadhaar" value={form.aadhaar} onChange={(e) => updateForm("aadhaar", e.target.value)} placeholder="XXXX-XXXX-XXXX" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder="email@example.com" />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" value={form.address} onChange={(e) => updateForm("address", e.target.value)} placeholder="Full address" />
                    </div>
                    <div>
                      <Label>District *</Label>
                      <Select value={form.district} onValueChange={(v) => updateForm("district", v)}>
                        <SelectTrigger><SelectValue placeholder="Select district" /></SelectTrigger>
                        <SelectContent>
                          {["Hyderabad", "Rangareddy", "Medchal-Malkajgiri", "Warangal", "Karimnagar", "Khammam", "Nizamabad", "Adilabad", "Nalgonda", "Mahabubnagar"].map((d) => (
                            <SelectItem key={d} value={d}>{d}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Scheme</Label>
                      <Select value={form.scheme} onValueChange={(v) => updateForm("scheme", v)}>
                        <SelectTrigger><SelectValue placeholder="Select scheme" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="edu-scholarship">Education Scholarship</SelectItem>
                          <SelectItem value="housing-subsidy">Housing Subsidy</SelectItem>
                          <SelectItem value="skill-training">Skill Development</SelectItem>
                          <SelectItem value="micro-enterprise">Micro Enterprise Loan</SelectItem>
                          <SelectItem value="medical-aid">Medical Aid</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Document Upload */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Document Upload</h2>
                  <p className="text-sm text-muted-foreground">Upload the required documents in PDF or image format.</p>
                  {["Aadhaar Card", "Community Certificate", "Income Certificate", "Bank Passbook", "Passport Photo"].map((doc) => (
                    <div key={doc} className="flex items-center justify-between border rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{doc}</span>
                      </div>
                      <Button size="sm" variant="outline" className="gap-1">
                        <Upload className="h-3 w-3" /> Upload
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Review & Submit</h2>
                  <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
                    <p><strong>Name:</strong> {form.fullName || "—"}</p>
                    <p><strong>Aadhaar:</strong> {form.aadhaar || "—"}</p>
                    <p><strong>Phone:</strong> {form.phone || "—"}</p>
                    <p><strong>Email:</strong> {form.email || "—"}</p>
                    <p><strong>District:</strong> {form.district || "—"}</p>
                    <p><strong>Address:</strong> {form.address || "—"}</p>
                  </div>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <Checkbox />
                    <span className="text-sm">I declare that all the information provided is true and correct.</span>
                  </label>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-6 flex justify-between">
                <Button variant="outline" disabled={currentStep === 0} onClick={() => setCurrentStep((s) => s - 1)}>
                  <ArrowLeft className="mr-1 h-4 w-4" /> Previous
                </Button>
                {currentStep < steps.length - 1 ? (
                  <Button disabled={!canProceed()} onClick={() => setCurrentStep((s) => s + 1)}>
                    Next <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button onClick={handleSubmit}>Submit Application</Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Apply;
