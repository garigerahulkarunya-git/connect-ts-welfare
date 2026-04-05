import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

import { fetchStories, fetchHeroSlides } from "@/data/dynamicAssets";

const Gallery = () => {
  type PhotoItem = { src: string; caption: string };

  const [homepagePhotos, setHomepagePhotos] = useState<PhotoItem[]>([]);
  const [beneficiaryStories, setBeneficiaryStories] = useState<PhotoItem[]>([]);

  useEffect(() => {
    fetchHeroSlides().then((data) => {
      setHomepagePhotos(data.map(s => ({ src: s.image, caption: s.title })));
    });
    fetchStories().then((data) => {
      setBeneficiaryStories(data.map(s => ({ src: s.image, caption: `${s.title} @ ${s.location}` })));
    });
  }, []);


  const [filter, setFilter] = useState<"all" | "events" | "stories">("all");
  const [lightbox, setLightbox] = useState<{ items: PhotoItem[]; index: number } | null>(null);

  const eventsShown = filter === "all" || filter === "events";
  const storiesShown = filter === "all" || filter === "stories";

  const allCount = (eventsShown ? homepagePhotos.length : 0) + (storiesShown ? beneficiaryStories.length : 0);

  const openLightbox = (items: PhotoItem[], index: number) => setLightbox({ items, index });
  const closeLightbox = () => setLightbox(null);

  const prev = () => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, index: (lightbox.index - 1 + lightbox.items.length) % lightbox.items.length });
  };

  const next = () => {
    if (!lightbox) return;
    setLightbox({ ...lightbox, index: (lightbox.index + 1) % lightbox.items.length });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="container py-10 md:py-14">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Media & Outreach</p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3">Photo Gallery</h1>
          <p className="text-muted-foreground max-w-2xl text-base">Moments of impact — events, programmes, and the real stories of people whose lives have been transformed through TGCMFC's welfare initiatives.</p>
        </div>
      </section>

      {/* Filter */}
      <section className="container py-6 flex items-center gap-3 flex-wrap">
        {(["all", "events", "stories"] as const).map((f) => (
          <Button
            key={f}
            variant={filter === f ? "default" : "outline"}
            size="sm"
            className="rounded-full"
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All Photos" : f === "events" ? "Events & Programmes" : "Beneficiary Stories"}
          </Button>
        ))}
        <Badge variant="outline" className="ml-auto text-xs">{allCount} photos</Badge>
      </section>

      {/* Events Section */}
      {eventsShown && (
        <section className="container pb-10">
          {filter === "all" && (
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-primary" /> Events & Programmes
            </h2>
          )}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {homepagePhotos.map((photo, i) => (
              <button
                key={photo.src}
                className="group relative rounded-lg overflow-hidden bg-muted aspect-video focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => openLightbox(homepagePhotos, i)}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-xs font-semibold">{photo.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Beneficiary Stories Section */}
      {storiesShown && (
        <section className="container pb-16">
          {filter === "all" && (
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2 mt-4">
              <ImageIcon className="h-4 w-4 text-primary" /> Beneficiary Stories
            </h2>
          )}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
            {beneficiaryStories.map((photo, i) => (
              <button
                key={photo.src}
                className="group relative rounded-lg overflow-hidden bg-muted aspect-square focus:outline-none focus:ring-2 focus:ring-primary"
                onClick={() => openLightbox(beneficiaryStories, i)}
              >
                <img
                  src={photo.src}
                  alt={photo.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors" />
                <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-[10px] font-semibold leading-tight">{photo.caption}</p>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2"
            onClick={closeLightbox}
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            className="absolute left-4 text-white/80 hover:text-white p-3"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous"
          >
            <ChevronLeft className="h-8 w-8" />
          </button>

          <div className="max-w-4xl max-h-[80vh] flex flex-col items-center gap-3 px-4 sm:px-8 md:px-16" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightbox.items[lightbox.index].src}
              alt={lightbox.items[lightbox.index].caption}
              className="max-h-[60vh] sm:max-h-[70vh] max-w-full object-contain rounded-lg"
            />
            <p className="text-white/80 text-sm text-center">{lightbox.items[lightbox.index].caption}</p>
            <p className="text-white/40 text-xs">{lightbox.index + 1} / {lightbox.items.length}</p>
          </div>

          <button
            className="absolute right-4 text-white/80 hover:text-white p-3"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next"
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </div>
      )}
    </Layout>
  );
};

export default Gallery;
