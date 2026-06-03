export function calculateSIP(monthlyInvestment, expectedReturnRate, tenureYears) {
  if (!monthlyInvestment || !expectedReturnRate || !tenureYears) {
    return { investedAmount: 0, estimatedReturns: 0, totalValue: 0 };
  }

  const i = expectedReturnRate / 100 / 12;
  const n = tenureYears * 12;
  const investedAmount = monthlyInvestment * n;
  
  // SIP Formula: M = P × ({[1 + i]^n - 1} / i) × (1 + i)
  const totalValue = monthlyInvestment * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  const estimatedReturns = totalValue - investedAmount;

  return {
    investedAmount: Math.round(investedAmount),
    estimatedReturns: Math.round(estimatedReturns),
    totalValue: Math.round(totalValue)
  };
}
