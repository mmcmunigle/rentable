import React, { useEffect, useState } from "react";
import {
  Accordion,
  Box,
  ScrollArea,
  Stack,
  Table,
  Text,
  Checkbox,
  Group,
  SimpleGrid,
} from "@mantine/core";
import useResultsStore from "@/app/state-managment/results-store";

// type ColumnNames = keyof typeof AnnualizedResults

const InvestmentTable = () => {
  const annualizedData = useResultsStore((store) => store.annualized);

  // State to manage column visibility
  const [visibleColumns, setVisibleColumns] = useState({
    year: true,
    totalAnnualIncome: true,
    totalAnnualExpenses: true,
    annualPropertyTax: true,
    operatingExpenses: true,
    mortgagePayment: true,
    totalAnnualCashflow: true,
    cashOnCashROI: true,
    propertyValue: true,
    equity: true,
    loanBalance: true,
    profitIfSold: true,
    annualizedTotalReturn: true,
  });

  useEffect(() => {
    const columnVisbility = localStorage.getItem("table-columns-vis");
    if (columnVisbility) setVisibleColumns(JSON.parse(columnVisbility));
  }, []);

  const handleCheckboxChange = (column: any) => {
    const newColumnVisibility = {
      ...visibleColumns,
      [column]: !visibleColumns[column],
    };
    setVisibleColumns((prev) => newColumnVisibility);
    localStorage.setItem(
      "table-columns-vis",
      JSON.stringify(newColumnVisibility)
    );
  };

  if (!annualizedData) return <Text>Complete and Submit Form</Text>;

  const rows = annualizedData.map((row, index) => (
    <Table.Tr key={index}>
      {visibleColumns.year && <Table.Td>{row.year}</Table.Td>}
      {visibleColumns.totalAnnualIncome && (
        <Table.Td>{row.totalAnnualIncome.toFixed(2).toLocaleString()}</Table.Td>
      )}
      {visibleColumns.totalAnnualExpenses && (
        <Table.Td>
          {row.totalAnnualExpenses.toFixed(2).toLocaleString()}
        </Table.Td>
      )}
      {visibleColumns.annualPropertyTax && (
        <Table.Td>{row.annualPropertyTax.toFixed(2).toLocaleString()}</Table.Td>
      )}
      {visibleColumns.operatingExpenses && (
        <Table.Td>{row.operatingExpenses.toFixed(2).toLocaleString()}</Table.Td>
      )}
      {visibleColumns.mortgagePayment && (
        <Table.Td>{row.mortgagePayment.toFixed(2).toLocaleString()}</Table.Td>
      )}
      {visibleColumns.totalAnnualCashflow && (
        <Table.Td>
          {row.totalAnnualCashflow.toFixed(2).toLocaleString()}
        </Table.Td>
      )}
      {visibleColumns.cashOnCashROI && (
        <Table.Td>{(row.cashOnCashROI * 100).toFixed(2)}%</Table.Td>
      )}
      {visibleColumns.propertyValue && (
        <Table.Td>{row.propertyValue.toFixed(2).toLocaleString()}</Table.Td>
      )}
      {visibleColumns.equity && (
        <Table.Td>{row.equity.toFixed(2).toLocaleString()}</Table.Td>
      )}
      {visibleColumns.loanBalance && (
        <Table.Td>{row.loanBalance.toFixed(2).toLocaleString()}</Table.Td>
      )}
      {visibleColumns.profitIfSold && (
        <Table.Td>{row.profitIfSold.toFixed(2).toLocaleString()}</Table.Td>
      )}
      {visibleColumns.annualizedTotalReturn && (
        <Table.Td>{(row.annualizedTotalReturn * 100).toFixed(2)}%</Table.Td>
      )}
    </Table.Tr>
  ));

  return (
    <Stack gap="xl">
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
              {visibleColumns.year && <Table.Th>Year</Table.Th>}
              {visibleColumns.totalAnnualIncome && (
                <Table.Th>Annual Income</Table.Th>
              )}
              {visibleColumns.totalAnnualExpenses && (
                <Table.Th>Annual Expenses</Table.Th>
              )}
              {visibleColumns.annualPropertyTax && (
                <Table.Th>Annual Property Tax</Table.Th>
              )}
              {visibleColumns.operatingExpenses && (
                <Table.Th>Operating Expenses</Table.Th>
              )}
              {visibleColumns.mortgagePayment && (
                <Table.Th>Mortgage Payment</Table.Th>
              )}
              {visibleColumns.totalAnnualCashflow && (
                <Table.Th>Annual Cashflow</Table.Th>
              )}
              {visibleColumns.cashOnCashROI && (
                <Table.Th>Cash on Cash ROI</Table.Th>
              )}
              {visibleColumns.propertyValue && (
                <Table.Th>Property Value</Table.Th>
              )}
              {visibleColumns.equity && <Table.Th>Equity</Table.Th>}
              {visibleColumns.loanBalance && <Table.Th>Loan Balance</Table.Th>}
              {visibleColumns.profitIfSold && (
                <Table.Th>Profit If Sold</Table.Th>
              )}
              {visibleColumns.annualizedTotalReturn && (
                <Table.Th>Annualized Total Return</Table.Th>
              )}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </ScrollArea>

      <Accordion variant="contained">
        <Accordion.Item value="purchase">
          <Accordion.Control>
            <Text fw={700}>Show / Hide Columns</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <SimpleGrid cols={5}>
              <Checkbox
                label="Year"
                checked={visibleColumns.year}
                onChange={() => handleCheckboxChange("year")}
              />
              <Checkbox
                label="Annual Income"
                checked={visibleColumns.totalAnnualIncome}
                onChange={() => handleCheckboxChange("totalAnnualIncome")}
              />
              <Checkbox
                label="Annual Expenses"
                checked={visibleColumns.totalAnnualExpenses}
                onChange={() => handleCheckboxChange("totalAnnualExpenses")}
              />
              <Checkbox
                label="Annual Property Tax"
                checked={visibleColumns.annualPropertyTax}
                onChange={() => handleCheckboxChange("annualPropertyTax")}
              />
              <Checkbox
                label="Operating Expenses"
                checked={visibleColumns.operatingExpenses}
                onChange={() => handleCheckboxChange("operatingExpenses")}
              />
              <Checkbox
                label="Mortgage Payment"
                checked={visibleColumns.mortgagePayment}
                onChange={() => handleCheckboxChange("mortgagePayment")}
              />
              <Checkbox
                label="Annual Cashflow"
                checked={visibleColumns.totalAnnualCashflow}
                onChange={() => handleCheckboxChange("totalAnnualCashflow")}
              />
              <Checkbox
                label="Cash on Cash ROI"
                checked={visibleColumns.cashOnCashROI}
                onChange={() => handleCheckboxChange("cashOnCashROI")}
              />
              <Checkbox
                label="Property Value"
                checked={visibleColumns.propertyValue}
                onChange={() => handleCheckboxChange("propertyValue")}
              />
              <Checkbox
                label="Equity"
                checked={visibleColumns.equity}
                onChange={() => handleCheckboxChange("equity")}
              />
              <Checkbox
                label="Loan Balance"
                checked={visibleColumns.loanBalance}
                onChange={() => handleCheckboxChange("loanBalance")}
              />
              <Checkbox
                label="Profit If Sold"
                checked={visibleColumns.profitIfSold}
                onChange={() => handleCheckboxChange("profitIfSold")}
              />
              <Checkbox
                label="Annualized Total Returns"
                checked={visibleColumns.annualizedTotalReturn}
                onChange={() => handleCheckboxChange("annualizedTotalReturn")}
              />
            </SimpleGrid>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Stack>
  );
};

export default InvestmentTable;
