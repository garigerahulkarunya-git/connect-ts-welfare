import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import SchemeCard from "@/components/shared/SchemeCard";
import Layout from "@/components/layout/Layout";
import { schemes } from "@/data/mockData";

const categories = ["All", "Education", "Housing", "Skill Development", "Enterprise", "Welfare", "Health"];
const statuses = ["All", "OPEN", "CLOSED"];

const Schemes = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const filtered = useMemo(() => {
    return schemes.filter((s) => {
      const matchSearch = s.title.toLowerCase().includes(search.toLowerCase()) || s.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "All" || s.category === category;
      const matchStatus = status === "All" || s.status === status;
      return matchSearch && matchCat && matchStatus;
    });
  }, [search, category, status]);

  return (
    <Layout>
      <section className="gov-gradient text-primary-foreground py-10">
        <div className="container">
          <h1 className="text-3xl font-bold">All Schemes</h1>
          <p className="mt-2 opacity-80">Browse welfare schemes available for Christian minorities in Telangana</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {/* Search & filters */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground mr-1 self-center">Category:</span>
              {categories.map((c) => (
                <Button key={c} size="sm" variant={category === c ? "default" : "outline"} onClick={() => setCategory(c)}>
                  {c}
                </Button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-muted-foreground mr-1 self-center">Status:</span>
              {statuses.map((s) => (
                <Button key={s} size="sm" variant={status === s ? "default" : "outline"} onClick={() => setStatus(s)}>
                  {s}
                </Button>
              ))}
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <p className="text-lg">No schemes found matching your criteria.</p>
              <Button variant="outline" className="mt-4" onClick={() => { setSearch(""); setCategory("All"); setStatus("All"); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Schemes;
