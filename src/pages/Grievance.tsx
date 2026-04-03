import { useState } from "react";
import Layout from "@/components/layout/Layout";
import GrievanceSidebar from "@/components/grievance/GrievanceSidebar";
import GrievanceSubmit from "@/components/grievance/GrievanceSubmit";
import GrievanceTrack from "@/components/grievance/GrievanceTrack";
import GrievanceDashboard from "@/components/grievance/GrievanceDashboard";

export type GrievanceTab = "submit" | "track" | "dashboard";

const Grievance = () => {
  const [tab, setTab] = useState<GrievanceTab>("submit");

  return (
    <Layout>
      {/* Top Nav Bar */}
      <div className="border-b bg-white sticky top-0 z-30">
        <div className="container flex items-center justify-between h-12">
          <span className="font-bold text-lg tracking-tight text-foreground">TGCMFC Portal</span>
          <div className="flex items-center gap-6">
            {(["submit", "track", "dashboard"] as GrievanceTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`text-sm font-medium capitalize pb-1 border-b-2 transition-colors ${
                  tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {t === "submit" ? "Submit" : t === "track" ? "Track" : "Dashboard"}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex min-h-[calc(100vh-180px)]">
        {/* Sidebar */}
        <GrievanceSidebar activeTab={tab} onTabChange={setTab} />

        {/* Main Content */}
        <main className="flex-1 bg-muted/30 p-6 md:p-8 overflow-y-auto">
          {tab === "submit" && <GrievanceSubmit />}
          {tab === "track" && <GrievanceTrack />}
          {tab === "dashboard" && <GrievanceDashboard />}
        </main>
      </div>
    </Layout>
  );
};

export default Grievance;
