import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search, Star, Eye, GraduationCap, Car, Lightbulb, Building2, CreditCard, Globe, HeartPulse, Monitor, BookOpen, Zap, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { schemes } from "@/data/mockData";
import type { Scheme } from "@/data/mockData";

const categories = ["All", "Education", "Housing", "Skill Development", "Enterprise", "Welfare", "Health"];
const eligibilityOptions = ["All", "Students", "Youth", "Women", "Senior Citizens"];
const statuses = ["All", "OPEN", "CLOSED", "UPCOMING"];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  graduation: GraduationCap,
  car: Car,
  lightbulb: Lightbulb,
  building: Building2,
  "credit-card": CreditCard,
  globe: Globe,
  "heart-pulse": HeartPulse,
  monitor: Monitor,
  "book-open": BookOpen,
};

const getSchemeIcon = (scheme: Scheme) => {
  const Icon = iconMap[scheme.icon || ""] || GraduationCap;
  return Icon;
};

const StatusDot = ({ status }: { status: string }) => {
  const colors: Record<string, string> = {
    OPEN: "bg-green-500",
    CLOSED: "bg-destructive",
    UPCOMING: "bg-accent",
  };
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider">
      <span className={`h-2 w-2 rounded-full ${colors[status] || "bg-muted-foreground"}`} />
      {status}
    </span>
  );
};

