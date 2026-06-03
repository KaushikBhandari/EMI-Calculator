/**
 * Calculates the Equated Monthly Installment (EMI)
 * @param {number} principal - Loan amount
 * @param {number} annualRate - Annual interest rate (percentage)
 * @param {number} tenureMonths - Loan tenure in months
 * @returns {object} EMI details including emi, totalInterest, totalPayment
 */
export function calculateEMI(principal, annualRate, tenureMonths) {
  if (!principal || !annualRate || !tenureMonths) {
    return { emi: 0, totalInterest: 0, totalPayment: principal || 0 };
  }

  const monthlyRate = annualRate / 12 / 100;
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
    (Math.pow(1 + monthlyRate, tenureMonths) - 1);

  const totalPayment = emi * tenureMonths;
  const totalInterest = totalPayment - principal;

  return {
    emi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
  };
}

/**
 * Generates the Amortization Schedule
 * @param {number} principal
 * @param {number} annualRate
 * @param {number} tenureMonths
 * @param {number} emi
 * @returns {Array} Array of monthly breakdown objects
 */
export function generateAmortizationSchedule(principal, annualRate, tenureMonths, emi) {
  if (!principal || !annualRate || !tenureMonths || !emi) return [];

  const monthlyRate = annualRate / 12 / 100;
  let balance = principal;
  let cumulativePrincipal = 0;
  let cumulativeInterest = 0;
  const schedule = [];

  for (let month = 1; month <= tenureMonths; month++) {
    const interestForMonth = balance * monthlyRate;
    const principalForMonth = emi - interestForMonth;
    balance = balance - principalForMonth;
    
    cumulativePrincipal += principalForMonth;
    cumulativeInterest += interestForMonth;

    // Handle rounding issues for the last month
    if (balance < 0) balance = 0;

    schedule.push({
      month,
      emi: Math.round(emi),
      principalPaid: Math.round(principalForMonth),
      interestPaid: Math.round(interestForMonth),
      cumulativePrincipal: Math.round(cumulativePrincipal),
      cumulativeInterest: Math.round(cumulativeInterest),
      balance: Math.round(balance),
    });
  }

  return schedule;
}
