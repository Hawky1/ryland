import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Download, ExternalLink, BookOpen, FileText, Video, Megaphone, MessageSquare, Presentation, FolderOpen } from "lucide-react";
import { useState } from "react";

const categoryIcons: Record<string, React.ElementType> = {
  "Marketing Materials": Megaphone,
  "Sales Funnels": Presentation,
  "E-books / Digital Products": BookOpen,
  "Training / Education": Video,
  "Promotional Assets": FileText,
  "Scripts / Talking Points": MessageSquare,
  "Event Materials": FolderOpen,
};

const ALL = "All";

export default function PortalResources() {
  const [filter, setFilter] = useState(ALL);

  const { data: resources, isLoading } = useQuery({
    queryKey: ["portal-resources"],
    queryFn: async () => {
      const { data } = await supabase
        .from("resources")
        .select("*")
        .order("sort_order", { ascending: true });
      return data ?? [];
    },
  });

  const categories = [ALL, ...new Set(resources?.map((r) => r.category) ?? [])];
  const filtered = filter === ALL ? resources : resources?.filter((r) => r.category === filter);

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Resources</h1>
        <p className="text-sm text-muted-foreground mt-1">Tools and materials to help you generate more referrals.</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      ) : !filtered?.length ? (
        <div className="py-16 text-center">
          <BookOpen className="h-10 w-10 text-muted-foreground/40 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-medium">No resources found</p>
          <p className="text-xs text-muted-foreground mt-1">Resources will appear here as they become available.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((resource) => {
            const Icon = categoryIcons[resource.category] ?? FileText;
            return (
              <Card key={resource.id} className="border-border/60 group hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-foreground leading-tight">{resource.title}</h3>
                      <Badge variant="secondary" className="mt-1 text-[10px] font-normal">{resource.category}</Badge>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {resource.description ?? "Resource description coming soon."}
                  </p>
                  {resource.is_placeholder ? (
                    <Button variant="outline" size="sm" className="w-full text-xs" disabled>
                      Coming Soon
                    </Button>
                  ) : resource.file_url ? (
                    <Button asChild variant="outline" size="sm" className="w-full text-xs gap-1.5">
                      <a href={resource.file_url} target="_blank" rel="noopener noreferrer">
                        <Download className="h-3.5 w-3.5" /> Download
                      </a>
                    </Button>
                  ) : resource.external_url ? (
                    <Button asChild variant="outline" size="sm" className="w-full text-xs gap-1.5">
                      <a href={resource.external_url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-3.5 w-3.5" /> View Resource
                      </a>
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full text-xs" disabled>
                      Coming Soon
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
