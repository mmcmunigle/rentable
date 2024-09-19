import { AnnualizedResults } from "../interfaces/AnnualizedResults";
import { Assumptions } from "../interfaces/Assumptions";
import { LoanDetails } from "../interfaces/LoanDetails";
import { PurchaseInfo } from "../interfaces/PurchaseInfo";
import { RentalInfo } from "../interfaces/RentalInfo";
import { ResultsSummary } from "../interfaces/ResultsSummary";
import {
  calculateAnnualizedTotalReturn,
  calculateAnnualPropertyTax,
  calculateLoanBalance,
  calculateOperatingExpenses,
  calculatePropertyValue,
  calculateTotalAnnualIncome,
  calculateTotalProfitIfSold,
} from "./annual-calcs";
import {
  calculateDownPayment,
  calculateLoanAmount,
  calculateMonthlyCashFlow,
  calculateMonthlyExpenses,
  calculateMonthlyIncome,
  calculateMonthlyOperatingExpenses,
  calculateMonthlyPI,
  calculateNoiAnnual,
  calculateNoiMonthly,
  calculateProFormaCapRate,
  calculatePurchaseCapRate,
  calculateTotalCashNeeded,
  calculateCashOnCashROI,
  calculateTotalProjectCost,
  calculateTwoPercentRule,
  calculateGrossRentMultiplier,
} from "./rental-calcs";

export function calculateTopLevelReturns(
  purchase: PurchaseInfo,
  rental: RentalInfo,
  loan: LoanDetails,
  assumptions: Assumptions
): ResultsSummary {
  const monthlyIncome = calculateMonthlyIncome(
    rental.totalGrossMonthlyRent,
    rental.otherMonthlyIncome
  );

  const monthlyOperatingExpenses = calculateMonthlyOperatingExpenses(
    rental,
    assumptions,
    purchase.annualPropertyTaxes
  );

  const downPayment = calculateDownPayment(
    purchase.purchasePrice,
    loan.downPaymentPercentage
  );

  const loanAmount = calculateLoanAmount(purchase.purchasePrice, downPayment);

  const monthlyPI = calculateMonthlyPI(
    loanAmount,
    loan.loanInterestRate,
    loan.amortizationYears
  );

  const monthlyExpenses = calculateMonthlyExpenses(
    monthlyOperatingExpenses,
    monthlyPI
  );

  const monthlyCashFlow = calculateMonthlyCashFlow(
    monthlyIncome,
    monthlyExpenses
  );

  const noiMonthly = calculateNoiMonthly(
    monthlyIncome,
    monthlyOperatingExpenses
  );

  const noiAnnual = calculateNoiAnnual(noiMonthly);

  const proFormaCapRate = calculateProFormaCapRate(
    noiMonthly,
    purchase.afterRepairValue
  );

  const totalCashNeeded = calculateTotalCashNeeded(
    downPayment,
    purchase.purchaseClosingCost,
    purchase.estimatedRepairCost,
    loan.loanFeesAndPoints,
    purchase.purchasePrice
  );

  const cashOnCashROI = calculateCashOnCashROI(
    monthlyCashFlow,
    totalCashNeeded
  );

  const purchaseCapRate = calculatePurchaseCapRate(
    noiMonthly,
    purchase.purchasePrice
  );

  const totalProjectCost = calculateTotalProjectCost(
    purchase.purchasePrice,
    purchase.purchaseClosingCost,
    purchase.estimatedRepairCost
  );

  const twoPercentRule = calculateTwoPercentRule(
    monthlyIncome,
    totalProjectCost
  );

  const grossRentMultiplier = calculateGrossRentMultiplier(
    purchase.purchasePrice,
    monthlyIncome
  );

  return {
    monthlyIncome,
    monthlyExpenses,
    monthlyCashFlow,
    monthlyOperatingExpenses,
    monthlyPI,
    proFormaCapRate,
    noiMonthly,
    noiAnnual,
    totalCashNeeded,
    totalProjectCost,
    cashOnCashROI,
    purchaseCapRate,
    twoPercentRule,
    grossRentMultiplier,
    loanAmount,
  };
}

export function calculateAnnualizedResults(
  results: ResultsSummary,
  assumptions: Assumptions,
  loan: LoanDetails,
  purchase: PurchaseInfo
): AnnualizedResults[] {
  const annualized: AnnualizedResults[] = [];

  let totalCashFlow = 0;
  const mortgagePayment = results.monthlyPI * 12;
  const initialIncome = results.monthlyIncome * 12;
  const initialOperatingExpenses =
    results.monthlyOperatingExpenses * 12 - purchase.annualPropertyTaxes;

  for (let year = 1; year <= 30; year++) {
    const totalAnnualIncome = calculateTotalAnnualIncome(
      initialIncome,
      assumptions.annualIncomeGrowth / 100,
      year
    );

    const propertyValue = calculatePropertyValue(
      purchase.afterRepairValue,
      assumptions.annualPVGrowth / 100,
      year
    );

    const annualPropertyTax =
      year === 1
        ? purchase.annualPropertyTaxes
        : calculateAnnualPropertyTax(
            propertyValue,
            assumptions.propertyTax / 100
          );

    const operatingExpenses =
      year === 1
        ? initialOperatingExpenses
        : calculateOperatingExpenses(
            initialOperatingExpenses,
            assumptions.annualExpensesGrowth / 100,
            year
          );

    const totalAnnualExpenses =
      annualPropertyTax + operatingExpenses + mortgagePayment;

    const totalAnnualCashflow = totalAnnualIncome - totalAnnualExpenses;

    // Need to keep track of the total cash flow for total profit calcs
    totalCashFlow += totalAnnualCashflow;

    const cashOnCashROI = totalAnnualCashflow / results.totalCashNeeded;

    const loanBalance = calculateLoanBalance(
      results.loanAmount,
      loan.loanInterestRate / 100,
      loan.amortizationYears,
      year
    );

    const equity = propertyValue - loanBalance;

    const salesCosts = propertyValue * (assumptions.salesExpenses / 100);
    const profitIfSold = calculateTotalProfitIfSold(
      equity,
      results.totalCashNeeded,
      totalCashFlow,
      salesCosts
    );

    const annualizedTotalReturn = calculateAnnualizedTotalReturn(
      profitIfSold,
      results.totalCashNeeded,
      year
    );

    annualized.push({
      year,
      totalAnnualIncome,
      totalAnnualExpenses,
      annualPropertyTax,
      operatingExpenses,
      mortgagePayment,
      totalAnnualCashflow,
      propertyValue,
      equity,
      loanBalance,
      cashOnCashROI,
      profitIfSold,
      annualizedTotalReturn,
    });
  }

  return annualized;
}
