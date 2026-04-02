import { useState } from "react";
import { Search, Send, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import { sampleGrievances } from "@/data/mockData";

const statusIcon = {
  Submitted: <AlertCircle className="h-4 w-4 text-accent" />,
  "Under Review": <Clock className="h-4 w-4 text-secondary" />,
  Resolved: <CheckCircle2 className="h-4 w-4 text-green-600" />,
};

const Grievance = () => {
  const [tab, setTab] = useState("submit");
  const [ticketSearch, setTicketSearch] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const handleSubmitGrievance = (e: React.FormEvent) => {
    e.preventDefault();
    const id = `GRV-2026-${Math.floor(Math.random() * 900) + 100}`;
    setTicketId(id);
    setSubmitted(true);
  };

  const filteredGrievances = ticketSearch
    ? sampleGrievances.filter((g) => g.id.toLowerCase().includes(ticketSearch.toLowerCase()))
    : sampleGrievances;

  const totalG = sampleGrievances.length;
  const resolvedG = sampleGrievances.filter((g) => g.status === "Resolved").length;
  const pendingG = totalG - resolvedG;

  return (
    <Layout>
      <section className="gov-gradient text-primary-foreground py-10">
        <div className="container">
          <h1 className="text-3xl font-bold">Grievance Portal</h1>
          <p className="mt-2 opacity-80">Submit, track, and manage your grievances</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-3xl">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="submit">Submit</TabsTrigger>
              <TabsTrigger value="track">Track</TabsTrigger>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </TabsList>

            {/* Submit */}
            <TabsContent value="submit">
              {submitted ? (
                <Card className="mt-6">
                  <CardContent className="p-8 text-center">
                    <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 mb-4" />
                    <h2 className="text-xl font-bold">Grievance Submitted</h2>
                    <p className="text-muted-foreground mt-2">Your ticket ID is:</p>
                    <p className="text-2xl font-bold text-primary mt-1">{ticketId}</p>
                    <p className="text-sm text-muted-foreground mt-3">Save this ID to track your grievance status.</p>
                    <Button className="mt-4" onClick={() => { setSubmitted(false); }}>Submit Another</Button>
                  </CardContent>
                </Card>
              ) : (
                <Card className="mt-6">
                  <CardHeader><CardTitle>Submit a Grievance</CardTitle></CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmitGrievance} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <Label htmlFor="gName">Full Name *</Label>
                          <Input id="gName" placeholder="Your name" required />
                        </div>
                        <div>
                          <Label htmlFor="gPhone">Phone Number *</Label>
                          <Input id="gPhone" placeholder="+91 XXXXX XXXXX" required />
                        </div>
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Select>
                          <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="scholarship">Scholarship Issue</SelectItem>
                            <SelectItem value="loan">Loan Issue</SelectItem>
                            <SelectItem value="document">Document Verification</SelectItem>
                            <SelectItem value="payment">Payment Delay</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="gSubject">Subject *</Label>
                        <Input id="gSubject" placeholder="Brief subject of your grievance" required />
                      </div>
                      <div>
                        <Label htmlFor="gDesc">Description *</Label>
                        <Textarea id="gDesc" placeholder="Describe your issue in detail..." rows={4} required />
                      </div>
                      <Button type="submit" className="w-full gap-2"><Send className="h-4 w-4" /> Submit Grievance</Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Track */}
            <TabsContent value="track">
              <Card className="mt-6">
                <CardHeader><CardTitle>Track Grievance</CardTitle></CardHeader>
                <CardContent>
                  <div className="relative max-w-sm mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by ticket ID or phone..."
                      className="pl-10"
                      value={ticketSearch}
                      onChange={(e) => setTicketSearch(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    {filteredGrievances.length === 0 ? (
                      <p className="text-center py-8 text-muted-foreground">No grievances found.</p>
                    ) : (
                      filteredGrievances.map((g) => (
                        <div key={g.id} className="flex items-start justify-between border rounded-lg p-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-mono font-semibold">{g.id}</span>
                              <Badge variant="outline" className="text-xs flex items-center gap-1">
                                {statusIcon[g.status]} {g.status}
                              </Badge>
                            </div>
                            <p className="text-sm font-medium">{g.subject}</p>
                            <p className="text-xs text-muted-foreground mt-1">{g.date}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Dashboard */}
            <TabsContent value="dashboard">
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl font-bold text-primary">{totalG}</p>
                    <p className="text-sm text-muted-foreground mt-1">Total Grievances</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl font-bold text-green-600">{resolvedG}</p>
                    <p className="text-sm text-muted-foreground mt-1">Resolved</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-3xl font-bold text-secondary">{pendingG}</p>
                    <p className="text-sm text-muted-foreground mt-1">Pending</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader><CardTitle>All Grievances</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sampleGrievances.map((g) => (
                      <div key={g.id} className="flex items-start justify-between border rounded-lg p-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-mono font-semibold">{g.id}</span>
                            <Badge variant="outline" className="text-xs flex items-center gap-1">
                              {statusIcon[g.status]} {g.status}
                            </Badge>
                          </div>
                          <p className="text-sm">{g.subject}</p>
                          <p className="text-xs text-muted-foreground mt-1">{g.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Grievance;
