import React, { useState } from 'react';
import { calculateEMI } from '@/calculators/emi';
import { formatCurrency } from '@/utils/formatters';
import { useStore } from '@/store/useStore';

export function CompareLoans() {
  const { currency } = useStore();
  const [loan1, setLoan1] = useState({ principal: 1000000, rate: 8.5, tenure: 60 });
  const [loan2, setLoan2] = useState({ principal: 1000000, rate: 9.5, tenure: 60 });

  const res1 = calculateEMI(loan1.principal, loan1.rate, loan1.tenure);
  const res2 = calculateEMI(loan2.principal, loan2.rate, loan2.tenure);

  const diffEMI = Math.abs(res1.emi - res2.emi);
  const diffInterest = Math.abs(res1.totalInterest - res2.totalInterest);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <div className="text-center mt-8 mb-12">
        <h1 className="text-4xl font-extrabold mb-4">Compare Loans</h1>
        <p className="text-muted-foreground text-lg">Compare two different loan scenarios and find the best option.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {[
          { title: "Loan Option 1", state: loan1, setter: setLoan1, res: res1 },
          { title: "Loan Option 2", state: loan2, setter: setLoan2, res: res2 }
        ].map((loan, idx) => (
          <div key={idx} className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <h2 className="text-xl font-bold mb-6">{loan.title}</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">Loan Amount</label>
                <input 
                  type="number" 
                  value={loan.state.principal} 
                  onChange={(e) => loan.setter({...loan.state, principal: Number(e.target.value)})}
                  className="w-full bg-secondary border-none rounded-md px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">Interest Rate (%)</label>
                <input 
                  type="number" step="0.1"
                  value={loan.state.rate} 
                  onChange={(e) => loan.setter({...loan.state, rate: Number(e.target.value)})}
                  className="w-full bg-secondary border-none rounded-md px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground block mb-2">Tenure (Months)</label>
                <input 
                  type="number" 
                  value={loan.state.tenure} 
                  onChange={(e) => loan.setter({...loan.state, tenure: Number(e.target.value)})}
                  className="w-full bg-secondary border-none rounded-md px-3 py-2 text-foreground focus:ring-2 focus:ring-primary outline-none"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-border space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly EMI:</span>
                <span className="font-bold text-primary">{formatCurrency(loan.res.emi, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Interest:</span>
                <span className="font-bold text-destructive">{formatCurrency(loan.res.totalInterest, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Payment:</span>
                <span className="font-bold">{formatCurrency(loan.res.totalPayment, currency)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-primary/10 border border-primary/20 p-6 rounded-2xl text-center">
        <h3 className="text-xl font-bold text-primary mb-2">Comparison Summary</h3>
        <p className="text-muted-foreground mb-4">
          Loan {res1.totalPayment < res2.totalPayment ? '1' : '2'} is cheaper overall.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-8">
          <div>
            <p className="text-sm text-muted-foreground">Difference in EMI</p>
            <p className="text-2xl font-bold">{formatCurrency(diffEMI, currency)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Difference in Total Interest</p>
            <p className="text-2xl font-bold text-emerald-500">{formatCurrency(diffInterest, currency)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
