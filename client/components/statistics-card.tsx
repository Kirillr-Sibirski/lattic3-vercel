import { Card, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import math from "mathjs";

interface StatisticsCardProps {
  healthRatio: number;
  netWorth: number;
  netAPR: number;
  isLoading: boolean;
}

export function StatisticsCard({ healthRatio, netWorth, netAPR, isLoading }: StatisticsCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formattedHealthRatio = healthRatio === -1 || healthRatio === Infinity ? '∞' : healthRatio.toFixed(2);

  if (isLoading) {
    return (
      <Card className="bg-gradient-to-br from-background via-accent/5 to-background border border-accent/10">
        <CardContent className="flex justify-center items-center min-h-[200px]">
          <LoadingSpinner />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-background via-accent/5 to-background border border-accent/10">
      <CardContent className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group flex flex-col items-center p-6 rounded-lg bg-background/50 border border-accent/10">
            <div className="text-2xl font-semibold leading-none tracking-tight">
              Health Ratio
            </div>
            <div className={`text-4xl font-bold transition-colors duration-300 ${
              healthRatio < 1.5 && healthRatio !== -1 && healthRatio !== Infinity
                ? 'text-destructive' 
                : 'text-emerald-500'
            } `}>
              {formattedHealthRatio}
            </div>
          </div>

          <div className="group flex flex-col items-center p-6 rounded-lg border border-accent/10">
            <div className="text-2xl font-semibold leading-none tracking-tight">
              Net Worth
            </div>
            <div className="text-4xl font-bold text-foreground 0">
              {formatCurrency(netWorth)}
            </div>
          </div>

          <div className="group flex flex-col items-center p-6 rounded-lg bg-background/50 border border-accent/10">
            <div className="text-2xl font-semibold leading-none tracking-tight">
              Net APR
            </div>
            <div className={`text-4xl font-bold transition-colors duration-300 ${
              netAPR > 0 ? 'text-emerald-500' : 'text-destructive'
            }`}>
              {netAPR.toFixed(1)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatisticsCard;