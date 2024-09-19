import { AnnualizedResults } from "@/app/interfaces/AnnualizedResults";
import useResultsStore from "@/app/state-managment/results-store";
import {
  Accordion,
  Checkbox,
  NumberFormatter,
  ScrollArea,
  SimpleGrid,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useEffect, useState } from "react";

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

  const handleCheckboxChange = (column: keyof AnnualizedResults) => {
    const newColumnVisibility = {
      ...visibleColumns,
      [column]: !visibleColumns[column],
    };
    setVisibleColumns(() => newColumnVisibility);
    localStorage.setItem(
      "table-columns-vis",
      JSON.stringify(newColumnVisibility)
    );
  };

  if (!annualizedData)
    return <Text>Complete Forms and Submit to View Results</Text>;

  const rows = annualizedData.map((row, index) => (
    <Table.Tr key={index}>
      {visibleColumns.year && <Table.Td>{row.year}</Table.Td>}
      {visibleColumns.totalAnnualIncome && (
        <Table.Td>
          {
            <NumberFormatter
              prefix="$"
              value={row.totalAnnualIncome.toFixed(2)}
              thousandSeparator
            />
          }
        </Table.Td>
      )}
      {visibleColumns.totalAnnualExpenses && (
        <Table.Td>
          {
            <NumberFormatter
              prefix="$"
              value={row.totalAnnualExpenses.toFixed(2)}
              thousandSeparator
            />
          }
        </Table.Td>
      )}
      {visibleColumns.annualPropertyTax && (
        <Table.Td>
          {
            <NumberFormatter
              prefix="$"
              value={row.annualPropertyTax.toFixed(2)}
              thousandSeparator
            />
          }
        </Table.Td>
      )}
      {visibleColumns.operatingExpenses && (
        <Table.Td>
          {
            <NumberFormatter
              prefix="$"
              value={row.operatingExpenses.toFixed(2)}
              thousandSeparator
            />
          }
        </Table.Td>
      )}
      {visibleColumns.mortgagePayment && (
        <Table.Td>
          {
            <NumberFormatter
              prefix="$"
              value={row.mortgagePayment.toFixed(2)}
              thousandSeparator
            />
          }
        </Table.Td>
      )}
      {visibleColumns.totalAnnualCashflow && (
        <Table.Td>
          {
            <NumberFormatter
              prefix="$"
              value={row.totalAnnualCashflow.toFixed(2)}
              thousandSeparator
            />
          }
        </Table.Td>
      )}
      {visibleColumns.cashOnCashROI && (
        <Table.Td>{(row.cashOnCashROI * 100).toFixed(2)}%</Table.Td>
      )}
      {visibleColumns.propertyValue && (
        <Table.Td>
          {
            <NumberFormatter
              prefix="$"
              value={row.propertyValue.toFixed(2)}
              thousandSeparator
            />
          }
        </Table.Td>
      )}
      {visibleColumns.equity && (
        <Table.Td>
          {
            <NumberFormatter
              prefix="$"
              value={row.equity.toFixed(2)}
              thousandSeparator
            />
          }
        </Table.Td>
      )}
      {visibleColumns.loanBalance && (
        <Table.Td>
          {
            <NumberFormatter
              prefix="$"
              value={row.loanBalance.toFixed(2)}
              thousandSeparator
            />
          }
        </Table.Td>
      )}
      {visibleColumns.profitIfSold && (
        <Table.Td>
          {
            <NumberFormatter
              prefix="$"
              value={row.profitIfSold.toFixed(2)}
              thousandSeparator
            />
          }
        </Table.Td>
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
          horizontalSpacing="sm"
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
