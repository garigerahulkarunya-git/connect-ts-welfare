import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TrendingUp, Clock, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { sampleGrievances, grievanceDistrictStats, districts, schemes } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(var(--primary))", "hsl(var(--muted-foreground))"];

const GrievanceDashboard = () => {
  const { t } = useTranslation();
  const totalG = 12450;
  const resolvedG = 9820;
  const pendingG = 2630;

  const pieData = [
    { name: t("grievance_track_resolved"), value: resolvedG },
    { name: t("grievance_dash_pending"), value: pendingG },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl md:text-5xl font-black text-foreground uppercase leading-tight tracking-tight">
          {t("grievance_submit_title")}
        </h1>
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground mt-1">
          {t("grievance_dash_subtitle")}
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{t("grievance_dash_total")}</p>
            <p className="text-3xl font-black mt-1">{totalG.toLocaleString()}</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" /> {t("grievance_dash_month_trend")}
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{t("grievance_track_resolved")}</p>
            <p className="text-3xl font-black text-green-600 mt-1">{resolvedG.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("grievance_dash_success_rate")}</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{t("grievance_dash_pending")}</p>
            <p className="text-3xl font-black text-amber-600 mt-1">{pendingG.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">{t("grievance_dash_awaiting")}</p>
          </CardContent>
        </Card>
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-5">
            <p className="text-[10px] font-semibold uppercase tracking-widest opacity-80">{t("grievance_dash_avg_time")}</p>
            <p className="mt-1"><span className="text-3xl font-black">5.2</span> <span className="text-sm">{t("grievance_dash_days")}</span></p>
            <p className="text-xs opacity-70 mt-1">{t("grievance_dash_sla")}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4 flex flex-wrap items-end gap-4">
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            ⊞ {t("grievance_dash_filters")}
          </span>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Select>
              <SelectTrigger className="text-sm"><SelectValue placeholder={t("grievance_dash_all_districts")} /></SelectTrigger>
              <SelectContent>
                {districts.map((d) => (
                  <SelectItem key={d.name} value={d.name}>{t(`district_name_${d.name}`, { defaultValue: d.name })}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="text-sm"><SelectValue placeholder={t("grievance_dash_all_schemes")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("grievance_dash_all_schemes")}</SelectItem>
                {schemes.map(s => (
                  <SelectItem key={s.id} value={s.id}>{t(`scheme_title_${s.id}`, { defaultValue: s.title })}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="text-sm"><SelectValue placeholder={t("grievance_dash_all_statuses")} /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("grievance_dash_all_statuses")}</SelectItem>
                <SelectItem value="submitted">{t("grievance_track_submitted")}</SelectItem>
                <SelectItem value="review">{t("grievance_track_review")}</SelectItem>
                <SelectItem value="resolved">{t("grievance_track_resolved")}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="text-xs font-bold uppercase tracking-wider">{t("grievance_dash_apply")}</Button>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-5 gap-4 mb-6">
        {/* Bar Chart */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">{t("grievance_dash_dist_chart")}</CardTitle>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{t("grievance_dash_dist_analysis")}</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={grievanceDistrictStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="complaints" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="lg:col-span-2 bg-primary text-primary-foreground">
          <CardHeader className="pb-0">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-primary-foreground">{t("grievance_dash_status_chart")}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-0">
            <div className="relative">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={70} dataKey="value" stroke="none">
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={i === 0 ? "#22c55e" : "rgba(255,255,255,0.2)"} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-black">78%</span>
                <span className="text-[9px] uppercase tracking-widest opacity-70">{t("grievance_track_resolved")}</span>
              </div>
            </div>
            <div className="w-full space-y-2 mt-2 text-sm">
              <div className="flex justify-between"><span className="text-green-300 font-semibold">{t("grievance_track_resolved")}</span><span className="font-bold">9,820</span></div>
              <div className="flex justify-between"><span className="opacity-70 font-semibold">{t("grievance_dash_pending")}</span><span className="font-bold">1,400</span></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SLA Framework */}
      <div className="mb-6">
        <h2 className="text-lg font-black uppercase tracking-wider mb-4">{t("grievance_dash_sla_framework")}</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                <span className="font-black text-primary text-sm">L1</span>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider">{t("grievance_dash_l1_title")}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("grievance_dash_l1_desc")}
                </p>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> <span className="font-semibold">{t("grievance_dash_l1_guarantee")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                <span className="font-black text-primary text-sm">L2</span>
              </div>
              <div>
                <h3 className="font-bold text-sm uppercase tracking-wider">{t("grievance_dash_l2_title")}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {t("grievance_dash_l2_desc")}
                </p>
                <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" /> <span className="font-semibold">{t("grievance_dash_l2_deadline")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GrievanceDashboard;
