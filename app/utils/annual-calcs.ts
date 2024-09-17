// Total Annual Income
export function calculateTotalAnnualIncome(
  initialIncome: number,
  incomeGrowthRate: number,
  year: number
): number {
  return initialIncome * Math.pow(1 + incomeGrowthRate, year - 1);
}

// Operating Expenses
export function calculateOperatingExpenses(
  initialExpenses: number,
  expensesGrowthRate: number,
  year: number
): number {
  return initialExpenses * Math.pow(1 + expensesGrowthRate, year - 1);
}

// Annual Property Tax
export function calculateAnnualPropertyTax(
  propertyValue: number,
  taxRate: number
): number {
  return propertyValue * taxRate;
}

// Total Annual Expenses
// export function calculateOperatingExpenses(
//   initialOperatingExpenses: number,
//   annualExpensesGrowth: number,
//   managementFees: number
// ): number {
//   return initialOperatingExpenses * Math.pow(1 + annualExpensesGrowth);
// }

// Mortgage Payment (Assuming fixed-rate mortgage)
export function calculateMortgagePayment(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number
): number {
  const monthlyInterestRate = annualInterestRate / 12;
  const numberOfPayments = loanTermYears * 12;
  return (
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))
  );
}

// Total Annual Cash Flow
export function calculateTotalAnnualCashFlow(
  annualIncome: number,
  annualExpenses: number,
  mortgagePayment: number
): number {
  return annualIncome - (annualExpenses + mortgagePayment * 12);
}

// Cash on Cash ROI
export function calculateCashOnCashROI(
  annualCashFlow: number,
  totalCashInvested: number
): number {
  return totalCashInvested === 0 ? 0 : annualCashFlow / totalCashInvested;
}

// Property Value (Assuming annual growth)
export function calculatePropertyValue(
  initialPropertyValue: number,
  propertyValueGrowthRate: number,
  year: number
): number {
  return initialPropertyValue * Math.pow(1 + propertyValueGrowthRate, year);
}

// Equity
export function calculateEquity(
  propertyValue: number,
  loanBalance: number
): number {
  return propertyValue - loanBalance;
}

// Loan Balance (Assuming loan is amortized)
export function calculateLoanBalance(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
  year: number
): number {
  const monthlyInterestRate = annualInterestRate / 12;
  const numberOfPayments = loanTermYears * 12;
  const numberOfPaymentsMade = year * 12;

  const remainingBalance =
    (loanAmount *
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) -
        Math.pow(1 + monthlyInterestRate, numberOfPaymentsMade))) /
    (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

  return remainingBalance;
}

// Total Profit if Sold
export function calculateTotalProfitIfSold(
  propertyValue: number,
  cashSpentOnPurchase: number,
  cashFlow: number,
  salesCosts: number
): number {
  return propertyValue - cashSpentOnPurchase + cashFlow - salesCosts;
}

// Total Return (Used for Calculating Annualized Return)
export function calculateTotalReturn(
  annualCashFlows: number[],
  propertyValueAtEnd: number,
  totalCashInvested: number
): number {
  const totalCashFlow = annualCashFlows.reduce(
    (sum, cashFlow) => sum + cashFlow,
    0
  );
  return totalCashFlow + propertyValueAtEnd - totalCashInvested;
}

// Annualized Total Return
export function calculateAnnualizedTotalReturn(
  totalReturn: number,
  totalCashInvested: number,
  year: number
): number {
  return totalCashInvested === 0
    ? 0
    : Math.pow(1 + totalReturn / totalCashInvested, 1 / year) - 1;
}
