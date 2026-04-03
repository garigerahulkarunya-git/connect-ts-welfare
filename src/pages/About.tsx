import { useState } from "react";
import { Target, Eye, Users, Building, CheckCircle, MapPin, ArrowRight, ExternalLink, FileText, Download, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Layout from "@/components/layout/Layout";
import { officials } from "@/data/mockData";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="container py-10 md:py-16">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Home &gt; About</p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">About TGCMFC</h1>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
            Empowering minority communities through strategic financial support, education, and institutional welfare.
          </p>
        </div>
      </section>

      {/* Sovereign Mandate */}
      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-bold mb-4">Sovereign Mandate</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                The Telangana Christian Minorities Finance Corporation was established with a clear vision to act as a bridge between the state's resources and the Christian minority population.
              </p>
              <ul className="space-y-3">
                {[
                  "Implementation of socio-economic development schemes.",
                  "Provision of educational loans and merit scholarships.",
                  "Support for self-employment through bank-linked subsidies.",
                  "Skill development training for minority youth.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="rounded-xl overflow-hidden bg-muted h-56 md:h-72 flex items-center justify-center">
                <div className="text-center">
                  <Building className="h-16 w-16 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">TGCMFC Building</p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-center">
                <p className="text-lg font-bold">ESTD.</p>
                <p className="text-xs">State Mandated Authority</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-primary bg-primary/5 shadow-none">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold">Our Vision</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  To foster an inclusive society where the Christian minority has equal access to educational and economic opportunities, ensuring dignity and sustainable growth for every citizen.
                </p>
                <button className="text-xs text-primary font-semibold uppercase tracking-wider hover:underline">
                  Governing Objectives →
                </button>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary bg-secondary/5 shadow-none">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-secondary" />
                  <h3 className="text-xl font-bold">Our Mission</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  To uplift and empower communities through welfare programs, financial subsidies for livelihoods, and high-impact educational scholarship programs across all 33 districts.
                </p>
                <button className="text-xs text-secondary font-semibold uppercase tracking-wider hover:underline">
                  Operational Strategy →
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Board of Trustees */}
      <section className="section-padding">
        <div className="container text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Executive Stewardship</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-10">Board of Trustees</h2>
          <div className="grid gap-8 sm:grid-cols-3 max-w-3xl mx-auto">
            {[
              { name: "Sri. John Doe", title: "Chairman" },
              { name: "Smt. Sarah Smith", title: "Managing Director, IAS" },
              { name: "Sri. Rajesh Kumar", title: "Chief Accounts Officer" },
            ].map((person) => (
              <div key={person.name} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-3xl font-bold text-muted-foreground mb-4 border-4 border-background shadow-md">
                  {person.name.charAt(5) || person.name.charAt(0)}
                </div>
                <h3 className="font-bold text-sm">{person.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{person.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Administrative Hierarchy */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Administrative Hierarchy</h2>
          <p className="text-sm text-muted-foreground mb-10">The formal structure of command and compliance</p>

          <div className="flex flex-col items-center space-y-4">
            <div className="gov-gradient text-primary-foreground px-8 py-3 rounded-full font-semibold text-sm">
              Government of Telangana
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="border border-border px-6 py-2.5 rounded-full text-sm font-medium bg-background">
              Minority Welfare Department
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="border-2 border-primary px-6 py-2.5 rounded-full text-sm font-semibold text-primary bg-background">
              TGCMFC Board
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-wrap justify-center gap-3">
              {["District Minority Welfare Officers", "Admin & Accounting Wing", "Information & Communication"].map((role) => (
                <div key={role} className="border border-border px-4 py-2 rounded-full text-xs font-medium bg-background">
                  {role}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quantifiable Social Progress */}
      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                Quantifiable<br />Social Progress
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                Our reach spans across the entire landscape of Telangana, touching lives in every administrative block.
              </p>
              <Button className="gap-2 rounded-full">
                View Detailed Annual Statistics <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center shadow-none">
                <CardContent className="p-6">
                  <p className="text-4xl font-extrabold text-foreground">33</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Districts Covered</p>
                  <p className="text-xs text-muted-foreground mt-2">Full administrative coverage across Telangana</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-none">
                <CardContent className="p-6">
                  <p className="text-4xl font-extrabold text-foreground">85k+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Beneficiaries</p>
                  <p className="text-xs text-muted-foreground mt-2">Empowered through welfare programs</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Citizen's Charter */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-4xl">
          <Card className="border-t-4 border-t-primary shadow-none">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-bold mb-1">Citizen's Charter</h2>
              <p className="text-xs text-muted-foreground mb-6">Our commitment to time-based service delivery.</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs uppercase tracking-wider">Service Type</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider">Resolution Time</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider">Designated Officer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-sm">Loan Application Processing</TableCell>
                    <TableCell className="text-sm">15 Working Days</TableCell>
                    <TableCell className="text-sm">Managing Director</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-sm">Grievance Redressal</TableCell>
                    <TableCell className="text-sm">7 Working Days</TableCell>
                    <TableCell className="text-sm">Public Relations Officer</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-sm">Scholarship Verification</TableCell>
                    <TableCell className="text-sm">10 Working Days</TableCell>
                    <TableCell className="text-sm">Accounts Section</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Transparency Archive + RTI */}
      <section className="section-padding">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Transparency Archive</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {[
                { title: "Annual Report 2025-26", icon: "📄" },
                { title: "Policy Framework", icon: "📋" },
                { title: "Budget Allocation", icon: "💰" },
                { title: "Audit Reports", icon: "📊" },
              ].map((doc) => (
                <Card key={doc.title} className="cursor-pointer hover:shadow-md transition-shadow shadow-none">
                  <CardContent className="p-4 flex items-center gap-3">
                    <span className="text-2xl">{doc.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{doc.title}</p>
                      <p className="text-xs text-muted-foreground">PDF Download</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-muted/50 shadow-none">
              <CardContent className="p-5">
                <Badge variant="outline" className="mb-3 text-xs">RTI Section</Badge>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  Public information under Right to Information Act 2005. Address correspondence to:
                </p>
                <p className="text-xs font-semibold mb-1">Sri. S. Prabhakar</p>
                <p className="text-xs text-muted-foreground">Public Information Officer</p>
                <p className="text-xs text-primary mt-2">rti@tgcmfc.gov.in</p>
                <Button variant="outline" size="sm" className="mt-4 w-full text-xs gap-1">
                  <ExternalLink className="h-3 w-3" /> Access RTI Documents
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Moments of Impact (Gallery) */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Moments of Impact</h2>
              <p className="text-sm text-muted-foreground">Visual journey of our welfare initiatives across Telangana</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary gap-1">
              View Gallery <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl bg-muted h-40 md:h-48 flex items-center justify-center">
                <span className="text-3xl">🖼️</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <Card className="bg-muted/30 shadow-none">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-bold mb-2">Looking for something else?</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Quickly navigate to our core resources or get in touch with our district support team for assistance.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/schemes">
                  <Button variant="outline" className="gap-1 rounded-full">Browse Schemes</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="gap-1 rounded-full">Contact Us</Button>
                </Link>
                <Link to="/grievance">
                  <Button className="gap-1 rounded-full">Resources & FAQ</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default About;
