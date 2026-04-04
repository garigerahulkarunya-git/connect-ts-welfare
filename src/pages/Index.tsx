import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, GraduationCap, Heart, Briefcase, Landmark, FileText, Download, ExternalLink, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { newsItems, officials } from "@/data/mockData";
import Layout from "@/components/layout/Layout";

const heroIllustration = "/assets/images/hero-illustration.jpg";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t, i18n } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const latestNews = newsItems.slice(0, 4);

  const heroSlides = [
    {
      tag: t("stat_schemes"),
      title: t("scheme_subsidy"),
      desc: t("scheme_subsidy_desc"),
      image: "/assets/images/hero_scholarship.png",
    },
    {
      tag: t("service_scholarship"),
      title: t("scheme_overseas"),
      desc: t("scheme_overseas_desc"),
      image: "/assets/images/hero_overseas.png",
    },
    {
      tag: t("scheme_skill"),
      title: t("scheme_driver"),
      desc: t("scheme_driver_desc"),
      image: "/assets/images/hero_skills.png",
    },
  ];

  const schemeCards = [
    { icon: GraduationCap, title: t("service_scholarship"), desc: t("service_scholarship_desc"), link: "/schemes" },
    { icon: Heart, title: t("scheme_subsidy"), desc: t("scheme_subsidy_desc"), link: "/schemes" },
    { icon: Briefcase, title: t("scheme_driver"), desc: t("scheme_driver_desc"), link: "/schemes" },
    { icon: Landmark, title: t("service_eligibility"), desc: t("service_eligibility_desc"), link: "/schemes" },
  ];

  const quickLinks = [
    { label: "G.O's & Circulars", to: "/media" },
    { label: t("nav_grievance"), to: "/grievance" },
    { label: t("nav_contact"), to: "/contact" },
    { label: t("nav_about"), to: "/about" },
  ];

  const downloads = [
    { label: t("about_doc1"), href: "#" },
    { label: t("about_doc2"), href: "#" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[currentSlide];

  return (
    <Layout>
      {/* ===== MAIN 3-COLUMN SECTION ===== */}
      <section className="bg-background py-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr_240px] gap-6">
            {/* LEFT SIDEBAR — Latest News + Quick Links */}
            <aside className="space-y-6 order-2 lg:order-1">
              {/* Latest News */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="flex items-center justify-between bg-muted px-4 py-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wide">
                    <Megaphone className="h-4 w-4 text-primary" />
                    {t("news_title")}
                  </h3>
                  <Link to="/media" className="text-xs font-bold text-primary hover:underline">{t("news_view_all")}</Link>
                </div>
                <div className="divide-y divide-border">
                  {latestNews.map((item) => (
                    <div key={item.id} className="px-4 py-3">
                      <p className="text-sm font-semibold text-foreground leading-snug">{t(`news_title_${item.id}`, { defaultValue: item.title })}</p>
                      <p className="text-[11px] text-primary/80 mt-1 italic">
                        {t("common_posted_on")}: {new Date(item.date).toLocaleDateString(i18n.language === "en" ? "en-IN" : i18n.language === "te" ? "te-IN" : "hi-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-muted px-4 py-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wide">
                    <ExternalLink className="h-4 w-4 text-primary" />
                    {t("nav_contact")}
                  </h3>
                </div>
                <ul className="divide-y divide-border">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <Link to={link.to} className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground hover:bg-muted/60 transition-colors">
                        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* CENTER — Hero Carousel */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden bg-foreground/90 aspect-[16/9] lg:aspect-auto lg:h-[420px]">
                <img
                  src={slide.image || heroIllustration}
                  alt="TGCMFC community empowerment"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 transition-opacity duration-1000"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = heroIllustration;
                  }}
                />
                {/* Overlay content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 bg-gradient-to-t from-foreground/80 via-foreground/40 to-transparent">
                  <span className="inline-block w-fit text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded bg-primary text-primary-foreground mb-3">
                    {slide.tag}
                  </span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-background leading-tight">
                    {slide.title}
                  </h2>
                  <p className="mt-2 text-sm text-background/80 max-w-lg leading-relaxed">
                    {slide.desc}
                  </p>
                </div>
                {/* Nav arrows */}
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/20 backdrop-blur flex items-center justify-center hover:bg-background/40 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="h-5 w-5 text-background" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/20 backdrop-blur flex items-center justify-center hover:bg-background/40 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="h-5 w-5 text-background" />
                </button>
                {/* Dots */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                  {heroSlides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-2 rounded-full transition-all ${i === currentSlide ? "w-6 bg-primary" : "w-2 bg-background/50"}`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR — Officials */}
            <aside className="space-y-6 order-3 hidden lg:block">
              {officials.map((official, idx) => (
                <div key={official.name} className="text-center border border-border rounded-lg p-4 bg-card/50">
                  <div className="mx-auto mb-3 h-20 w-20 rounded-full overflow-hidden border-2 border-primary/30 flex items-center justify-center bg-muted">
                    {official.photo ? (
                      <img 
                        src={official.photo} 
                        alt={official.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement!.innerText = official.name.split(" ").pop()?.charAt(0) || "";
                          target.parentElement!.classList.add("text-2xl", "font-bold", "text-primary");
                        }}
                      />
                    ) : (
                      <span className="text-2xl font-bold text-primary">
                        {t(`official_name_${idx}`, { defaultValue: official.name }).split(" ").pop()?.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h4 className="text-[11px] font-bold text-muted-foreground uppercase">{t(`official_desig_${idx}`, { defaultValue: official.designation })}</h4>
                  <p className="text-sm font-bold text-foreground mt-1 leading-tight">
                    {t(`official_name_${idx}`, { defaultValue: official.name })}
                  </p>
                </div>
              ))}
            </aside>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-5 gov-gradient">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-primary-foreground">
            {[
              { value: "4.46L", label: t("stat_beneficiaries") },
              { value: "14", label: t("stat_schemes") },
              { value: "₹850Cr+", label: t("stat_funds").split(" ")[0] }, // Adjusted for "Funds Disbursed"
              { value: "33", label: t("stat_districts") },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-extrabold">{stat.value}</p>
                <p className="text-[10px] md:text-xs font-semibold uppercase tracking-widest mt-1 opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SCHEMES + DOWNLOADS ===== */}
      <section className="section-padding bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-8">
            {/* Schemes */}
            <div>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-foreground flex items-center gap-2">
                  <span className="inline-block w-1 h-7 bg-primary rounded-full" />
                  {t("schemes_title")}
                </h2>
                <Link to="/schemes" className="text-sm font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4">
                  {t("schemes_view_all")}
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                {schemeCards.map((scheme) => (
                  <Card key={scheme.title} className="border-border hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-4">
                        <scheme.icon className="h-6 w-6 text-foreground/70" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{scheme.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{scheme.desc}</p>
                      <Link to="/apply" className="inline-flex items-center gap-1 text-sm font-bold text-foreground uppercase tracking-wide hover:text-primary transition-colors">
                        {t("nav_apply_now")} <ArrowRight className="h-4 w-4" />
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Downloads Sidebar */}
            <aside className="hidden lg:block">
              <div className="border border-border rounded-lg overflow-hidden sticky top-24">
                <div className="bg-muted px-4 py-3">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wide">
                    <Download className="h-4 w-4 text-primary" />
                    {t("about_transparency_title")}
                  </h3>
                </div>
                <ul className="divide-y divide-border">
                  {downloads.map((item) => (
                    <li key={item.label}>
                      <a href={item.href} className="flex items-center justify-between px-4 py-3 text-sm text-foreground hover:bg-muted/60 transition-colors">
                        {item.label}
                        <FileText className="h-4 w-4 text-primary" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
