import { useState, useMemo } from "react";
import { Search, ArrowRight, Play, MapPin, Calendar, ChevronRight, ExternalLink, Newspaper, Star, Image } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/layout/Layout";
import { newsItems } from "@/data/mockData";

const Media = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const sidebarLinks = [
    { label: "News Feed", icon: Newspaper, key: "News Feed" },
    { label: "Upcoming Events", icon: Calendar, key: "Upcoming Events" },
    { label: "Success Stories", icon: Star, key: "Success Stories" },
    { label: "Media Gallery", icon: Image, key: "Media Gallery" },
  ];

  const [activeSection, setActiveSection] = useState("News Feed");

  const upcomingEvents = [
    { day: "24", month: "JUN", title: "Pilgrimage Orientation", location: "Jubilee Hall, Hyderabad" },
    { day: "12", month: "JUL", title: "Business Expo 2025", location: "HITEX, Madhapur" },
  ];

  const filtered = useMemo(() => {
    let items = newsItems;
    if (category !== "all") items = items.filter((n) => n.type === category);
    if (search) items = items.filter((n) => n.title.toLowerCase().includes(search.toLowerCase()));
    return items;
  }, [search, category]);

  const categoryColors: Record<string, string> = {
    Announcement: "text-primary",
    Event: "text-secondary",
    Achievement: "text-accent-foreground",
    Report: "text-muted-foreground",
    "Success Story": "text-primary",
  };

  return (
    <Layout>
      {/* Hero area with sidebar */}
      <div className="container py-6 md:py-10">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="hidden md:block w-48 shrink-0">
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Editorial Portal</p>
            <p className="text-xs text-muted-foreground mb-4">Sovereign Updates</p>
            <nav className="space-y-1">
              {sidebarLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => setActiveSection(link.key)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeSection === link.key
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground mb-2">Home &gt; Media</p>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-2">
              {"News, Events & Media".split(",").map((line, i) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </h1>
            <p className="text-muted-foreground mb-8 max-w-lg">
              Stay updated with the latest announcements, events, and success stories from the Sovereign heart of Telangana.
            </p>

            {/* Featured Announcement */}
            <Card className="overflow-hidden mb-8 bg-foreground text-background border-0">
              <CardContent className="p-0">
                <div className="p-6 md:p-8">
                  <Badge className="bg-primary text-primary-foreground mb-3 text-xs">Featured Announcement</Badge>
                  <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-3">
                    New Scholarship Scheme 2025 Launched for Higher Education
                  </h2>
                  <p className="text-sm opacity-80 mb-4 max-w-lg">
                    The Telangana Christian Minorities Finance Corporation announces a historic expansion of the post-matric scholarship program, reaching...
                  </p>
                  <Button variant="outline" className="rounded-full bg-background text-foreground hover:bg-muted gap-1">
                    Read Official Gazette <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between mb-4">
              <Button variant="outline" className="rounded-full text-primary border-primary text-sm">
                Subscribe for Updates
              </Button>
            </div>

            {/* Search & Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search news, events..."
                  className="pl-10"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="news">News</SelectItem>
                  <SelectItem value="event">Events</SelectItem>
                  <SelectItem value="success">Success Stories</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* News Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
              {filtered.map((item) => (
                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="h-40 bg-muted flex items-center justify-center text-muted-foreground text-4xl">
                    {item.type === "news" ? "📰" : item.type === "event" ? "📅" : item.type === "success" ? "🌟" : "🖼️"}
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold uppercase tracking-wider ${categoryColors[item.category] || "text-muted-foreground"}`}>
                        {item.category}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        • {new Date(item.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm leading-snug mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{item.excerpt}</p>
                    <button className="text-xs text-primary font-semibold mt-3 inline-flex items-center gap-1 hover:underline">
                      Read More <ArrowRight className="h-3 w-3" />
                    </button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Upcoming Events + Success Stories */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {/* Upcoming Events */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Upcoming Events</h2>
                  <button className="text-xs text-primary font-semibold hover:underline">View All</button>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((evt, i) => (
                    <Card key={i} className="shadow-none">
                      <CardContent className="p-4 flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center w-14 h-14 rounded-xl bg-muted shrink-0">
                          <span className="text-lg font-bold leading-none">{evt.day}</span>
                          <span className="text-[10px] uppercase text-muted-foreground">{evt.month}</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{evt.title}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3" /> {evt.location}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Success Stories */}
              <div>
                <h2 className="text-xl font-bold mb-4">Success Stories</h2>
                <Card className="overflow-hidden bg-foreground text-background border-0">
                  <CardContent className="p-0">
                    <div className="h-44 bg-muted/20 flex items-center justify-center text-6xl">🧑‍💼</div>
                    <div className="p-5">
                      <Badge className="bg-primary text-primary-foreground text-[10px] mb-2">Scholarship Recipient</Badge>
                      <h3 className="font-bold mb-1">Rachel's Journey to Tech</h3>
                      <p className="text-xs opacity-70 mb-3">"TGCMFC didn't just give me a grant, they gave me a career."</p>
                      <button className="text-xs flex items-center gap-1 font-medium">
                        <Play className="h-3 w-3" /> Watch Story
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Testimonial + Impact */}
              <div className="space-y-4">
                <Card className="shadow-none">
                  <CardContent className="p-5">
                    <span className="text-3xl text-primary font-serif">"</span>
                    <p className="text-sm italic text-muted-foreground leading-relaxed mb-4">
                      Through the Self-Employment scheme, I was able to expand my bakery into three different locations across Hyderabad.
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">D</div>
                      <div>
                        <p className="text-xs font-bold">David Samuel</p>
                        <p className="text-[10px] text-muted-foreground">Entrepreneur</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="gov-gradient text-primary-foreground border-0 shadow-none">
                  <CardContent className="p-5">
                    <p className="font-bold text-sm mb-1">Over 2.4M Impacted</p>
                    <p className="text-xs opacity-80 mb-3">Our programs have reached every corner of the state, creating lasting change.</p>
                    <button className="text-xs font-semibold underline flex items-center gap-1">
                      View Impact Report <ExternalLink className="h-3 w-3" />
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Subscribe CTA */}
            <Card className="bg-muted/40 shadow-none">
              <CardContent className="p-8 md:flex items-center gap-8">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-extrabold leading-tight mb-2">
                    Subscribe for the latest updates from TGCMFC
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Receive official announcements, scheme launch dates, and important media releases directly in your inbox.
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Input placeholder="Your email address" className="w-full sm:w-56 bg-background" />
                  <Button className="rounded-full shrink-0">Sign Up</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Media;
