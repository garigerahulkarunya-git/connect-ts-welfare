import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { newsItems } from "@/data/mockData";

const Media = () => {
  const [tab, setTab] = useState("all");

  const filtered = useMemo(() => {
    if (tab === "all") return newsItems;
    return newsItems.filter((n) => n.type === tab);
  }, [tab]);

  return (
    <Layout>
      <section className="gov-gradient text-primary-foreground py-10">
        <div className="container">
          <h1 className="text-3xl font-bold">Media & News</h1>
          <p className="mt-2 opacity-80">Stay updated with the latest news, events, and stories</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
              <TabsTrigger value="event">Events</TabsTrigger>
              <TabsTrigger value="success">Success Stories</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value={tab} className="mt-6">
              {filtered.length === 0 ? (
                <p className="text-center py-16 text-muted-foreground">No items in this category yet.</p>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((item) => (
                    <Card key={item.id} className="overflow-hidden transition-shadow hover:shadow-lg cursor-pointer">
                      <div className="h-40 bg-muted flex items-center justify-center text-muted-foreground text-4xl">
                        {item.type === "news" ? "📰" : item.type === "event" ? "📅" : item.type === "success" ? "🌟" : "🖼️"}
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">{item.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </span>
                        </div>
                        <h3 className="font-semibold leading-snug mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.excerpt}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Media;
