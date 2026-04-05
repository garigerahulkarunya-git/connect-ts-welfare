import { useState } from "react";
import { BarChart3, Users, IndianRupee, MapPin, TrendingUp, Award, BookOpen, Briefcase, Heart, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Layout from "@/components/layout/Layout";

const schemeStats = [
  { name: "Post-Matric Scholarship", category: "Education", beneficiaries: 182400, amount: "₹312 Cr", progress: 82 },
  { name: "Driver Empowerment", category: "Enterprise", beneficiaries: 28600, amount: "₹143 Cr", progress: 64 },
  { name: "Skill Training Pro", category: "Skill Development", beneficiaries: 54200, amount: "₹27 Cr", progress: 71 },
  { name: "Economic Support (Bank Linked)", category: "Enterprise", beneficiaries: 39800, amount: "₹199 Cr", progress: 56 },
  { name: "Critical Medical Aid", category: "Health", beneficiaries: 76400, amount: "₹76 Cr", progress: 88 },
  { name: "Overseas Study Grant", category: "Education", beneficiaries: 4200, amount: "₹84 Cr", progress: 42 },
  { name: "Church Repair Grant", category: "Welfare", beneficiaries: 3800, amount: "₹11 Cr", progress: 38 },
  { name: "Civils Coaching Grant", category: "Education", beneficiaries: 12600, amount: "₹19 Cr", progress: 59 },
];

const yearlyData = [
  { year: "2021-22", beneficiaries: 68400, disbursed: 98 },
  { year: "2022-23", beneficiaries: 92700, disbursed: 142 },
  { year: "2023-24", beneficiaries: 118300, disbursed: 189 },
  { year: "2024-25", beneficiaries: 156200, disbursed: 276 },
  { year: "2025-26", beneficiaries: 446077, disbursed: 850 },
];

const districtBeneficiaries = [
  { name: "Hyderabad", beneficiaries: 84200, amount: "₹162 Cr", schemes: 9 },
  { name: "Rangareddy", beneficiaries: 61400, amount: "₹118 Cr", schemes: 8 },
  { name: "Medchal-Malkajgiri", beneficiaries: 48700, amount: "₹93 Cr", schemes: 7 },
  { name: "Warangal", beneficiaries: 38200, amount: "₹74 Cr", schemes: 8 },
  { name: "Karimnagar", beneficiaries: 32600, amount: "₹63 Cr", schemes: 7 },
  { name: "Khammam", beneficiaries: 29800, amount: "₹57 Cr", schemes: 6 },
  { name: "Nizamabad", beneficiaries: 26400, amount: "₹51 Cr", schemes: 7 },
  { name: "Adilabad", beneficiaries: 22100, amount: "₹43 Cr", schemes: 6 },
  { name: "Nalgonda", beneficiaries: 18900, amount: "₹36 Cr", schemes: 6 },
  { name: "Mahabubnagar", beneficiaries: 16800, amount: "₹32 Cr", schemes: 5 },
];

const maxBeneficiaries = Math.max(...districtBeneficiaries.map(d => d.beneficiaries));
const maxYearly = Math.max(...yearlyData.map(d => d.disbursed));

const categoryColors: Record<string, string> = {
  Education: "bg-blue-500",
  Enterprise: "bg-amber-500",
  "Skill Development": "bg-green-500",
  Health: "bg-rose-500",
  Welfare: "bg-purple-500",
};

const Statistics = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-background border-b border-border">
        <div className="container py-10 md:py-14">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Transparency & Data</p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3">Welfare Statistics & Analytics</h1>
          <p className="text-muted-foreground max-w-2xl text-base">Comprehensive data on beneficiary outreach, fund disbursements, and scheme performance across all 33 districts of Telangana.</p>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Total Beneficiaries", value: "4,46,077", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
              { label: "Amount Disbursed", value: "₹850 Cr+", icon: IndianRupee, color: "text-green-600", bg: "bg-green-50" },
              { label: "Active Schemes", value: "12", icon: BarChart3, color: "text-amber-600", bg: "bg-amber-50" },
              { label: "Districts Covered", value: "33", icon: MapPin, color: "text-purple-600", bg: "bg-purple-50" },
            ].map((item) => (
              <Card key={item.label} className="shadow-none border">
                <CardContent className="p-5 md:p-6 flex items-start gap-4">
                  <div className={`${item.bg} p-3 rounded-lg`}>
                    <item.icon className={`h-5 w-5 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-extrabold leading-none">{item.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">{item.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="pb-16">
        <div className="container">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Year-wise Trend</TabsTrigger>
              <TabsTrigger value="schemes">Scheme-wise</TabsTrigger>
              <TabsTrigger value="districts">District-wise</TabsTrigger>
            </TabsList>

            {/* Year-wise Trend */}
            <TabsContent value="overview">
              <Card className="shadow-none border">
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" /> Annual Disbursement Trend (₹ Crores)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end gap-1 sm:gap-3 md:gap-6 h-40 sm:h-48 mt-4">
                    {yearlyData.map((row) => (
                      <div key={row.year} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs font-semibold text-foreground">₹{row.disbursed}Cr</span>
                        <div
                          className="w-full rounded-t bg-primary/80 hover:bg-primary transition-colors"
                          style={{ height: `${(row.disbursed / maxYearly) * 160}px` }}
                        />
                        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{row.year}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Year</TableHead>
                          <TableHead className="text-right">Beneficiaries</TableHead>
                          <TableHead className="text-right">Disbursed</TableHead>
                          <TableHead className="text-right">Growth</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {yearlyData.map((row, i) => {
                          const growth = i === 0 ? "—" : `+${Math.round(((row.beneficiaries - yearlyData[i - 1].beneficiaries) / yearlyData[i - 1].beneficiaries) * 100)}%`;
                          return (
                            <TableRow key={row.year}>
                              <TableCell className="font-medium">{row.year}</TableCell>
                              <TableCell className="text-right">{row.beneficiaries.toLocaleString("en-IN")}</TableCell>
                              <TableCell className="text-right">₹{row.disbursed} Cr</TableCell>
                              <TableCell className="text-right">
                                <Badge variant={i === yearlyData.length - 1 ? "default" : "outline"} className="text-xs">
                                  {growth}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Scheme-wise */}
            <TabsContent value="schemes">
              <div className="grid md:grid-cols-2 gap-4">
                {schemeStats.map((scheme) => (
                  <Card key={scheme.name} className="shadow-none border">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${categoryColors[scheme.category] ?? "bg-gray-400"}`} />
                          <p className="font-semibold text-sm leading-tight">{scheme.name}</p>
                        </div>
                        <Badge variant="outline" className="text-[10px] shrink-0">{scheme.category === "Skill Development" ? "Skill Dev." : scheme.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                        <span>{scheme.beneficiaries.toLocaleString("en-IN")} beneficiaries</span>
                        <span className="font-semibold text-foreground">{scheme.amount}</span>
                      </div>
                      <Progress value={scheme.progress} className="h-1.5" />
                      <p className="text-[10px] text-muted-foreground mt-1 text-right">{scheme.progress}% of target achieved</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* District-wise */}
            <TabsContent value="districts">
              <Card className="shadow-none border">
                <CardHeader>
                  <CardTitle className="text-base">District-wise Beneficiary Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-8">
                    {districtBeneficiaries.map((d) => (
                      <div key={d.name} className="flex items-center gap-3">
                        <span className="text-[10px] sm:text-xs font-medium w-24 sm:w-36 shrink-0">{d.name}</span>
                        <div className="flex-1 bg-muted rounded-full h-4 overflow-hidden">
                          <div
                            className="h-full bg-primary/70 rounded-full"
                            style={{ width: `${(d.beneficiaries / maxBeneficiaries) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold w-20 text-right shrink-0">
                          {d.beneficiaries.toLocaleString("en-IN")}
                        </span>
                      </div>
                    ))}
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>District</TableHead>
                        <TableHead className="text-right">Beneficiaries</TableHead>
                        <TableHead className="text-right">Amount Disbursed</TableHead>
                        <TableHead className="text-right">Schemes Active</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {districtBeneficiaries.map((d) => (
                        <TableRow key={d.name}>
                          <TableCell className="font-medium">{d.name}</TableCell>
                          <TableCell className="text-right">{d.beneficiaries.toLocaleString("en-IN")}</TableCell>
                          <TableCell className="text-right">{d.amount}</TableCell>
                          <TableCell className="text-right">{d.schemes}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Category breakdown */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold mb-6">Spending by Category (2025-26)</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4">
            {[
              { label: "Education", amount: "₹415 Cr", pct: 49, color: "bg-blue-500" },
              { label: "Enterprise", amount: "₹342 Cr", pct: 40, color: "bg-amber-500" },
              { label: "Health", amount: "₹76 Cr", pct: 9, color: "bg-rose-500" },
              { label: "Skill Dev.", amount: "₹27 Cr", pct: 3, color: "bg-green-500" },
              { label: "Welfare", amount: "₹11 Cr", pct: 1, color: "bg-purple-500" },
            ].map((cat) => (
              <Card key={cat.label} className="shadow-none text-center border">
                <CardContent className="p-5">
                  <div className={`w-12 h-12 rounded-full ${cat.color} mx-auto mb-3 flex items-center justify-center`}>
                    <span className="text-white font-bold text-sm">{cat.pct}%</span>
                  </div>
                  <p className="font-bold text-sm">{cat.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{cat.amount}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Statistics;
