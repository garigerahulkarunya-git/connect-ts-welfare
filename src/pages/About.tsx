import { useState } from "react";
import { Target, Eye, Users, Building, CheckCircle, MapPin, ArrowRight, ExternalLink, FileText, Download, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Layout from "@/components/layout/Layout";
import { officials } from "@/data/mockData";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="container py-10 md:py-16">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{t("about_breadcrumb")}</p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">{t("about_hero_title")}</h1>
          <p className="text-muted-foreground max-w-2xl text-base md:text-lg">
            {t("about_hero_subtitle")}
          </p>
        </div>
      </section>

      {/* Sovereign Mandate */}
      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-bold mb-4">{t("about_mandate_title")}</h2>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                {t("about_mandate_desc")}
              </p>
              <ul className="space-y-3">
                {[
                  t("about_mandate_item1", { defaultValue: "Implementation of socio-economic development schemes." }),
                  t("about_mandate_item2", { defaultValue: "Provision of educational loans and merit scholarships." }),
                  t("about_mandate_item3", { defaultValue: "Support for self-employment through bank-linked subsidies." }),
                  t("about_mandate_item4", { defaultValue: "Skill development training for minority youth." }),
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="rounded-xl overflow-hidden bg-muted h-56 md:h-72 flex items-center justify-center">
                <div className="text-center">
                  <Building className="h-16 w-16 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">{t("about_building_label")}</p>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground rounded-lg px-4 py-2 text-center">
                <p className="text-lg font-bold">{t("about_estd_label")}</p>
                <p className="text-xs">{t("about_state_mandated")}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-l-4 border-l-primary bg-primary/5 shadow-none">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Eye className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-bold">{t("about_vision_title")}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t("about_vision_desc")}
                </p>
                <button className="text-xs text-primary font-semibold uppercase tracking-wider hover:underline">
                  {t("about_vision_link")}
                </button>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary bg-secondary/5 shadow-none">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <Target className="h-5 w-5 text-secondary" />
                  <h3 className="text-xl font-bold">{t("about_mission_title")}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {t("about_mission_desc")}
                </p>
                <button className="text-xs text-secondary font-semibold uppercase tracking-wider hover:underline">
                  {t("about_mission_link")}
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Board of Trustees */}
      <section className="section-padding">
        <div className="container text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">{t("about_board_eyebrow")}</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-10">{t("about_board_title")}</h2>
          <div className="grid gap-8 sm:grid-cols-3 max-w-3xl mx-auto">
            {officials.map((person, i) => (
              <div key={person.name} className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-3xl font-bold text-primary mb-4 border-4 border-background shadow-md overflow-hidden relative">
                  {person.photo ? (
                    <img 
                      src={person.photo} 
                      alt={person.name} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.parentElement!.innerText = person.name.split(" ").pop()?.charAt(0) || "";
                      }}
                    />
                  ) : (
                    <span>{t(`official_name_${i}`, { defaultValue: person.name }).split(" ").pop()?.charAt(0)}</span>
                  )}
                </div>
                <h3 className="font-bold text-sm">{t(`official_name_${i}`, { defaultValue: person.name })}</h3>
                <p className="text-xs text-muted-foreground mt-1">{t(`official_desig_${i}`, { defaultValue: person.designation })}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Administrative Hierarchy */}
      <section className="py-16 bg-muted/30">
        <div className="container text-center max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{t("about_hierarchy_title")}</h2>
          <p className="text-sm text-muted-foreground mb-10">{t("about_hierarchy_subtitle")}</p>

          <div className="flex flex-col items-center space-y-4">
            <div className="gov-gradient text-primary-foreground px-8 py-3 rounded-full font-semibold text-sm">
              {t("about_hierarchy_govt")}
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="border border-border px-6 py-2.5 rounded-full text-sm font-medium bg-background">
              {t("about_hierarchy_mwd")}
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="border-2 border-primary px-6 py-2.5 rounded-full text-sm font-semibold text-primary bg-background">
              {t("about_hierarchy_board")}
            </div>
            <div className="h-8 w-px bg-border" />
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { key: "about_hierarchy_dmwo", val: "District Minority Welfare Officers" },
                { key: "about_hierarchy_admin", val: "Admin & Accounting Wing" },
                { key: "about_hierarchy_ict", val: "Information & Communication" }
              ].map((role) => (
                <div key={role.key} className="border border-border px-4 py-2 rounded-full text-xs font-medium bg-background">
                  {t(role.key, { defaultValue: role.val })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quantifiable Social Progress */}
      <section className="section-padding">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                {t("about_progress_title").split(" ").map((w,i)=><span key={i}>{w} {i===0&&<br/>}</span>)}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {t("about_progress_desc")}
              </p>
              <Button className="gap-2 rounded-full">
                {t("about_progress_btn")} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Card className="text-center shadow-none">
                <CardContent className="p-6">
                  <p className="text-4xl font-extrabold text-foreground">33</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{t("about_districts_label")}</p>
                  <p className="text-xs text-muted-foreground mt-2">{t("about_districts_desc")}</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-none">
                <CardContent className="p-6">
                  <p className="text-4xl font-extrabold text-foreground">85k+</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{t("about_beneficiaries_label")}</p>
                  <p className="text-xs text-muted-foreground mt-2">{t("about_beneficiaries_desc")}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Citizen's Charter */}
      <section className="py-12 bg-muted/30">
        <div className="container max-w-4xl">
          <Card className="border-t-4 border-t-primary shadow-none">
            <CardContent className="p-6 md:p-8">
              <h2 className="text-xl font-bold mb-1">{t("about_charter_title")}</h2>
              <p className="text-xs text-muted-foreground mb-6">{t("about_charter_subtitle")}</p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs uppercase tracking-wider">{t("about_charter_col_service")}</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider">{t("about_charter_col_time")}</TableHead>
                    <TableHead className="text-xs uppercase tracking-wider">{t("about_charter_col_officer")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="text-sm">{t("about_charter_row1_service")}</TableCell>
                    <TableCell className="text-sm">{t("about_charter_row1_time")}</TableCell>
                    <TableCell className="text-sm">{t("about_charter_row1_officer")}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-sm">{t("about_charter_row2_service")}</TableCell>
                    <TableCell className="text-sm">{t("about_charter_row2_time")}</TableCell>
                    <TableCell className="text-sm">{t("about_charter_row2_officer")}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="text-sm">{t("about_charter_row3_service")}</TableCell>
                    <TableCell className="text-sm">{t("about_charter_row3_time")}</TableCell>
                    <TableCell className="text-sm">{t("about_charter_row3_officer")}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Transparency Archive + RTI */}
      <section className="section-padding">
        <div className="container max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">{t("about_transparency_title")}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              {[
                { key: "about_doc1", val: "Annual Report 2025-26", icon: "📄" },
                { key: "about_doc2", val: "Policy Framework", icon: "📋" },
                { key: "about_doc3", val: "Budget Allocation", icon: "💰" },
                { key: "about_doc4", val: "Audit Reports", icon: "📊" },
              ].map((doc) => (
                <Card key={doc.key} className="cursor-pointer hover:shadow-md transition-shadow shadow-none">
                  <CardContent className="p-4 flex items-center gap-3">
                    <span className="text-2xl">{doc.icon}</span>
                    <div>
                      <p className="font-medium text-sm">{t(doc.key, { defaultValue: doc.val })}</p>
                      <p className="text-xs text-muted-foreground">{t("about_pdf_download")}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className="bg-muted/50 shadow-none">
              <CardContent className="p-5">
                <Badge variant="outline" className="mb-3 text-xs">{t("about_rti_badge")}</Badge>
                <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                  {t("about_rti_desc")}
                </p>
                <p className="text-xs font-semibold mb-1">{t("about_rti_name")}</p>
                <p className="text-xs text-muted-foreground">{t("about_rti_title")}</p>
                <p className="text-xs text-primary mt-2">rti@tgcmfc.gov.in</p>
                <Button variant="outline" size="sm" className="mt-4 w-full text-xs gap-1">
                  <ExternalLink className="h-3 w-3" /> {t("about_rti_btn")}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Moments of Impact (Gallery) */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">{t("about_gallery_title")}</h2>
              <p className="text-sm text-muted-foreground">{t("about_gallery_subtitle")}</p>
            </div>
            <Button variant="ghost" size="sm" className="text-primary gap-1">
              {t("about_gallery_btn")} <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl bg-muted h-40 md:h-48 flex items-center justify-center">
                <span className="text-3xl">🖼️</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12">
        <div className="container max-w-3xl">
          <Card className="bg-muted/30 shadow-none">
            <CardContent className="p-8 text-center">
              <h2 className="text-xl font-bold mb-2">{t("about_cta_title")}</h2>
              <p className="text-sm text-muted-foreground mb-6">
                {t("about_cta_desc")}
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link to="/schemes">
                  <Button variant="outline" className="gap-1 rounded-full">{t("about_cta_schemes")}</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="gap-1 rounded-full">{t("about_cta_contact")}</Button>
                </Link>
                <Link to="/grievance">
                  <Button className="gap-1 rounded-full">{t("about_cta_faq")}</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
};

export default About;
