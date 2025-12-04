import { Product } from '@/types/product';
import { getProductStatus } from '@/utils/dateUtils';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface ExpirationChartProps {
  products: Product[];
}

export const ExpirationChart = ({ products }: ExpirationChartProps) => {
  const statusCounts = products.reduce(
    (acc, product) => {
      const status = getProductStatus(product.expirationDate);
      acc[status]++;
      return acc;
    },
    { good: 0, warning: 0, expired: 0 }
  );

  const data = [
    { name: 'Bom', value: statusCounts.good, color: 'hsl(142, 71%, 45%)' },
    { name: 'Vencendo', value: statusCounts.warning, color: 'hsl(38, 92%, 50%)' },
    { name: 'Vencido', value: statusCounts.expired, color: 'hsl(0, 84%, 60%)' },
  ].filter(item => item.value > 0);

  if (data.length === 0) {
    return (
      <div className="card-ios p-6 flex items-center justify-center h-48">
        <p className="text-muted-foreground text-sm">Nenhum produto cadastrado</p>
      </div>
    );
  }

  return (
    <div className="card-ios p-4">
      <h3 className="font-semibold text-foreground mb-2">Visão Geral</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={70}
              paddingAngle={4}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value, entry: any) => (
                <span className="text-sm text-muted-foreground">
                  {value} ({entry.payload.value})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
