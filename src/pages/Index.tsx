import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, GraduationCap, Heart, Briefcase, Landmark, FileText, Download, ExternalLink, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { newsItems, officials } from "@/data/mockData";
import Layout from "@/components/layout/Layout";

const heroIllustration = "/assets/images/hero-illustration.jpg";
import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sort news by date (latest first)
  const sortedNews = [...newsItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Auto-scroll logic with manual override
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    const scrollSpeed = 0.5;

    const scroll = () => {
      if (!isHovering && scrollContainer) {
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        if (scrollContainer.scrollTop < maxScroll) {
          scrollContainer.scrollTop = Math.min(scrollContainer.scrollTop + scrollSpeed, maxScroll);
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovering]);

  // Mobile touch: pass scroll to page when news box hits top/bottom boundary
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY; // positive = finger moving up = scroll down
      const atBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;
      const atTop = el.scrollTop <= 0;

      if ((atBottom && deltaY > 0) || (atTop && deltaY < 0)) {
        e.preventDefault();
        window.scrollBy({ top: deltaY, behavior: "auto" });
        touchStartY = currentY;
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const heroSlides = [
    { tag: "TRAINING PROGRAMME", title: "Beautician & Tailoring Training @ Vikarabad", desc: "Empowering women with vocational skills in beauty and tailoring across Telangana.", image: "/assets/homepage_gallery/Beautician & Tailoring Training Programme @ Vikarabad_one.png" },
    { tag: "TRAINING PROGRAMME", title: "Beautician & Tailoring Training @ Vikarabad", desc: "Empowering women with vocational skills in beauty and tailoring across Telangana.", image: "/assets/homepage_gallery/Beautician & Tailoring Training Programme @ Vikarabad_two.png" },
    { tag: "CELEBRATIONS", title: "Christmas 2025", desc: "Spreading joy and community spirit across the region.", image: "/assets/homepage_gallery/Christmas 2025 five.png" },
    { tag: "CELEBRATIONS", title: "Christmas 2025", desc: "Spreading joy and community spirit across the region.", image: "/assets/homepage_gallery/Christmas 2025 one.png" },
    { tag: "CELEBRATIONS", title: "Christmas 2025", desc: "Spreading joy and community spirit across the region.", image: "/assets/homepage_gallery/Christmas 2025 six.png" },
    { tag: "SKILL DEVELOPMENT", title: "Hardware & Networking Training @ Suryapet", desc: "Building digital skills for youth through hands-on hardware and networking programs.", image: "/assets/homepage_gallery/Hardware & Networking Training Programs @ Suryapet_one.png" },
    { tag: "SKILL DEVELOPMENT", title: "Hardware & Networking Training @ Suryapet", desc: "Building digital skills for youth through hands-on hardware and networking programs.", image: "/assets/homepage_gallery/Hardware & Networking Training Programs @ Suryapet_two.png" },
    { tag: "WOMEN EMPOWERMENT", title: "Indiramma Mahila Shakti Scheme", desc: "Empowering women through financial assistance and community welfare initiatives.", image: "/assets/homepage_gallery/INDIRAMMA MAHILA SHAKTI SCHEME two.png" },
    { tag: "WOMEN EMPOWERMENT", title: "Indiramma Mahila Shakti Scheme", desc: "Empowering women through financial assistance and community welfare initiatives.", image: "/assets/homepage_gallery/INDIRAMMA MAHILA SHAKTI SCHEME_four.png" },
    { tag: "WOMEN EMPOWERMENT", title: "Indiramma Mahila Shakti Scheme", desc: "Empowering women through financial assistance and community welfare initiatives.", image: "/assets/homepage_gallery/INDIRAMMA MAHILA SHAKTI SCHEME_one.png" },
    { tag: "WOMEN EMPOWERMENT", title: "Indiramma Mahila Shakti Scheme", desc: "Empowering women through financial assistance and community welfare initiatives.", image: "/assets/homepage_gallery/INDIRAMMA MAHILA SHAKTI SCHEME_three.png" },
    { tag: "CELEBRATIONS", title: "Christmas 2025", desc: "Spreading joy and community spirit across the region.", image: "/assets/homepage_gallery/christmas_four.jpeg" },
  ];

  const schemeCards = [
    { title: "Economic Support (Bank Linked)", desc: "Subsidized bank loans for setting up small businesses like Kirana, Tailoring, or Laundry.", link: "/schemes", image: "/assets/images/scheme_bank.png", highlight: "Up to ₹10,00,000" },
    { title: "Shaadi Mubarak", desc: "One-time financial grant to support marriages of daughters from minority families.", link: "/schemes", image: "/assets/images/scheme_shaadi.png", highlight: "Up to ₹1,00,000" },
    { title: "Driver Empowerment Scheme", desc: "Financial assistance for purchasing commercial vehicles to earn a livelihood.", link: "/schemes", image: "/assets/images/scheme_driver.png", highlight: "Up to ₹5,00,000" },
    { title: "Skill Training Programme", desc: "Free job-oriented skill training in IT, healthcare, retail and more with placement support.", link: "/schemes", image: "/assets/images/scheme_training.png", highlight: "Free + ₹3,000/month stipend" },
  ];

  const downloads = [
    { label: "Annual Report 2025-26", href: "#" },
    { label: "Policy Framework", href: "#" },
  ];

  const stories = [
    { id: 1, image: "/assets/beneficiary_stories/Church Construction of Centenary Baptist Church @ Warangal District.png" },
    { id: 2, image: "/assets/beneficiary_stories/Church Construction of Centenary Baptist Church @ Warangal District - Copy.png" },
    { id: 3, image: "/assets/beneficiary_stories/Construction of Carmel Church, Nalgonda & Calvary Gospel Ministries, Jayshanker Bhupalpally two.png" },
    { id: 4, image: "/assets/beneficiary_stories/Construction of Carmel Church, Nalgonda & Calvary Gospel Ministries, Jayshanker Bhupalpally two - Copy.png" },
    { id: 5, image: "/assets/beneficiary_stories/Construction of Church of Methodist Church, Vikarabad  & CSI Church, Gajulpet. Nirmal two.png" },
    { id: 6, image: "/assets/beneficiary_stories/Construction of Church of Methodist Church, Vikarabad  & CSI Church, Gajulpet. Nirmal two - Copy.png" },
    { id: 7, image: "/assets/beneficiary_stories/Driver Empowerment Program one.png" },
    { id: 8, image: "/assets/beneficiary_stories/Driver Empowerment Program two.png" },
    { id: 9, image: "/assets/beneficiary_stories/Petty Business ÔÇô Sports Shop @ Maredpally.png" },
    { id: 10, image: "/assets/beneficiary_stories/Petty Business ÔÇô Sweet Shop @ Trimulgherry.png" },
    { id: 11, image: "/assets/beneficiary_stories/Saree Business @ Bahadurpura.png" },
  ];

  const [storySlide, setStorySlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStorySlide((prev) => (prev + 1) % stories.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [stories.length]);

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
          <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr_200px] gap-5">
            {/* LEFT SIDEBAR — Latest News */}
            <aside className="order-2 lg:order-1 lg:h-full">
              {/* Latest News */}
              <div className="border border-border rounded-lg overflow-hidden flex flex-col h-[340px] lg:h-[420px]">
                <div className="flex items-center justify-between bg-muted px-4 py-3 shrink-0">
                  <h3 className="flex items-center gap-2 text-sm font-bold text-foreground uppercase tracking-wide">
                    <Megaphone className="h-4 w-4 text-primary" />
                    Latest News & Announcements
                  </h3>
                  <Link to="/media" className="text-xs font-bold text-primary hover:underline">View All News</Link>
                </div>
                <div
                  className="flex-1 overflow-y-auto relative bg-card/50 scrollbar-hide cursor-pointer select-none"
                  ref={scrollRef}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  style={{ overscrollBehaviorY: "auto" }}
                >
                  <div className="divide-y divide-border">
                    {sortedNews.map((item, idx) => {
                      // Only highlight the actual top 5 unique news items
                      const isTopFive = (idx % sortedNews.length) < 5;

                      return (
                        <div
                          key={`${item.id}-${idx}`}
                          className={`px-3 py-3 transition-colors hover:bg-muted/40 relative ${isTopFive ? "border-l-4 border-l-primary bg-primary/[0.03]" : ""}`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <p className="text-sm font-bold text-foreground leading-tight flex-1">
                              {item.title}
                            </p>
                            {isTopFive && (
                              <Badge key={`badge-${item.id}-${idx}`} variant="default" className="text-[9px] h-4 px-1.5 bg-primary shrink-0">
                                NEW
                              </Badge>
                            )}
                          </div>
                          <p className="text-[11px] text-muted-foreground italic flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-primary/40 mr-1" />
                            Posted on: {new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </aside>

            {/* CENTER — Hero Carousel */}
            <div className="order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden bg-foreground/90 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto lg:h-[420px]">
                <div
                  className="flex h-full w-full transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {heroSlides.map((slide, idx) => (
                    <div key={idx} className="relative h-full w-full flex-shrink-0">
                      <img
                        src={slide.image || heroIllustration}
                        alt={slide.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = heroIllustration;
                        }}
                      />
                      {/* Overlay content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                        <span className="inline-block w-fit text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-primary text-primary-foreground mb-3">
                          {slide.tag}
                        </span>
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                          {slide.title}
                        </h2>
                        <p className="mt-1 text-xs text-white/80 max-w-lg leading-relaxed">
                          {slide.desc}
                        </p>
                      </div>
                    </div>
                  ))}
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

            {/* RIGHT SIDEBAR — Commission Members (visible on all sizes) */}
            <aside className="order-3 flex flex-col gap-2 lg:h-[420px]">
              {/* Header */}
              <div className="bg-primary text-primary-foreground text-center py-1.5 px-2 rounded-lg">
                <p className="text-[10px] font-extrabold uppercase tracking-widest">COMMISSION MEMBERS</p>
              </div>
              {/* Cards — horizontal row on mobile/tablet, vertical stack on desktop */}
              <div className="flex flex-row lg:flex-col gap-2 lg:gap-2 flex-1">
                {officials.map((official) => (
                  <div key={official.name} className="text-center border border-border rounded-lg p-2 bg-card/50 flex-1 flex flex-col items-center justify-center overflow-hidden">
                    <div className="mb-1 lg:mb-2 h-20 w-16 sm:h-24 sm:w-20 lg:h-28 lg:w-24 xl:h-32 xl:w-28 rounded-lg overflow-hidden border-2 border-primary/30 flex items-center justify-center bg-muted shrink-0">
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
                          {official.name.split(" ").pop()?.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div>
                      <h4 className="text-[9px] sm:text-[10px] lg:text-[11px] font-bold text-muted-foreground uppercase">{official.designation}</h4>
                      <p className="text-[11px] sm:text-xs lg:text-sm font-bold text-foreground mt-0.5 lg:mt-1 leading-tight">
                        {official.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="py-5 gov-gradient">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-primary-foreground">
            {[
              { value: "4.46L", label: "Beneficiaries" },
              { value: "14", label: "Active Schemes" },
              { value: "₹850Cr+", label: "Funds" },
              { value: "33", label: "Districts Covered" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-extrabold">{stat.value}</p>
                <p className="text-[10px] md:text-xs font-semibold uppercase tracking-widest mt-1 opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== QUICK GO's ===== */}
      <section className="section-padding bg-muted/30">
        <div className="container">
          {/* Section Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="inline-block w-1 h-7 bg-primary rounded-full" />
                <h2 className="text-xl md:text-2xl font-bold text-foreground">Quick Go's</h2>
              </div>
              <p className="text-sm text-muted-foreground pl-3">Explore our flagship welfare schemes</p>
            </div>
            <Link to="/schemes" className="flex items-center gap-1.5 text-sm font-bold text-primary hover:underline underline-offset-4 transition-colors">
              View All <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Cards */}
          <div className="grid gap-5 sm:grid-cols-2">
            {schemeCards.map((scheme, idx) => (
              <div
                key={scheme.title}
                className="group relative rounded-xl overflow-hidden border border-border bg-card hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Top image strip */}
                <div className="relative h-36 md:h-44 overflow-hidden">
                  <img
                    src={scheme.image}
                    alt={scheme.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  {/* Highlight badge on image */}
                  {scheme.highlight && (
                    <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
                      {scheme.highlight}
                    </div>
                  )}
                  {/* Scheme number */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest">Scheme 0{idx + 1}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-base font-extrabold text-foreground leading-tight mb-2 group-hover:text-primary transition-colors">
                    {scheme.title}
                  </h3>
                  <p className="text-[13px] text-muted-foreground leading-relaxed line-clamp-2 flex-1">
                    {scheme.desc}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="h-px flex-1 bg-border mr-4" />
                    <Link
                      to={scheme.link}
                      className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-widest py-2.5 px-5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md shrink-0"
                    >
                      Apply Now <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>

                {/* Left accent bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENEFICIARY STORIES ===== */}
      <section className="py-12 bg-muted/20 overflow-hidden border-t border-border">
        <div className="container mb-8">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">Beneficiary Stories</h2>
            <div className="h-1 w-20 bg-primary rounded-full mb-4"></div>
            <p className="text-sm text-muted-foreground max-w-2xl">Real success stories from citizens who have benefited from our financial and welfare schemes.</p>
          </div>
        </div>

        {/* Overlapping 3D Carousel Wrapper */}
        <div className="relative w-full max-w-6xl mx-auto h-[280px] sm:h-[340px] md:h-[360px] flex items-center justify-center overflow-x-hidden md:overflow-visible group pb-6">
             {stories.map((story, i) => {
               const total = stories.length;
               let diff = (i - storySlide) % total;
               if (diff > total / 2) diff -= total;
               if (diff < -total / 2) diff += total;

               let xOffset = "0%";
               let scale = "scale-100";
               let zIndex = "z-30";
               let opacity = "opacity-100";
               let pointerEvents = "auto";

               if (diff === 0) {
                 xOffset = "0%"; scale = "scale-100"; zIndex = "z-30"; opacity = "opacity-100";
               } else if (diff === 1) {
                 xOffset = "70%"; scale = "scale-[0.80]"; zIndex = "z-20"; opacity = "opacity-60"; pointerEvents = "none";
               } else if (diff === -1) {
                 xOffset = "-70%"; scale = "scale-[0.80]"; zIndex = "z-20"; opacity = "opacity-60"; pointerEvents = "none";
               } else if (diff === 2) {
                 xOffset = "130%"; scale = "scale-[0.65]"; zIndex = "z-10"; opacity = "opacity-20"; pointerEvents = "none";
               } else if (diff === -2) {
                 xOffset = "-130%"; scale = "scale-[0.65]"; zIndex = "z-10"; opacity = "opacity-20"; pointerEvents = "none";
               } else {
                 xOffset = diff > 0 ? "200%" : "-200%"; scale = "scale-50"; zIndex = "z-0"; opacity = "opacity-0"; pointerEvents = "none";
               }

               return (
                  <div
                    key={`${story.id}`}
                    className={`absolute transition-all duration-700 ease-out h-[260px] w-[280px] sm:h-[300px] sm:w-[340px] md:w-[420px] rounded-xl overflow-hidden shadow-2xl bg-card border border-border/50 ${zIndex} ${opacity} ${scale}`}
                    style={{ transform: `translateX(${xOffset})`, pointerEvents: pointerEvents as any }}
                  >
                      <img src={story.image} alt={`Beneficiary image ${story.id}`} className="absolute inset-0 w-full h-full object-cover" />
                  </div>
               )
             })}

             {/* Nav Arrows */}
             <button onClick={() => setStorySlide((p) => (p - 1 + stories.length) % stories.length)} aria-label="Previous story" className="absolute left-4 md:left-8 z-40 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-black border border-border">
               <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
             </button>
             <button onClick={() => setStorySlide((p) => (p + 1) % stories.length)} aria-label="Next story" className="absolute right-4 md:right-8 z-40 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors text-black border border-border">
               <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
             </button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
