import { Target, Eye, Users, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { officials } from "@/data/mockData";

const About = () => {
  return (
    <Layout>
      <section className="gov-gradient text-primary-foreground py-10">
        <div className="container">
          <h1 className="text-3xl font-bold">About TGCMFC</h1>
          <p className="mt-2 opacity-80">Empowering Christian minorities in Telangana since 2014</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container max-w-4xl space-y-12">
          {/* Overview */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Organization Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              The Telangana Christian Minorities Finance Corporation (TGCMFC) was established by the Government
              of Telangana to promote the economic and educational development of the Christian minority community
              in the state. The corporation implements various welfare schemes covering education, housing,
              skill development, enterprise support, and health assistance.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              With a focus on inclusive growth, TGCMFC has served over 4,46,077 beneficiaries across all 33
              districts of Telangana, disbursing over ₹850 crores through various welfare programs.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-l-4 border-l-primary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-primary" /> Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  To uplift the socio-economic status of Christian minorities through targeted welfare schemes,
                  financial assistance, skill development programs, and educational support, ensuring equitable
                  development and social inclusion.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-secondary">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Eye className="h-5 w-5 text-secondary" /> Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A Telangana where every Christian minority citizen has equal access to opportunities for
                  education, employment, enterprise, and a dignified quality of life, contributing to the
                  holistic development of the state.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Officials */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Users className="h-6 w-6" /> Key Officials</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {officials.map((o) => (
                <Card key={o.name} className="text-center">
                  <CardContent className="p-6">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted text-muted-foreground text-2xl font-bold">
                      {o.name.charAt(0)}
                    </div>
                    <h3 className="font-semibold text-sm">{o.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{o.designation}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Organogram */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Building className="h-6 w-6" /> Organization Structure</h2>
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="rounded-lg bg-primary text-primary-foreground px-6 py-3 text-center font-semibold text-sm">
                    Managing Director (IAS)
                  </div>
                  <div className="h-6 w-px bg-border" />
                  <div className="grid gap-4 sm:grid-cols-3 w-full max-w-xl">
                    {["General Manager", "Chief Accounts Officer", "Deputy Director"].map((role) => (
                      <div key={role} className="rounded-lg bg-secondary text-secondary-foreground px-4 py-2.5 text-center text-xs font-medium">
                        {role}
                      </div>
                    ))}
                  </div>
                  <div className="h-6 w-px bg-border" />
                  <div className="grid gap-3 sm:grid-cols-4 w-full">
                    {["District Managers (33)", "Accounts Officers", "Field Officers", "Support Staff"].map((role) => (
                      <div key={role} className="rounded-lg bg-muted px-3 py-2 text-center text-xs font-medium text-muted-foreground">
                        {role}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reports */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Reports & RTI</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {["Annual Report 2024-25", "Annual Report 2023-24", "RTI Information", "Audit Reports"].map((report) => (
                <Card key={report} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      📄
                    </div>
                    <div>
                      <p className="font-medium text-sm">{report}</p>
                      <p className="text-xs text-muted-foreground">PDF Download</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
