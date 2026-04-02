import { Link } from "react-router-dom";
import { ArrowRight, Search, FileText, MessageSquare, Users, BookOpen, Heart, Shield, MessageCircle, GraduationCap, ClipboardCheck, AlertCircle, CheckSquare, Briefcase, Home as HomeIcon, Lightbulb, CreditCard, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SchemeCard from "@/components/shared/SchemeCard";
import { schemes, newsItems, stats, officials } from "@/data/mockData";
import Layout from "@/components/layout/Layout";
import heroIllustration from "@/assets/hero-illustration.jpg";
import { useState } from "react";

const essentialServices = [
  { icon: GraduationCap, label: "Apply for Scholarship", desc: "Pre-matric and post-matric financial assistance for students.", to: "/apply" },
  { icon: ClipboardCheck, label: "Track Application", desc: "Real-time status updates on your submitted applications.", to: "/grievance" },
  { icon: AlertCircle, label: "Register Grievance", desc: "File a complaint or report issues for quick resolution.", to: "/grievance" },
  { icon: CheckSquare, label: "Eligibility Checker", desc: "Quickly find out which schemes you qualify for.", to: "/schemes" },
];

const schemeCategories = [
  { icon: Briefcase, label: "Driver Empowerment", desc: "Subsidized loans and skill training for professional heavy light vehicle driving.", status: "OPEN" as const },
  { icon: GraduationCap, label: "Overseas Education", desc: "Financial assistance for students pursuing higher education in foreign universities.", status: "OPEN" as const },
  { icon: Lightbulb, label: "Skill Training", desc: "Empowering youth through specialised job-oriented training programs.", status: "OPEN" as const },
  { icon: CreditCard, label: "Subsidy Loans", desc: "Small business loans with attractive subsidies for self-employment.", status: "OPEN" as const },
];

const Index = () => {
  const featuredSchemes = schemes.filter(s => s.status === "OPEN").slice(0, 4);
  const latestNews = newsItems.slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-background section-padding overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
                Empowering Communities
              </span>
              <h1 className="text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl text-foreground">
                Empowering Christian Minorities Through{" "}
                <span className="text-accent">Welfare & Opportunity</span>
              </h1>
              <p className="mt-4 text-base text-muted-foreground md:text-lg leading-relaxed max-w-lg">
                Access financial assistance, education, employment, and support schemes — all in one centralized digital portal designed for your growth.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link to="/apply">
                  <Button size="lg" className="font-semibold">
                    Apply for Scheme <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/grievance">
                  <Button size="lg" variant="outline" className="font-semibold">
                    Track Application
                  </Button>
                </Link>
              </div>
              <Link to="/grievance" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                <MessageSquare className="h-4 w-4" /> Submit a Grievance ↓
              </Link>
            </div>
            <div className="relative hidden lg:block">
              <img
                src={heroIllustration}
                alt="Diverse Indian professionals representing TGCMFC community empowerment"
                width={800}
                height={600}
                className="rounded-2xl shadow-lg w-full object-cover"
              />
              {/* Trust badge */}
              <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur rounded-xl p-3 shadow-md border border-border">
                <p className="text-[10px] font-bold text-primary uppercase tracking-wider">Government Trust</p>
                <p className="text-xs text-muted-foreground mt-0.5">Over 4.5 Lakh beneficiaries supported since inception</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 border-y border-border bg-card">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Users, value: "4,46,077+", label: "Beneficiaries" },
              { icon: FileText, value: "13+", label: "Active Schemes" },
              { icon: Shield, value: "33", label: "Districts Covered" },
              { icon: CreditCard, value: "₹850 Cr", label: "Funds Disbursed" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center text-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-wide font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Essential Services */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Essential Services</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {essentialServices.map((service) => (
              <Link key={service.label} to={service.to}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer border-border">
                  <CardContent className="p-6 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                      <service.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-semibold text-card-foreground">{service.label}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Financial & Welfare Schemes */}
      <section className="section-padding bg-muted/40">
        <div className="container">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Financial & Welfare Schemes</h2>
              <p className="text-muted-foreground mt-1">Tailored programs to support education, skill-building, and livelihoods.</p>
            </div>
            <Link to="/schemes" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline whitespace-nowrap mt-1">
              View All Schemes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-8">
            {schemeCategories.map((scheme) => (
              <Card key={scheme.label} className="h-full transition-all hover:shadow-lg hover:-translate-y-1 border-border">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                      <scheme.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full bg-accent/20 text-accent-foreground">
                      {scheme.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-card-foreground mb-2">{scheme.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{scheme.desc}</p>
                  <Link to="/apply">
                    <Button variant="outline" size="sm" className="w-full">Apply Now</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
          <Link to="/schemes" className="sm:hidden flex items-center justify-center gap-1 mt-6 text-sm font-medium text-primary hover:underline">
            View All Schemes <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Find the Right Scheme - Eligibility Checker CTA */}
      <section className="py-16 md:py-20 gov-gradient text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-2xl md:text-3xl font-bold">Find the Right Scheme for You</h2>
          <p className="mt-2 opacity-90">Answer 3 simple questions to see your eligible benefits.</p>
          <div className="mt-8 mx-auto max-w-2xl bg-card rounded-2xl p-6 shadow-xl">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="text-left">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Monthly Income</label>
                <select className="mt-1 w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none">
                  <option>Below ₹10,000</option>
                  <option>₹10,000 - ₹25,000</option>
                  <option>₹25,000 - ₹50,000</option>
                  <option>Above ₹50,000</option>
                </select>
              </div>
              <div className="text-left">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Your Age Group</label>
                <select className="mt-1 w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none">
                  <option>18 - 25 years</option>
                  <option>25 - 35 years</option>
                  <option>35 - 50 years</option>
                  <option>Above 50 years</option>
                </select>
              </div>
              <div className="flex items-end">
                <Link to="/schemes" className="w-full">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold">
                    Check Eligibility
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News & Announcements */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Latest News & Announcements</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {latestNews.map((item) => (
              <Card key={item.id} className="overflow-hidden transition-shadow hover:shadow-lg border-border">
                <div className="h-48 bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">News Image</span>
                </div>
                <CardContent className="p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                  <h3 className="mt-2 font-semibold leading-snug text-card-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.excerpt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/media">
              <Button variant="outline">View All News</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Leading the Vision - Officials */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Leading the Vision</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {officials.map((official) => (
              <div key={official.name} className="text-center">
                <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-4 border-primary/20 text-3xl font-bold text-primary">
                  {official.name.split(" ").pop()?.charAt(0)}
                </div>
                <h3 className="font-bold text-foreground">{official.name}</h3>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mt-1">{official.designation}</p>
                {official.quote && (
                  <p className="mt-3 text-sm text-muted-foreground italic leading-relaxed">
                    "{official.quote}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lives Transformed - Testimonial */}
      <section className="section-padding bg-muted/60">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground">Lives Transformed by TGCMFC</h2>
              <Card className="mt-6 border-border">
                <CardContent className="p-6">
                  <p className="text-muted-foreground leading-relaxed italic">
                    "The Overseas Education Grant helped me pursue my Master's in Data Science in the UK. I am now working at a top tech firm and supporting my family back in Medak."
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">A</div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Anish Kumar</p>
                      <p className="text-xs text-muted-foreground">• Medak District</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex gap-2 mt-4">
                <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="Previous">
                  <ChevronLeft className="h-5 w-5 text-muted-foreground" />
                </button>
                <button className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors" aria-label="Next">
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="aspect-video rounded-2xl bg-muted flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center shadow-lg cursor-pointer hover:bg-primary transition-colors">
                  <Play className="h-7 w-7 text-primary-foreground ml-1" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links Bar */}
      <section className="py-4 border-t border-border bg-card">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {["TGSCHEMES", "Online Portal", "ePASS", "Scholarship Hub", "Tenders", "Residential Schools", "RTI", "Right to Info"].map((link) => (
              <a key={link} href="#" className="hover:text-primary transition-colors py-2">{link}</a>
            ))}
          </div>
        </div>
      </section>

      {/* Floating chatbot button */}
      <button
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Open chatbot"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </Layout>
  );
};

export default Index;
