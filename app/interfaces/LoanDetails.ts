export interface LoanDetails {
  cashPurchase: boolean;
  downPaymentPercentage: number;
  loanInterestRate: number;
  pointsChargedByLender: number;
  otherChargesFromLender: number;
  loanFeesAndPoints: number;
  interestOnly: boolean;
  amortizationYears: number;
  capRate: number;
}
