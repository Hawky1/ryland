import { Card, CardContent } from "@/components/ui/card";
import { Calculator, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PortalCalculator() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Waterfall Calculator</h1>
        <p className="text-sm text-muted-foreground mt-1">Estimate your potential earnings based on referral volume.</p>
      </div>

      <Card className="border-border/60 overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col items-center justify-center py-20 px-8 text-center bg-gradient-to-b from-muted/20 to-muted/50">
            <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Affiliate Waterfall Calculator</h2>
            <p className="text-sm text-muted-foreground max-w-md mb-6 leading-relaxed">
              Our interactive earnings calculator is being built to help you project your commission income based on your referral volume and deal sizes. Check back soon.
            </p>
            <Button variant="outline" className="gap-2" disabled>
              Coming Soon <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Earnings overview placeholder */}
      <Card className="border-border/60">
        <CardContent className="py-6 px-6">
          <h3 className="text-sm font-semibold text-foreground mb-4">Quick Earnings Estimate</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { referrals: "5 / month", estimate: "$2,500 – $7,500" },
              { referrals: "15 / month", estimate: "$7,500 – $22,500" },
              { referrals: "30 / month", estimate: "$15,000 – $45,000" },
            ].map((tier) => (
              <div key={tier.referrals} className="rounded-lg bg-muted/30 border border-border/40 p-4 text-center">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-1">{tier.referrals}</p>
                <p className="text-lg font-semibold text-foreground">{tier.estimate}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            *Estimates based on average deal sizes and commission rates. Actual earnings may vary.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
