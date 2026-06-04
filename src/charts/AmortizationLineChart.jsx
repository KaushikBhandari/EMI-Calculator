import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useStore } from '@/store/useStore';
import { formatCurrency } from '@/utils/formatters';

export function AmortizationLineChart({ schedule }) {
  const { currency } = useStore();

  // Downsample data if it's too large to prevent chart from lagging
  const data = schedule.filter((_, i) => i % Math.max(1, Math.floor(schedule.length / 50)) === 0 || i === schedule.length - 1);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card text-card-foreground border border-border p-3 rounded-lg shadow-lg">
          <p className="font-semibold mb-2">Month {label}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value, currency)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[350px] w-full mt-8 overflow-x-auto custom-scrollbar">
      <div className="min-w-[600px] h-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPrincipal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
            <XAxis dataKey="month" tick={{ fill: '#64748b' }} tickMargin={10} />
            <YAxis 
              tickFormatter={(value) => `${value >= 1000 ? (value / 1000) + 'k' : value}`}
              tick={{ fill: '#64748b' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="balance" name="Remaining Balance" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBalance)" />
            <Area type="monotone" dataKey="cumulativePrincipal" name="Principal Paid (Cumulative)" stroke="#10b981" fillOpacity={1} fill="url(#colorPrincipal)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
