import { Assumptions } from "../interfaces/Assumptions";
import { RentalInfo } from "../interfaces/RentalInfo";

// Monthly Income
export function calculateMonthlyIncome(
  rent: number,
  otherIncome: number
): number {
  return rent + otherIncome;
}

export function calculateMonthlyOperatingExpenses(
  rentalInfo: RentalInfo,
  assumptions: Assumptions,
  annualPropertyTaxes: number
): number {
  // Extract values from rentalInfo and assumptions
  const {
    monthlyInsurance,
    electricity,
    garbage,
    waterAndSewer,
    hoas,
    otherMonthlyExpenses,
  } = rentalInfo;

  const {
    repairsAndMaintenance,
    vacancy,
    capitalExpenditures,
    managementFees,
  } = assumptions;

  // Assume repairsAndMaintenance is a percentage of total income, calculate monthly value
  const miscCosts =
    ((repairsAndMaintenance + vacancy + capitalExpenditures + managementFees) /
      100) *
    rentalInfo.totalGrossMonthlyRent;

  // Calculate total monthly expenses
  const monthlyOperatingCosts =
    annualPropertyTaxes / 12 + // Convert annual property taxes to monthly
    monthlyInsurance +
    electricity +
    garbage +
    waterAndSewer +
    hoas +
    otherMonthlyExpenses +
    miscCosts;

  return monthlyOperatingCosts;
}

export function calculateMonthlyPI(
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number
): number {
  // Convert annual interest rate to monthly and decimal form
  const monthlyInterestRate = annualInterestRate / 12 / 100;

  // Calculate the total number of payments (loan term in months)
  const numberOfPayments = loanTermYears * 12;

  // Calculate the monthly principal and interest (P&I) payment
  const monthlyPI =
    (loanAmount * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));

  return monthlyPI;
}

export function calculateMonthlyExpenses(
  monthlyOperatingCosts: number,
  monthlyPI: number
): number {
  const monthlyExpenses = monthlyOperatingCosts + monthlyPI;

  return monthlyExpenses;
}

// Monthly Cash Flow
export function calculateMonthlyCashFlow(
  monthlyIncome: number,
  monthlyExpenses: number
): number {
  return monthlyIncome - monthlyExpenses;
}

// Pro Forma Cap Rate
export function calculateProFormaCapRate(
  noiAnnual: number,
  propertyValue: number
): number {
  return propertyValue === 0 ? 0 : noiAnnual / propertyValue;
}

// Net Operating Income (NOI) - Monthly
export function calculateNoiMonthly(income: number, expenses: number): number {
  return income - expenses;
}

// Net Operating Income (NOI) - Annual
export function calculateNoiAnnual(noiMonthly: number): number {
  return noiMonthly * 12;
}

// Total Cash Needed
export function calculateTotalCashNeeded(
  downPayment: number,
  closingCosts: number,
  repairCosts: number,
  loanFeesAndPoints: number,
  purchasePrice: number
): number {
  const closingCash = downPayment + closingCosts + repairCosts;
  return closingCash + loanFeesAndPoints * (0.01 * purchasePrice);
}

// Cash On Cash ROI
export function calculateCashOnCashROI(
  monthlyCashFlow: number,
  totalCashInvested: number
): number {
  return totalCashInvested === 0
    ? 0
    : (monthlyCashFlow * 12) / totalCashInvested;
}

// Purchase Cap Rate
export function calculatePurchaseCapRate(
  noiAnnual: number,
  purchasePrice: number
): number {
  return purchasePrice === 0 ? 0 : noiAnnual / purchasePrice;
}

// Total Project Cost
export function calculateTotalProjectCost(
  purchasePrice: number,
  closingCosts: number,
  repairCosts: number
): number {
  return purchasePrice + closingCosts + repairCosts;
}

export function calculateDownPayment(
  purchasePrice: number,
  downPaymentPercentage: number
): number {
  return (purchasePrice * downPaymentPercentage) / 100;
}

// Loan Amount
export function calculateLoanAmount(
  purchasePrice: number,
  downPayment: number
): number {
  return purchasePrice - downPayment;
}

// After Repair Value (ARV)
export function calculateAfterRepairValue(
  purchasePrice: number,
  repairCosts: number,
  marketGrowthRate: number
): number {
  return purchasePrice + repairCosts * marketGrowthRate;
}

// Loan Points
export function calculateLoanPoints(
  loanAmount: number,
  pointsRate: number
): number {
  return loanAmount * pointsRate;
}

export function calculateTwoPercentRule(
  monthlyIncome: number,
  totalProjectCost: number
): number {
  return monthlyIncome / totalProjectCost;
}

export function calculateGrossRentMultiplier(
  purchasePrice: number,
  monthlyIncome: number
): number {
  return monthlyIncome / (monthlyIncome * 12);
}
