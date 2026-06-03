import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { useStore } from '@/store/useStore';
import { formatCurrency } from '@/utils/formatters';

const COLORS = ['#3b82f6', '#f43f5e']; // primary and destructive/accent colors

export function EmiPieChart({ principal, totalInterest }) {
  const { currency } = useStore();

  const data = [
    { name: 'Principal', value: principal },
    { name: 'Interest', value: totalInterest },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card text-card-foreground border border-border p-3 rounded-lg shadow-lg">
          <p className="font-semibold mb-1">{payload[0].name}</p>
          <p className="text-sm">{formatCurrency(payload[0].value, currency)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
