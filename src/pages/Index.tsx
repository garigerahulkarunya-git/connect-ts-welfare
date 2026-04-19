import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, GraduationCap, Heart, Briefcase, Landmark, FileText, Download, ExternalLink, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { newsItems, officials } from "@/data/mockData";
import Layout from "@/components/layout/Layout";
import { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";

import { fetchStories, fetchHeroSlides } from "@/data/dynamicAssets";
import type { StoryItem, HeroSlide } from "@/data/dynamicAssets";

const heroIllustration = "/assets/images/hero-illustration.jpg";

const Index = () => {
  // Dynamic data loaded at runtime from the filesystem
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);

  const [currentSlide, setCurrentSlide] = useState(1);
  const [isHeroResetting, setIsHeroResetting] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [storySlide, setStorySlide] = useState(0);
  const [isStoriesHovering, setIsStoriesHovering] = useState(false);
  const [isStoryResetting, setIsStoryResetting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Fetch live file lists from public/ folder on mount
  useEffect(() => {
    fetchStories().then((data) => {
      setStories(data);
      setStorySlide(data.length); // Start at the middle clone set
    });
    fetchHeroSlides().then((data) => {
      setHeroSlides(data);
    });
  }, []);

  const sortedNews = [...newsItems].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const displayStories = stories.length > 0 ? [...stories, ...stories, ...stories] : [];
  const displayHeroSlides = heroSlides.length > 0 ? [heroSlides[heroSlides.length - 1], ...heroSlides, heroSlides[0]] : [];

  // Auto-scroll loop — ALL devices (Stops at end)
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let lastInteractionTime = 0;
    let animationFrameId: number;
    const scrollSpeed = 0.5;

    const scroll = () => {
      const now = Date.now();
      // Only auto-scroll if not hovering AND it's been 3000ms since last interaction
      if (!isHovering && scrollContainer && (now - lastInteractionTime > 3000)) {
        const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;

        if (scrollContainer.scrollTop >= maxScroll - 1) {
          scrollContainer.scrollTo({ top: 0, behavior: "auto" });
        } else {
          scrollContainer.scrollTop += scrollSpeed;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    const handleInteraction = () => {
      lastInteractionTime = Date.now();
    };

    scrollContainer.addEventListener('touchstart', handleInteraction, { passive: true });
    scrollContainer.addEventListener('mousedown', handleInteraction);
    scrollContainer.addEventListener('wheel', handleInteraction, { passive: true });

    animationFrameId = requestAnimationFrame(scroll);
    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('touchstart', handleInteraction);
      scrollContainer.removeEventListener('mousedown', handleInteraction);
      scrollContainer.removeEventListener('wheel', handleInteraction);
    };

  }, [isHovering]);



  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const deltaY = touchStartY - currentY;

      const atBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;
      const atTop = el.scrollTop <= 0;

      // When at edges, "lock" the news scroll and "pass" the movement to the page
      if ((atBottom && deltaY > 0) || (atTop && deltaY < 0)) {
        if (e.cancelable) e.preventDefault();
        window.scrollBy(0, deltaY); // Direct pixel-to-pixel scroll for the whole page
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

  useEffect(() => {
    if (isStoriesHovering) return;
    const interval = setInterval(() => setStorySlide((prev) => prev + 1), 3000);
    return () => clearInterval(interval);
  }, [isStoriesHovering]);

  useEffect(() => {
    if (storySlide >= stories.length * 2) {
      const timer = setTimeout(() => {
        setIsStoryResetting(true);
        setStorySlide(stories.length);
        setTimeout(() => setIsStoryResetting(false), 50);
      }, 500);
      return () => clearTimeout(timer);
    }
    if (storySlide < stories.length) {
      const timer = setTimeout(() => {
        setIsStoryResetting(true);
        setStorySlide(storySlide + stories.length);
        setTimeout(() => setIsStoryResetting(false), 50);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [storySlide, stories.length]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide((prev) => prev + 1), 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentSlide >= heroSlides.length + 1) {
      const timer = setTimeout(() => {
        setIsHeroResetting(true);
        setCurrentSlide(1);
        setTimeout(() => setIsHeroResetting(false), 50);
      }, 700);
      return () => clearTimeout(timer);
    }
    if (currentSlide < 1) {
      const timer = setTimeout(() => {
        setIsHeroResetting(true);
        setCurrentSlide(heroSlides.length);
        setTimeout(() => setIsHeroResetting(false), 50);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [currentSlide, heroSlides.length]);

  const schemeCards = [
    { title: "Economic Support (Bank Linked)", desc: "Subsidized bank loans for setting up small businesses like Kirana, Tailoring, or Laundry.", link: "/schemes", image: "/assets/images/scheme_bank.png", highlight: "Up to ₹10,00,000" },
    { title: "Shaadi Mubarak", desc: "One-time financial grant to support marriages of daughters from minority families.", link: "/schemes", image: "/assets/images/scheme_shaadi.png", highlight: "Up to ₹1,00,000" },
    { title: "Driver Empowerment Scheme", desc: "Financial assistance for purchasing commercial vehicles to earn a livelihood.", link: "/schemes", image: "/assets/images/scheme_driver.png", highlight: "Up to ₹5,00,000" },
    { title: "Skill Training Programme", desc: "Free job-oriented skill training in IT, healthcare, retail and more with placement support.", link: "/schemes", image: "/assets/images/scheme_training.png", highlight: "Free + ₹3,000/month stipend" },
  ];

  return (
    <Layout>
      <section className="bg-background py-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[170px_1fr_240px] gap-5 items-stretch">
            <aside className="order-3 lg:order-1 lg:h-[440px] flex flex-col">
              <div className="flex flex-row lg:flex-col gap-2 flex-1 h-full">
                {officials.map((official) => (
                  <div key={official.name} className="flex flex-col items-center justify-center text-center gap-1.5 border border-border rounded-xl p-2 bg-card/50 hover:bg-card transition-all overflow-hidden flex-1 py-3">
                    <div className="h-20 w-16 sm:h-24 sm:w-20 lg:h-32 lg:w-28 rounded-xl overflow-hidden border-2 border-primary/30 flex items-center justify-center bg-muted shrink-0 shadow-sm">

                      {official.photo ? (
                        <img
                          src={official.photo}
                          alt={official.name}
                          loading="lazy"
                          decoding="async"
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
                    <div className="mt-1">
                      <h4 className="text-[8px] sm:text-[9px] lg:text-[10px] font-bold text-muted-foreground uppercase tracking-tight leading-tight">{official.designation}</h4>
                      <p className="text-[10px] sm:text-[11px] lg:text-xs font-extrabold text-foreground mt-0.5 leading-tight">
                        {official.name}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </aside>

            <div className="order-1 lg:order-2 h-full lg:h-[440px]">
              <div className="relative rounded-2xl overflow-hidden bg-foreground/90 aspect-[4/3] sm:aspect-[16/9] lg:aspect-auto h-full lg:h-[440px]">
                <div
                  className={`flex h-full w-full ${isHeroResetting ? "transition-none" : "transition-transform duration-700 ease-in-out"}`}
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {displayHeroSlides.map((slide, i) => (
                    <div key={`${slide.title}-${i}`} className="min-w-full h-full relative">
                      <img
                        src={slide.image || heroIllustration}
                        alt={slide.title}
                        loading={i === 1 ? "eager" : "lazy"}
                        fetchPriority={i === 1 ? "high" : "low"}
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = heroIllustration;
                        }}
                      />

                      <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end p-4 sm:p-6 md:p-8 bg-gradient-to-t from-black/70 to-transparent pt-12">
                        <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-white leading-tight">
                          {slide.title}
                        </h2>
                        <p className="mt-1 text-[10px] md:text-xs text-white/80 max-w-lg leading-relaxed">
                          {slide.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentSlide((p) => p - 1)}
                  aria-label="Previous slide"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-40 h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white backdrop-blur-sm flex items-center justify-center"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setCurrentSlide((p) => p + 1)}
                  aria-label="Next slide"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-40 h-10 w-10 rounded-full bg-black/30 hover:bg-black/50 transition-colors text-white backdrop-blur-sm flex items-center justify-center"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <aside className="order-2 lg:order-3 max-h-[320px] lg:max-h-none lg:h-[440px] flex flex-col">
              <div className="border border-border rounded-lg overflow-hidden flex flex-col h-full">
                <div className="flex items-center justify-between bg-primary px-4 py-3 shrink-0">
                  <h3 className="flex items-center gap-2 text-[11px] font-bold text-primary-foreground uppercase tracking-wide">
                    <Megaphone className="h-5 w-5 text-primary-foreground" />
                    Latest News & Announcements
                  </h3>
                  <Link to="/media" className="text-[11px] font-bold text-primary-foreground underline flex items-center gap-1">
                    View All News <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
                <div
                  className="flex-1 overflow-y-auto relative bg-card/50 cursor-pointer select-none max-h-[260px] lg:max-h-none"
                  ref={scrollRef}
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onTouchStart={() => setIsHovering(true)}
                  onTouchEnd={() => setIsHovering(false)}
                  style={{ overscrollBehaviorY: "auto" }}

                >
                  <div className="divide-y divide-border">
                    {sortedNews.slice(0, 20).map((item, idx) => {
                      const isTopFive = (idx % sortedNews.length) < 5;
                      return (
                        <div
                          key={`${item.id}-${idx}`}
                          className={`px-3 py-3 transition-colors hover:bg-muted/40 relative group cursor-pointer`}
                        >
                          <div className="flex items-start justify-between gap-3 mb-1">
                            <p className="text-[12px] font-bold text-foreground leading-tight flex-1 group-hover:underline underline-offset-2">
                              {item.title}
                            </p>
                            {isTopFive && (
                              <Badge key={`badge-${item.id}-${idx}`} variant="default" className="text-[9px] h-4 px-1.5 bg-primary shrink-0">
                                NEW
                              </Badge>
                            )}
                          </div>
                          <p className="text-[10px] text-muted-foreground italic flex items-center gap-1.5">
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
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 gov-gradient shadow-inner">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-primary-foreground">
            {[
              { value: "4.46L", label: "Beneficiaries" },
              { value: "14", label: "Active Schemes" },
              { value: "₹850Cr+", label: "Funds" },
              { value: "33", label: "Districts Covered" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <p className="text-3xl md:text-5xl font-black tracking-tight">{stat.value}</p>
                <p className="text-[11px] md:text-sm font-bold uppercase tracking-[0.2em] mt-2 opacity-90">{stat.label}</p>
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
                className="group relative rounded-xl overflow-hidden border border-border hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 h-64 md:h-72"
              >
                {/* Full-card image */}
                <img
                  src={scheme.image}
                  alt={scheme.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient overlay - bottom only */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 to-transparent" />

                {/* Highlight badge */}
                {scheme.highlight && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg z-10">
                    {scheme.highlight}
                  </div>
                )}

                {/* Content overlaid at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                  <h3 className="text-base font-extrabold text-white leading-tight mb-1">
                    {scheme.title}
                  </h3>
                  <p className="text-[12px] text-white/80 leading-relaxed line-clamp-2 mb-4">
                    {scheme.desc}
                  </p>
                  <div className="flex justify-end">
                    <Link
                      to={scheme.link}
                      className="animate-shimmer inline-flex items-center gap-3 bg-primary text-primary-foreground text-sm font-extrabold uppercase tracking-widest py-3.5 px-10 rounded-xl shadow-lg hover:shadow-primary/20 shrink-0"
                    >
                      Apply Now <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

                {/* Full Accent Border on Hover */}
                <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl z-20" />
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

        {/* Linear Carousel Wrapper */}
        <div
          className="relative w-full max-w-6xl mx-auto px-4 overflow-hidden group"
          onMouseEnter={() => setIsStoriesHovering(true)}
          onMouseLeave={() => setIsStoriesHovering(false)}
        >
          <div
            className={`flex gap-4 md:gap-6 ${isStoryResetting ? "transition-none" : "transition-transform duration-500 ease-in-out"}`}
            style={{ transform: `translateX(calc(-${storySlide * (100 / (stories.length < 3 ? stories.length : 3))}%))` }}
          >
            {displayStories.map((story, i) => (
              <div
                key={`${story.id}-${i}`}
                className="min-w-full sm:min-w-[calc(50%-12px)] md:min-w-[calc(33.33%-16px)] h-[320px] rounded-xl overflow-hidden shadow-lg bg-card border border-border/50 relative group shrink-0"
              >
                <img
                  src={story.image}
                  alt={story.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Text overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent pt-16 flex flex-col justify-end p-5">
                  <h3 className="text-white font-bold text-base md:text-lg mb-1 leading-tight">{story.title}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-1 w-6 bg-primary rounded-full"></span>
                    <p className="text-white/80 text-[10px] md:text-xs font-medium uppercase tracking-widest">{story.location}</p>
                  </div>
                  <p className="text-white/70 text-[11px] md:text-xs leading-relaxed line-clamp-2 italic">
                    Beneficiary success story from {story.location} regarding our welfare initiatives.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Nav Arrows - positioned relative to the carousel wrapper */}
          <button
            onClick={() => setStorySlide((p) => p - 1)}
            aria-label="Previous story"
            className="absolute left-6 top-1/2 -translate-y-1/2 z-40 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all text-black border border-border opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={() => setStorySlide((p) => p + 1)}
            aria-label="Next story"
            className="absolute right-6 top-1/2 -translate-y-1/2 z-40 h-10 w-10 md:h-12 md:w-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-all text-black border border-border opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
