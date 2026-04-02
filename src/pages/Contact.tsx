import { useState, useMemo } from "react";
import { Search, Phone, Mail, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { districts } from "@/data/mockData";

const Contact = () => {
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return districts.filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.officer.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <Layout>
      <section className="gov-gradient text-primary-foreground py-10">
        <div className="container">
          <h1 className="text-3xl font-bold">Contact & District Directory</h1>
          <p className="mt-2 opacity-80">Find your nearest TGCMFC office and officer</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          {/* Head Office */}
          <Card className="mb-10 border-l-4 border-l-primary">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4">Head Office</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Address</p>
                    <p className="text-sm text-muted-foreground">Minorities Bhawan, 5th Floor, Nampally, Hyderabad - 500001, Telangana</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Phone</p>
                    <a href="tel:+914023456789" className="text-sm text-primary hover:underline">040-2345-6789</a>
                    <br />
                    <a href="tel:+914023456790" className="text-sm text-primary hover:underline">040-2345-6790</a>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-sm">Email</p>
                    <a href="mailto:info@tgcmfc.gov.in" className="text-sm text-primary hover:underline">info@tgcmfc.gov.in</a>
                    <br />
                    <a href="mailto:md@tgcmfc.gov.in" className="text-sm text-primary hover:underline">md@tgcmfc.gov.in</a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* District Directory */}
          <h2 className="text-xl font-bold mb-4">District Directory</h2>
          <div className="relative max-w-md mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search district or officer..."
              className="pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => (
              <Card key={d.name} className="transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <h3 className="font-bold text-base mb-2">{d.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{d.officer}</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                      <a href={`tel:${d.phone}`} className="text-sm text-primary hover:underline">{d.phone}</a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                      <a href={`mailto:${d.email}`} className="text-sm text-primary hover:underline">{d.email}</a>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground mt-0.5" />
                      <span className="text-xs text-muted-foreground">{d.address}</span>
                    </div>
                  </div>
                  <a href={`tel:${d.phone}`}>
                    <Button size="sm" className="w-full mt-4 gap-1"><Phone className="h-3 w-3" /> Call Now</Button>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
