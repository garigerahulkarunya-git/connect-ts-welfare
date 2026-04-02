import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { Scheme } from "@/data/mockData";

const SchemeCard = ({ scheme }: { scheme: Scheme }) => {
  return (
    <Card className="flex flex-col h-full transition-shadow hover:shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base leading-snug">{scheme.title}</CardTitle>
          <Badge variant={scheme.status === "OPEN" ? "default" : "secondary"} className="shrink-0">
            {scheme.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground leading-relaxed">{scheme.shortDescription}</p>
        <div className="mt-3 flex items-center gap-2">
          <Badge variant="outline" className="text-xs">{scheme.category}</Badge>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs font-medium text-secondary">{scheme.amount}</span>
        </div>
      </CardContent>
      <CardFooter className="gap-2 pt-0">
        <Link to={`/schemes/${scheme.id}`} className="flex-1">
          <Button variant="outline" size="sm" className="w-full">View Details</Button>
        </Link>
        {scheme.status === "OPEN" && (
          <Link to="/apply" className="flex-1">
            <Button size="sm" className="w-full">Apply</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

export default SchemeCard;
