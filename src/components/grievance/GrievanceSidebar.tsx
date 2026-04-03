import { LayoutDashboard, FileText, Building2, FileCheck, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { GrievanceTab } from "@/pages/Grievance";

interface Props {
  activeTab: GrievanceTab;
  onTabChange: (tab: GrievanceTab) => void;
}

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", tab: "dashboard" as GrievanceTab },
  { icon: FileText, label: "My Grievances", tab: "track" as GrievanceTab },
  { icon: Building2, label: "Departmental Info", tab: null },
  { icon: FileCheck, label: "SLA Guidelines", tab: null },
  { icon: HelpCircle, label: "Support", tab: null },
];

const GrievanceSidebar = ({ activeTab, onTabChange }: Props) => {
  return (
    <aside className="hidden md:flex flex-col w-56 border-r bg-white shrink-0">
      <div className="p-5 border-b">
        <h2 className="font-bold text-primary text-sm uppercase tracking-wider">Redressal</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Institutional Desk</p>
      </div>

      <nav className="flex-1 py-3 px-3 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = item.tab === activeTab || (item.tab === "track" && activeTab === "submit");
          return (
            <button
              key={item.label}
              onClick={() => item.tab && onTabChange(item.tab)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-3 mt-auto border-t">
        <Button
          onClick={() => onTabChange("submit")}
          className="w-full bg-foreground text-background hover:bg-foreground/90 font-semibold text-xs tracking-wider"
        >
          + New Request
        </Button>
        <div className="flex gap-4 mt-3 px-1">
          <span className="text-[10px] text-muted-foreground">⚖ Legal</span>
          <span className="text-[10px] text-muted-foreground">🔒 Privacy</span>
        </div>
      </div>
    </aside>
  );
};

export default GrievanceSidebar;
