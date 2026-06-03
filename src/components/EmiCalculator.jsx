import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SliderInput } from './SliderInput';
import { calculateEMI, generateAmortizationSchedule } from '@/calculators/emi';
import { EmiPieChart } from '@/charts/EmiPieChart';
import { AmortizationLineChart } from '@/charts/AmortizationLineChart';
import { formatCurrency } from '@/utils/formatters';
import { useStore } from '@/store/useStore';

import { exportToCSV, exportToPDF } from '@/utils/exportUtils';

const AnimatedNumber = ({ value, currencyFormatter, currency }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      key={value} // Forces re-render animation when value changes
      className="block"
    >
      {currencyFormatter ? formatCurrency(value, currency) : value}
    </motion.span>
  );
};

export function EmiCalculator({ defaultPrincipal = 1000000, defaultRate = 8.5, defaultTenure = 60 }) {
  const { currency } = useStore();
  const [principal, setPrincipal] = useState(defaultPrincipal);
  const [rate, setRate] = useState(defaultRate);
  const [tenure, setTenure] = useState(defaultTenure);
  
  const [results, setResults] = useState({ emi: 0, totalInterest: 0, totalPayment: 0 });
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const res = calculateEMI(principal, rate, tenure);
    setResults(res);
    setSchedule(generateAmortizationSchedule(principal, rate, tenure, res.emi));
  }, [principal, rate, tenure]);

  const handleExportCSV = () => {
    exportToCSV(schedule, 'amortization_schedule.csv');
  };

  const handleExportPDF = () => {
    exportToPDF(schedule, 'amortization_schedule.pdf', currency);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Input & Summary Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Controls */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-card-foreground">Loan Details</h2>
            <button 
              onClick={() => {
                const { addCalculation } = useStore.getState();
                addCalculation({
                  type: 'EMI',
                  principal,
                  rate,
                  tenure,
                  emi: results.emi,
                  totalInterest: results.totalInterest,
                  totalPayment: results.totalPayment
                });
                alert('Calculation Saved to Dashboard!');
              }}
              className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80 flex items-center gap-1"
            >
              <span>Save</span>
            </button>
          </div>
          
          <SliderInput
            label="Loan Amount"
            value={principal}
            onChange={setPrincipal}
            min={10000}
            max={50000000}
            step={10000}
            isCurrency={true}
          />

          <SliderInput
            label="Interest Rate (p.a.)"
            value={rate}
            onChange={setRate}
            min={1}
            max={30}
            step={0.1}
            symbol="%"
          />

          <SliderInput
            label="Loan Tenure (Months)"
            value={tenure}
            onChange={setTenure}
            min={1}
            max={360}
            step={1}
          />
        </div>

        {/* Results */}
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground font-medium mb-1">Monthly EMI</p>
              <h3 className="text-4xl font-extrabold text-primary">
                <AnimatedNumber value={results.emi} currencyFormatter currency={currency} />
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div>
                <p className="text-muted-foreground font-medium mb-1">Principal Amount</p>
                <h4 className="text-xl font-bold text-card-foreground">
                  <AnimatedNumber value={principal} currencyFormatter currency={currency} />
                </h4>
              </div>
              <div>
                <p className="text-muted-foreground font-medium mb-1">Total Interest</p>
                <h4 className="text-xl font-bold text-destructive">
                  <AnimatedNumber value={results.totalInterest} currencyFormatter currency={currency} />
                </h4>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p className="text-muted-foreground font-medium mb-1">Total Amount Payable</p>
              <h4 className="text-2xl font-bold text-card-foreground">
                <AnimatedNumber value={results.totalPayment} currencyFormatter currency={currency} />
              </h4>
            </div>
          </div>
        </div>
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm lg:col-span-1">
          <h3 className="text-lg font-bold mb-4">Breakdown</h3>
          <EmiPieChart principal={principal} totalInterest={results.totalInterest} />
        </div>
        <div className="bg-card p-6 rounded-2xl border border-border shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold mb-4">Amortization Schedule</h3>
          <AmortizationLineChart schedule={schedule} />
        </div>
      </div>
      
      {/* Amortization Table */}
      <div id="amortization-table" className="bg-card p-6 rounded-2xl border border-border shadow-sm overflow-x-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Detailed Schedule</h3>
          <div className="flex gap-2">
            <button onClick={handleExportCSV} className="text-sm px-3 py-1.5 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">Export CSV</button>
            <button onClick={handleExportPDF} className="text-sm px-3 py-1.5 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">Export PDF</button>
          </div>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-secondary/50">
            <tr>
              <th className="px-6 py-3 rounded-l-lg">Month</th>
              <th className="px-6 py-3">EMI</th>
              <th className="px-6 py-3">Principal</th>
              <th className="px-6 py-3">Interest</th>
              <th className="px-6 py-3 rounded-r-lg">Balance</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.month} className="border-b border-border last:border-0">
                <td className="px-6 py-4 font-medium">{row.month}</td>
                <td className="px-6 py-4">{formatCurrency(row.emi, currency)}</td>
                <td className="px-6 py-4 text-emerald-500">{formatCurrency(row.principalPaid, currency)}</td>
                <td className="px-6 py-4 text-rose-500">{formatCurrency(row.interestPaid, currency)}</td>
                <td className="px-6 py-4 font-medium">{formatCurrency(row.balance, currency)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
