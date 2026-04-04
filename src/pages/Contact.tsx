import { useState, useMemo } from "react";
import { Search, Phone, Mail, MapPin, Clock, Globe, ArrowRight, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { districts } from "@/data/mockData";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return districts.filter((d) => {
      const matchName = t(`district_name_${d.name}`, { defaultValue: d.name }).toLowerCase().includes(search.toLowerCase());
      const matchOfficer = t(`district_officer_${d.name}`, { defaultValue: d.officer }).toLowerCase().includes(search.toLowerCase());
      return matchName || matchOfficer;
    });
  }, [search, t]);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="container py-10 md:py-16">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{t("contact_breadcrumb")}</p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">{t("contact_hero_title")}</h1>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
            {t("contact_hero_subtitle")}
          </p>
        </div>
      </section>

      {/* Head Office */}
      <section className="section-padding">
        <div className="container">
          <Card className="border-l-4 border-l-primary shadow-none mb-12">
            <CardContent className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{t("contact_head_office")}</h2>
                  <p className="text-xs text-muted-foreground">{t("contact_headquarters")}</p>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm mb-1">{t("contact_address_label")}</p>
                    <p className="text-sm text-muted-foreground">{t("contact_address_value")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm mb-1">{t("contact_phone_label")}</p>
                    <a href="tel:+914023456789" className="text-sm text-primary hover:underline block">040-2345-6789</a>
                    <a href="tel:+914023456790" className="text-sm text-primary hover:underline block">040-2345-6790</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm mb-1">{t("contact_email_label")}</p>
                    <a href="mailto:info@tgcmfc.gov.in" className="text-sm text-primary hover:underline block">info@tgcmfc.gov.in</a>
                    <a href="mailto:md@tgcmfc.gov.in" className="text-sm text-primary hover:underline block">md@tgcmfc.gov.in</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold text-sm mb-1">{t("contact_hours_label")}</p>
                    <p className="text-sm text-muted-foreground">{t("contact_hours_weekday")}</p>
                    <p className="text-sm text-muted-foreground">{t("contact_hours_saturday")}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { icon: Phone, label: t("contact_action_call"), desc: "1800-123-4567", action: "tel:18001234567" },
              { icon: Mail, label: t("contact_action_email"), desc: "support@tgcmfc.gov.in", action: "mailto:support@tgcmfc.gov.in" },
              { icon: Globe, label: t("contact_action_portal"), desc: "tgcmfc.gov.in", action: "#" },
              { icon: MapPin, label: t("contact_action_visit"), desc: t("contact_action_directions"), action: "#" },
            ].map((item) => (
              <a key={item.label} href={item.action}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer shadow-none h-full">
                  <CardContent className="p-4 text-center">
                    <div className="mx-auto h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <p className="font-semibold text-sm">{item.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* District Directory */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">{t("contact_directory_title")}</h2>
              <p className="text-sm text-muted-foreground">{t("contact_directory_subtitle")}</p>
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t("contact_search_placeholder")}
                className="pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center py-16 text-muted-foreground">{t("contact_no_results")}</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((d) => (
                <Card key={d.name} className="transition-shadow hover:shadow-md shadow-none group">
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-base">{t(`district_name_${d.name}`, { defaultValue: d.name })}</h3>
                        <p className="text-sm text-muted-foreground">{t(`district_officer_${d.name}`, { defaultValue: d.officer })}</p>
                      </div>
                      <Badge variant="outline" className="text-[10px] shrink-0">DMWO</Badge>
                    </div>
                    <div className="space-y-2 mb-4">
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
                        <span className="text-xs text-muted-foreground">{t(`district_address_${d.name}`, { defaultValue: d.address })}</span>
                      </div>
                    </div>
                    <a href={`tel:${d.phone}`}>
                      <Button size="sm" className="w-full gap-1 rounded-full">
                        <Phone className="h-3 w-3" /> {t("contact_call_now")}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-3xl">
          <Card className="shadow-none">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-bold mb-2">{t("contact_cta_title")}</h2>
              <p className="text-sm text-muted-foreground mb-6">
                {t("contact_cta_desc")}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/grievance">
                  <Button className="gap-1 rounded-full">{t("contact_cta_grievance")} <ArrowRight className="h-4 w-4" /></Button>
                </Link>
                <Link to="/about">
                  <Button variant="outline" className="rounded-full">{t("contact_cta_about")}</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
