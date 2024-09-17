import React from "react";
import { ScrollArea, Table, Text } from "@mantine/core";
import useResultsStore from "@/app/state-managment/results-store";

// Example data with all columns from "Year" to "Total Return"
// const data = [
//   {
//     year: 1,
//     totalAnnualIncome: 62440.68,
//     totalAnnualExpenses: 73861.98,
//     annualPropertyTax: 5375.17,
//     operatingExpenses: 26071.12,
//     mortgagePayment: 18750.43,
//     totalAnnualCashflow: -13811.32,
//     cashOnCashROI: -0.0462,
//     propertyValue: 871072.26,
//     equity: 429256.62,
//     loanBalance: 592176.97,
//     profitIfSold: 18597.14,
//     annualizedTotalReturn: 0.052,
//     totalReturn: 46723.12,
//   },
//   {
//     year: 2,
//     totalAnnualIncome: 69167.59,
//     totalAnnualExpenses: 73528.21,
//     annualPropertyTax: 3114.67,
//     operatingExpenses: 23798.24,
//     mortgagePayment: 20500.88,
//     totalAnnualCashflow: -12888.61,
//     cashOnCashROI: 0.0249,
//     propertyValue: 842509.52,
//     equity: 318165.37,
//     loanBalance: 613524.76,
//     profitIfSold: 24789.64,
//     annualizedTotalReturn: 0.061,
//     totalReturn: 52412.56,
//   },
//   {
//     year: 3,
//     totalAnnualIncome: 57423.45,
//     totalAnnualExpenses: 82963.76,
//     annualPropertyTax: 4928.45,
//     operatingExpenses: 21976.32,
//     mortgagePayment: 19234.56,
//     totalAnnualCashflow: -14456.23,
//     cashOnCashROI: -0.0651,
//     propertyValue: 899321.57,
//     equity: 387154.49,
//     loanBalance: 578654.32,
//     profitIfSold: 15645.78,
//     annualizedTotalReturn: 0.048,
//     totalReturn: 45612.31,
//   },
//   {
//     year: 4,
//     totalAnnualIncome: 71234.12,
//     totalAnnualExpenses: 78412.89,
//     annualPropertyTax: 4820.45,
//     operatingExpenses: 28523.45,
//     mortgagePayment: 17854.32,
//     totalAnnualCashflow: -11452.76,
//     cashOnCashROI: 0.0332,
//     propertyValue: 910236.85,
//     equity: 402165.89,
//     loanBalance: 562987.23,
//     profitIfSold: 31245.12,
//     annualizedTotalReturn: 0.071,
//     totalReturn: 59687.45,
//   },
//   {
//     year: 5,
//     totalAnnualIncome: 64567.89,
//     totalAnnualExpenses: 75892.43,
//     annualPropertyTax: 5234.67,
//     operatingExpenses: 26754.89,
//     mortgagePayment: 18987.12,
//     totalAnnualCashflow: -13124.54,
//     cashOnCashROI: 0.0158,
//     propertyValue: 890754.67,
//     equity: 369876.43,
//     loanBalance: 590987.54,
//     profitIfSold: 22345.89,
//     annualizedTotalReturn: 0.055,
//     totalReturn: 48912.78,
//   },
//   // More entries for years 6 to 30...
// ];

const InvestmentTable = () => {
  const annualizedData = useResultsStore((store) => store.annualized);

  if (!annualizedData) return <Text>Complete and Submit Form</Text>;

  const rows = annualizedData.map((row, index) => (
    <Table.Tr key={index}>
      <Table.Td>{row.year}</Table.Td>
      <Table.Td>{row.totalAnnualIncome.toFixed(2).toLocaleString()}</Table.Td>
      <Table.Td>{row.totalAnnualExpenses.toFixed(2).toLocaleString()}</Table.Td>
      <Table.Td>{row.annualPropertyTax.toFixed(2).toLocaleString()}</Table.Td>
      <Table.Td>{row.operatingExpenses.toFixed(2).toLocaleString()}</Table.Td>
      <Table.Td>{row.mortgagePayment.toFixed(2).toLocaleString()}</Table.Td>
      <Table.Td>{row.totalAnnualCashflow.toFixed(2).toLocaleString()}</Table.Td>
      <Table.Td>{(row.cashOnCashROI * 100).toFixed(2)}%</Table.Td>
      <Table.Td>{row.propertyValue.toFixed(2).toLocaleString()}</Table.Td>
      <Table.Td>{row.equity.toFixed(2).toLocaleString()}</Table.Td>
      <Table.Td>{row.loanBalance.toFixed(2).toLocaleString()}</Table.Td>
      <Table.Td>{row.profitIfSold.toFixed(2).toLocaleString()}</Table.Td>
      <Table.Td>{(row.annualizedTotalReturn * 100).toFixed(2)}%</Table.Td>
    </Table.Tr>
  ));

  return (
    <ScrollArea w="100%" h={600} type="always">
      <Table
        striped
        highlightOnHover
        withTableBorder
        horizontalSpacing="md"
        stickyHeader
        h={100}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Year</Table.Th>
            <Table.Th>Annual Income</Table.Th>
            <Table.Th>Annual Expenses</Table.Th>
            <Table.Th>Annual Property Tax</Table.Th>
            <Table.Th>Operating Expenses</Table.Th>
            <Table.Th>Mortgage Payment</Table.Th>
            <Table.Th>Annual Cashflow</Table.Th>
            <Table.Th>Cash on Cash ROI</Table.Th>
            <Table.Th>Property Value</Table.Th>
            <Table.Th>Equity</Table.Th>
            <Table.Th>Loan Balance</Table.Th>
            <Table.Th>Profit If Sold</Table.Th>
            <Table.Th>Annualized Total Return</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
};

export default InvestmentTable;
