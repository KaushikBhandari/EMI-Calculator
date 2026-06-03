import React from 'react';
import { useStore } from '@/store/useStore';
import { formatCurrency } from '@/utils/formatters';
import { Trash2 } from 'lucide-react';

export function Dashboard() {
  const { savedCalculations, removeCalculation, currency } = useStore();

  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8">Dashboard</h1>

      <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
        <h2 className="text-xl font-bold mb-4">Saved Calculations</h2>
        
        {savedCalculations.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No saved calculations yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCalculations.map((calc) => (
              <div key={calc.id} className="border border-border p-5 rounded-xl flex flex-col justify-between hover:border-primary/50 transition-colors">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold">{calc.type}</span>
                    <button 
                      onClick={() => removeCalculation(calc.id)}
                      className="text-muted-foreground hover:text-destructive"
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Principal:</span>
                      <span className="font-medium">{formatCurrency(calc.principal, currency)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Rate:</span>
                      <span className="font-medium">{calc.rate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">Tenure:</span>
                      <span className="font-medium">{calc.tenure} months</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-border">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm font-medium">Monthly EMI:</span>
                      <span className="text-lg font-bold text-primary">{formatCurrency(calc.emi, currency)}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground mt-4 text-right">
                  {new Date(calc.date).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