const Schemes = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [eligibility, setEligibility] = useState("All");
  const [status, setStatus] = useState("All");

  const flagshipSchemes = schemes.filter(s => s.flagship);
  const allSchemes = useMemo(() => {
    return schemes.filter(s => !s.flagship).filter((s) => {
      const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || s.category === category;
      const matchStatus = status === "All" || s.status === status;
      return matchSearch && matchCat && matchStatus;
    });
  }, [search, category, status]);

  const openCount = schemes.filter(s => s.status === "OPEN").length;
  const closingSoonCount = schemes.filter(s => s.status === "UPCOMING").length;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-background py-10 md:py-14">
        <div className="container">
          <p className="text-sm text-muted-foreground mb-1">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span className="mx-2">›</span>
            <span className="text-primary font-medium">Schemes</span>
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mt-4">
            Explore Government Welfare<br />Schemes
          </h1>
          <p className="mt-3 text-muted-foreground max-w-xl">
            Empowering Christian Minorities through financial assistance, educational support, and professional training initiatives in Telangana.
          </p>
        </div>
      </section>

      {/* Stats Row */}
      <section className="border-y border-border bg-card py-6">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { value: "13+", label: "Total active schemes", highlight: false },
              { value: `0${openCount}`, label: "Currently Open", highlight: false },
              { value: `0${closingSoonCount}`, label: "Closing Soon", highlight: true },
              { value: "₹500Cr+", label: "Sanctioned Budget", highlight: false },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`text-center rounded-xl py-4 px-3 ${stat.highlight ? "bg-accent/15 border-2 border-accent" : "bg-muted/50"}`}
              >
                <p className={`text-2xl md:text-3xl font-bold ${stat.highlight ? "text-accent" : "text-foreground"}`}>{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-6">
        <div className="container">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes (e.g., scholarship, loan...)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 h-11 bg-card"
              />
            </div>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap">
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-11 rounded-lg border border-border bg-card text-foreground px-3 pr-8 text-sm appearance-none focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  {categories.map(c => <option key={c} value={c}>Category: {c}</option>)}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              <select
                value={eligibility}
                onChange={(e) => setEligibility(e.target.value)}
                className="h-11 rounded-lg border border-border bg-card text-foreground px-3 pr-2 text-sm appearance-none focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {eligibilityOptions.map(e => <option key={e} value={e}>Eligibility: {e}</option>)}
              </select>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="h-11 rounded-lg border border-border bg-card text-foreground px-3 pr-2 text-sm appearance-none focus:ring-2 focus:ring-primary focus:outline-none"
              >
                {statuses.map(s => <option key={s} value={s}>Status: {s}</option>)}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Initiatives */}
      <section className="section-padding pt-6">
        <div className="container">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-accent fill-accent" /> Flagship Initiatives
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {flagshipSchemes.map((scheme) => {
              const Icon = getSchemeIcon(scheme);
              return (
                <Card key={scheme.id} className="h-full border-2 border-border hover:border-primary/30 transition-all hover:shadow-lg rounded-2xl overflow-hidden">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <StatusDot status={scheme.status} />
                    </div>
                    <h3 className="font-bold text-lg text-card-foreground">{scheme.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{scheme.shortDescription}</p>
                    {scheme.tags && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {scheme.tags.map(tag => (
                          <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">{tag}</span>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-2 mt-5">
                      {scheme.status === "OPEN" ? (
                        <Link to="/apply" className="flex-1">
                          <Button className="w-full">Apply Now</Button>
                        </Link>
                      ) : (
                        <Link to="/apply" className="flex-1">
                          <Button variant="outline" className="w-full">
                            Apply {scheme.deadline ? new Date(scheme.deadline).toLocaleDateString("en-IN", { month: "short", day: "numeric" }) : "Soon"}
                          </Button>
                        </Link>
                      )}
                      <Link to={`/schemes/${scheme.id}`}>
                        <Button variant="outline" size="icon" className="shrink-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Welfare Schemes */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-xl md:text-2xl font-bold mb-6">All Welfare Schemes</h2>
          {allSchemes.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">No schemes found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setCategory("All"); setStatus("All"); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {allSchemes.map((scheme) => {
                const Icon = getSchemeIcon(scheme);
                return (
                  <Card key={scheme.id} className="h-full border border-border hover:shadow-md transition-all">
                    <CardContent className="p-5 flex flex-col h-full">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-semibold text-card-foreground leading-snug">{scheme.title}</h3>
                          <StatusDot status={scheme.status} />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed flex-1">{scheme.shortDescription}</p>
                      {scheme.tags && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {scheme.tags.map(tag => (
                            <span key={tag} className="text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground font-medium">{tag}</span>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-4">
                        <Link to={`/schemes/${scheme.id}`} className="flex-1">
                          <Button variant="outline" size="sm" className="w-full">View Details</Button>
                        </Link>
                        {scheme.status === "OPEN" ? (
                          <Link to="/apply" className="flex-1">
                            <Button size="sm" className="w-full">Apply Now</Button>
                          </Link>
                        ) : scheme.status === "UPCOMING" ? (
                          <Button variant="outline" size="sm" className="flex-1" disabled>Coming Soon</Button>
                        ) : (
                          <Button variant="outline" size="sm" className="flex-1 border-destructive/50 text-destructive" disabled>Closed</Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Scheme Recommendation CTA */}
      <section className="py-16 md:py-20">
        <div className="container">
          <div className="gov-gradient rounded-3xl p-8 md:p-12 grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-primary-foreground">
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                Not sure which scheme is right for you?
              </h2>
              <p className="mt-3 opacity-90 leading-relaxed">
                Tell us a bit about yourself, and our intelligent assistant will suggest the most relevant government schemes for your profile.
              </p>
              <div className="flex items-center gap-2 mt-6">
                <div className="flex -space-x-2">
                  {["A", "S", "M"].map((l) => (
                    <div key={l} className="h-8 w-8 rounded-full bg-primary-foreground/20 border-2 border-primary flex items-center justify-center text-xs font-bold text-primary-foreground">{l}</div>
                  ))}
                </div>
                <span className="text-sm opacity-80">Join 40,000+ applicants this month</span>
              </div>
            </div>
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Annual Family Income</label>
                  <select className="mt-1 w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none">
                    <option>Less than ₹1.5 Lakhs</option>
                    <option>₹1.5 - ₹3 Lakhs</option>
                    <option>₹3 - ₹5 Lakhs</option>
                    <option>Above ₹5 Lakhs</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Age Group</label>
                    <Input placeholder="Enter Age" className="mt-1 h-10" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Purpose</label>
                    <select className="mt-1 w-full rounded-lg border border-border bg-background text-foreground px-3 py-2.5 text-sm focus:ring-2 focus:ring-primary focus:outline-none">
                      <option>Education</option>
                      <option>Employment</option>
                      <option>Housing</option>
                      <option>Health</option>
                      <option>Enterprise</option>
                    </select>
                  </div>
                </div>
                <Button className="w-full h-11 font-semibold text-base">
                  Get Recommendations <Zap className="ml-2 h-4 w-4" />
                </Button>
                <p className="text-[10px] text-center text-muted-foreground uppercase tracking-widest">Safe & Confidential Data Processing</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Schemes;
