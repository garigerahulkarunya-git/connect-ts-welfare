import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, CheckCircle2, Download, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Layout from "@/components/layout/Layout";
import SchemeCard from "@/components/shared/SchemeCard";
import { schemes } from "@/data/mockData";

const SchemeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const scheme = schemes.find((s) => s.id === id);

  if (!scheme) {
    return (
      <Layout>
        <div className="container section-padding text-center">
          <h1 className="text-2xl font-bold">Scheme not found</h1>
          <Link to="/schemes"><Button className="mt-4">Back to Schemes</Button></Link>
        </div>
      </Layout>
    );
  }

  const related = schemes.filter((s) => s.id !== scheme.id && s.category === scheme.category).slice(0, 2);
  const otherRelated = related.length < 2
    ? [...related, ...schemes.filter((s) => s.id !== scheme.id && s.category !== scheme.category).slice(0, 2 - related.length)]
    : related;

  return (
    <Layout>
      {/* Header */}
      <section className="gov-gradient text-primary-foreground py-10">
        <div className="container">
          <Link to="/schemes" className="inline-flex items-center gap-1 text-sm opacity-80 hover:opacity-100 mb-4">
            <ArrowLeft className="h-4 w-4" /> Back to Schemes
          </Link>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <h1 className="text-2xl font-bold md:text-3xl">{scheme.title}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <Badge variant={scheme.status === "OPEN" ? "secondary" : "outline"} className="text-sm">
                  {scheme.status}
                </Badge>
                <span className="flex items-center gap-1 text-sm opacity-80">
                  <Calendar className="h-4 w-4" /> Deadline: {new Date(scheme.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </span>
                <span className="text-sm font-semibold">{scheme.amount}</span>
              </div>
            </div>
            {scheme.status === "OPEN" && (
              <Link to="/apply">
                <Button size="lg" variant="secondary" className="font-semibold">Apply Now</Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardHeader><CardTitle>About this Scheme</CardTitle></CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{scheme.description}</p>
                </CardContent>
              </Card>

              {/* Eligibility */}
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-primary" /> Eligibility Criteria</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {scheme.eligibility.map((e, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{e}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Steps */}
              <Card>
                <CardHeader><CardTitle>Application Process</CardTitle></CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    {scheme.steps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                          {i + 1}
                        </span>
                        <span className="text-sm pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>

              {/* FAQs */}
              <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><HelpCircle className="h-5 w-5 text-accent" /> FAQs</CardTitle></CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    {scheme.faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`faq-${i}`}>
                        <AccordionTrigger className="text-left text-sm">{faq.q}</AccordionTrigger>
                        <AccordionContent className="text-sm text-muted-foreground">{faq.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Documents */}
              <Card>
                <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4" /> Required Documents</CardTitle></CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {scheme.documents.map((doc, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Download */}
              <Card>
                <CardHeader><CardTitle className="text-base flex items-center gap-2"><Download className="h-4 w-4" /> Downloads</CardTitle></CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <FileText className="h-4 w-4" /> Application Form (PDF)
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                    <FileText className="h-4 w-4" /> Scheme Guidelines (PDF)
                  </Button>
                </CardContent>
              </Card>

              {scheme.status === "OPEN" && (
                <Link to="/apply">
                  <Button className="w-full" size="lg">Apply for this Scheme</Button>
                </Link>
              )}
            </div>
          </div>

          {/* Related */}
          {otherRelated.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6">Related Schemes</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {otherRelated.map((s) => <SchemeCard key={s.id} scheme={s} />)}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default SchemeDetail;
