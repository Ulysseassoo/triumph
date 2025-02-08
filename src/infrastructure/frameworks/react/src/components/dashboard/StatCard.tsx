import { Card, CardHeader, CardTitle, CardContent } from "../ui/Card";

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: React.ReactNode;
  className?: string; 
}

export const StatCard = ({
  title,
  value,
  description,
  icon,
  className
}: StatCardProps) => {
  return (
    <Card className={`bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-200 w-full ${className || ''}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-triumph-red">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};