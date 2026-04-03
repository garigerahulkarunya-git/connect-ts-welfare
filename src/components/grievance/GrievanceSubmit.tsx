import { useState } from "react";
import { Send, CheckCircle2, Upload, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { districts, schemes } from "@/data/mockData";

const grievanceTypes = ["Delayed Approval", "Documentation Issue", "Staff Behavior", "Technical Error"];

const GrievanceSubmit = () => {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [selectedType, setSelectedType] = useState("Delayed Approval");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `TG-2026-${Math.floor(Math.random() * 9000) + 1000}`;
    setTicketId(id);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="max-w-lg mx-auto mt-12">
        <CardContent className="p-10 text-center">
          <CheckCircle2 className="mx-auto h-14 w-14 text-green-600 mb-4" />
          <h2 className="text-2xl font-bold">Grievance Submitted</h2>
          <p className="text-muted-foreground mt-2">Your ticket ID is:</p>
          <p className="text-3xl font-bold text-primary mt-2 font-mono">{ticketId}</p>
          <p className="text-sm text-muted-foreground mt-3">Save this ID to track your grievance status.</p>
          <Button className="mt-6" onClick={() => setSubmitted(false)}>Submit Another</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex gap-6">
      {/* Main Form */}
      <div className="flex-1 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
            Grievance Redressal Portal
          </h1>
          <p className="text-muted-foreground mt-2">
            Submit and track your complaints easily. Your feedback helps us serve you better with institutional integrity.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">System Active</span>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Full Name</Label>
                  <Input placeholder="As per official records" className="mt-1.5" required />
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Mobile Number</Label>
                  <div className="relative mt-1.5">
                    <Input placeholder="+91 00000XXXXX" required />
                    <Badge className="absolute right-2 top-1/2 -translate-y-1/2 bg-green-100 text-green-700 text-[10px] hover:bg-green-100">
                      ✓ Verified
                    </Badge>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email Address</Label>
                <Input type="email" placeholder="example@domain.gov.in" className="mt-1.5" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Application Scheme</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select Scheme" /></SelectTrigger>
                    <SelectContent>
                      {schemes.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">District (33 Districts)</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5"><SelectValue placeholder="Select District" /></SelectTrigger>
                    <SelectContent>
                      {districts.map((d) => (
                        <SelectItem key={d.name} value={d.name}>{d.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Grievance Type</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {grievanceTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider border transition-colors ${
                        selectedType === type
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:bg-muted"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Detailed Description</Label>
                <Textarea
                  placeholder="Describe your grievance in detail. Please include application IDs or specific dates if applicable."
                  rows={5}
                  className="mt-1.5"
                  required
                />
              </div>

              <div>
                <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Supporting Documents (PDF/JPG)</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">Drag and drop files here</p>
                  <p className="text-xs text-muted-foreground mt-1">Max file size 5MB. Support for PDF, PNG, JPG.</p>
                </div>
              </div>

              <Button type="submit" className="w-full h-12 text-sm font-bold uppercase tracking-widest">
                <Send className="h-4 w-4 mr-2" /> Submit Grievance
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar Info */}
      <div className="hidden lg:flex flex-col gap-4 w-64 shrink-0">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-5">
            <h3 className="font-bold text-sm">Submission Guidelines</h3>
            <ul className="mt-3 space-y-3 text-xs opacity-90">
              <li className="flex gap-2"><span className="font-bold text-accent">01</span> Ensure your mobile number is verified for SMS updates.</li>
              <li className="flex gap-2"><span className="font-bold text-accent">02</span> Provide a clear description to ensure faster resolution.</li>
              <li className="flex gap-2"><span className="font-bold text-accent">03</span> Resolution period is typically 7-15 working days.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Our Commitment</h3>
            <div className="mt-3 space-y-3">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Response Time</p>
                  <p className="font-bold text-sm">48 Hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Resolution Rate</p>
                  <p className="font-bold text-sm">94.2%</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary text-primary-foreground overflow-hidden">
          <CardContent className="p-5">
            <p className="text-sm italic leading-relaxed">
              "Empowering citizens through transparent governance."
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GrievanceSubmit;
