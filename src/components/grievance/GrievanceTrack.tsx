import { useState } from "react";
import { Search, CheckCircle2, Clock, AlertCircle, FileText, Copy, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sampleGrievances } from "@/data/mockData";
import type { GrievanceTicket } from "@/data/mockData";

const GrievanceTrack = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [trackedTicket, setTrackedTicket] = useState<GrievanceTicket | null>(null);

  const handleTrack = () => {
    const found = sampleGrievances.find((g) =>
      g.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setTrackedTicket(found || null);
  };

  const selectRecent = (id: string) => {
    setSearchQuery(id);
    const found = sampleGrievances.find((g) => g.id === id);
    setTrackedTicket(found || null);
  };

  const statusSteps = ["Submitted", "Under Review", "Resolved"] as const;

  const stepLabelMap: Record<string, string> = {
    "Submitted": "Submitted",
    "Under Review": "Under Review",
    "Resolved": "Resolved"
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-black text-foreground italic leading-tight">
          Grievance Redressal Portal
        </h1>
        <p className="text-sm font-semibold uppercase tracking-widest text-primary mt-1">
          Track & Monitor Real-Time Progress
        </p>
      </div>

      <div className="flex gap-6">
        {/* Left: Search + Status */}
        <div className="flex-1 max-w-2xl space-y-6">
          {/* Search Card */}
          <Card>
            <CardContent className="p-6">
              <h2 className="font-bold text-lg mb-1">Locate Your Request</h2>
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Ticket ID or Mobile Number
              </Label>
              <div className="flex gap-2 mt-2">
                <Input
                  placeholder="e.g. TG-2026-9912"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  className="flex-1"
                />
                <Button onClick={handleTrack} className="gap-2">
                  <Search className="h-4 w-4" /> Track
                </Button>
              </div>
              <div className="flex gap-2 mt-3">
                {sampleGrievances.slice(0, 2).map((g) => (
                  <button
                    key={g.id}
                    onClick={() => selectRecent(g.id)}
                    className="text-xs px-3 py-1.5 rounded-full border font-medium hover:bg-muted transition-colors"
                  >
                    Recent: {g.id}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Status Analysis */}
          {trackedTicket && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <span className="w-8 h-px bg-primary inline-block" />
                  Current Status Analysis
                </h3>
                <button
                  onClick={() => navigator.clipboard.writeText(trackedTicket.id)}
                  className="text-xs text-muted-foreground flex items-center gap-1 hover:text-foreground"
                >
                  <Copy className="h-3 w-3" /> Copy Ticket ID: {trackedTicket.id}
                </button>
              </div>

              <Card>
                <CardContent className="p-6">
                  {/* Progress Steps */}
                  <div className="flex items-center justify-between mb-8 px-4">
                    {statusSteps.map((step, i) => {
                      const currentIdx = statusSteps.indexOf(trackedTicket.status);
                      const isComplete = i < currentIdx;
                      const isCurrent = i === currentIdx;
                      const isFuture = i > currentIdx;

                      return (
                        <div key={step} className="flex flex-col items-center text-center flex-1">
                          <div className={`h-10 w-10 rounded-full flex items-center justify-center mb-2 ${
                            isComplete ? "bg-green-100" : isCurrent ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}>
                            {isComplete ? <CheckCircle2 className="h-5 w-5 text-green-600" /> :
                             isCurrent ? <Clock className="h-5 w-5" /> :
                             <AlertCircle className="h-5 w-5 text-muted-foreground/40" />}
                          </div>
                          <span className={`text-xs font-bold uppercase tracking-wider ${
                            isCurrent ? "text-primary" : isFuture ? "text-muted-foreground/40" : "text-foreground"
                          }`}>{stepLabelMap[step]}</span>
                          {isCurrent && (
                            <span className="text-[10px] text-primary font-semibold mt-0.5">Current Phase</span>
                          )}
                          {isComplete && (
                            <span className="text-[10px] text-muted-foreground mt-0.5">{trackedTicket.date}</span>
                          )}
                          {isFuture && (
                            <span className="text-[10px] text-muted-foreground/40 mt-0.5">Est. 48h</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Timeline Update */}
                  {trackedTicket.timelineUpdate && (
                    <div className="border-t pt-5">
                      <div className="flex items-start gap-3">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider text-primary">Timeline Update</p>
                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            "{trackedTicket.timelineUpdate}"
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-2">
                            {trackedTicket.timelineTime} • Automated System Notification
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>

        {/* Right Info Cards */}
        <div className="hidden lg:flex flex-col gap-4 w-72 shrink-0">
          {/* SLA Card */}
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-5">
              <h3 className="font-bold text-sm">Institutional SLAs</h3>
              <p className="text-xs opacity-80 mt-2 leading-relaxed">
                Our commitment to transparency ensures a maximum response time of 72 working hours for all institutional grievances.
              </p>
              <p className="text-4xl font-black mt-4">98.4%</p>
              <p className="text-[10px] uppercase tracking-widest opacity-70 mt-1">Resolution Rate 2025</p>
            </CardContent>
          </Card>

          {/* Assignment Detail */}
          {trackedTicket && (
            <>
              <Card>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Assignment Detail</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Institutional Custodian</p>
                    </div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Officer Assigned</span>
                      <span className="font-semibold text-primary">{trackedTicket.officerAssigned}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Department</span>
                      <span className="font-semibold">{trackedTicket.department}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span className="text-muted-foreground">Filing Date</span>
                      <span className="font-semibold">{trackedTicket.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Priority Status</span>
                      <Badge variant={trackedTicket.priority === "HIGH PRIORITY" ? "destructive" : "secondary"} className="text-[10px]">
                        {trackedTicket.priority}
                      </Badge>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 text-xs font-bold uppercase tracking-wider">
                    <Phone className="h-3 w-3 mr-2" /> Request Callback
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Supporting Documents</p>
                  <div className="flex items-center gap-2 mt-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs">Grievance_Application_Final.pdf</span>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GrievanceTrack;
