import React, { useState, useEffect } from 'react';
import { calculateSIP } from '@/calculators/sip';
import { formatCurrency } from '@/utils/formatters';
import { useStore } from '@/store/useStore';
import { SliderInput } from '@/components/SliderInput';
import { EmiPieChart } from '@/charts/EmiPieChart';
import { Helmet } from 'react-helmet-async';

export function SipCalculator() {
  const { currency } = useStore();
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [rate, setRate] = useState(12);
  const [tenure, setTenure] = useState(10);
  const [results, setResults] = useState({ investedAmount: 0, estimatedReturns: 0, totalValue: 0 });

  useEffect(() => {
    setResults(calculateSIP(monthlyInvestment, rate, tenure));
  }, [monthlyInvestment, rate, tenure]);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      <Helmet>
        <title>SIP Calculator | FinCal</title>
        <meta name="description" content="Calculate your Systematic Investment Plan (SIP) returns easily." />
      </Helmet>
      
      <div className="text-center mt-8 mb-12">
        <h1 className="text-4xl font-extrabold mb-4">SIP Calculator</h1>
        <p className="text-muted-foreground text-lg">Calculate the future value of your monthly mutual fund investments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <h2 className="text-xl font-bold mb-6">Investment Details</h2>
          <SliderInput label="Monthly Investment" value={monthlyInvestment} onChange={setMonthlyInvestment} min={500} max={1000000} step={500} isCurrency={true} />
          <SliderInput label="Expected Return Rate (p.a)" value={rate} onChange={setRate} min={1} max={30} step={0.1} symbol="%" />
          <SliderInput label="Time Period (Years)" value={tenure} onChange={setTenure} min={1} max={40} step={1} />
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground font-medium mb-1">Total Value</p>
              <h3 className="text-4xl font-extrabold text-primary">{formatCurrency(results.totalValue, currency)}</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-muted-foreground font-medium mb-1">Invested Amount</p>
                <h4 className="text-xl font-bold">{formatCurrency(results.investedAmount, currency)}</h4>
              </div>
              <div>
                <p className="text-muted-foreground font-medium mb-1">Est. Returns</p>
                <h4 className="text-xl font-bold text-emerald-500">{formatCurrency(results.estimatedReturns, currency)}</h4>
              </div>
            </div>
          </div>
          <div className="mt-8">
             {/* Re-using EmiPieChart but renaming the props logic visually */}
             <EmiPieChart principal={results.investedAmount} totalInterest={results.estimatedReturns} />
          </div>
        </div>
      </div>
    </div>
  );
}
