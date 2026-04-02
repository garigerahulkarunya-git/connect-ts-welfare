import { Link } from "react-router-dom";
import { ArrowRight, Search, FileText, MessageSquare, Users, Building2, BookOpen, Heart, Shield, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SchemeCard from "@/components/shared/SchemeCard";
import StatCounter from "@/components/shared/StatCounter";
import { schemes, newsItems, stats, officials } from "@/data/mockData";
import Layout from "@/components/layout/Layout";

const quickActions = [
  { icon: FileText, label: "Apply for Scheme", desc: "Browse and apply for welfare schemes", to: "/apply", color: "bg-primary text-primary-foreground" },
  { icon: Search, label: "Find Scheme", desc: "Search schemes by category or eligibility", to: "/schemes", color: "bg-secondary text-secondary-foreground" },
  { icon: MessageSquare, label: "File Grievance", desc: "Submit or track your complaint", to: "/grievance", color: "bg-accent text-accent-foreground" },
  { icon: Users, label: "Track Application", desc: "Check your application status", to: "/grievance", color: "bg-gov-dark text-primary-foreground" },
];

const quickLinks = [
  { icon: BookOpen, label: "Scholarships", to: "/schemes" },
  { icon: Building2, label: "Housing", to: "/schemes" },
  { icon: Heart, label: "Health Aid", to: "/schemes" },
  { icon: Shield, label: "Enterprise Loans", to: "/schemes" },
];

const Index = () => {
  const featuredSchemes = schemes.filter(s => s.status === "OPEN").slice(0, 3);
  const latestNews = newsItems.slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="gov-gradient-warm text-primary-foreground section-padding">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-sm font-medium opacity-80 mb-2">Government of Telangana</p>
            <h1 className="text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
              Telangana Christian Minorities Finance Corporation
            </h1>
            <p className="mt-4 text-base opacity-90 md:text-lg leading-relaxed">
              Empowering Christian minorities through education, housing, skill development, and enterprise
              support. Serving over 4,46,077 citizens across Telangana.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/apply">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Apply Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/grievance">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Track Application
                </Button>
              </Link>
              <Link to="/schemes">
                <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                  Find Scheme
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-8">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <StatCounter end={stats.beneficiaries} label="Beneficiaries Served" />
            <StatCounter end={stats.schemesActive} label="Active Schemes" />
            <StatCounter end={stats.amountDisbursed} label="Crores Disbursed" prefix="₹" suffix="Cr+" />
            <StatCounter end={stats.districtsServed} label="Districts Covered" />
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">What would you like to do?</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <Link key={action.label} to={action.to}>
                <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl ${action.color}`}>
                      <action.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold text-card-foreground">{action.label}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{action.desc}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Schemes */}
      <section className="section-padding bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Schemes</h2>
            <Link to="/schemes">
              <Button variant="outline" size="sm">View All <ArrowRight className="ml-1 h-3 w-3" /></Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredSchemes.map((scheme) => (
              <SchemeCard key={scheme.id} scheme={scheme} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">Quick Links</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {quickLinks.map((link) => (
              <Link key={link.label} to={link.to}>
                <Card className="h-full transition-all hover:shadow-md hover:border-primary/30 cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <link.icon className="mx-auto h-8 w-8 text-primary mb-3" />
                    <span className="font-medium text-sm">{link.label}</span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="section-padding bg-muted/50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Latest News & Events</h2>
            <Link to="/media">
              <Button variant="outline" size="sm">View All <ArrowRight className="ml-1 h-3 w-3" /></Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {latestNews.map((item) => (
              <Card key={item.id} className="transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <span className="text-xs font-medium text-secondary">{item.category}</span>
                  <h3 className="mt-2 font-semibold leading-snug">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.excerpt}</p>
                  <p className="mt-3 text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Officials */}
      <section className="section-padding">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">Key Officials</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {officials.map((official) => (
              <Card key={official.name} className="text-center">
                <CardContent className="p-6">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground text-2xl font-bold">
                    {official.name.charAt(0)}
                  </div>
                  <h3 className="font-semibold text-sm">{official.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{official.designation}</p>
                </CardContent>
              </Card>
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
