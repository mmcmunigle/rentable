import useResultsStore from "@/app/state-managment/results-store";
import { Box, Divider, Group, NumberFormatter, Text } from "@mantine/core";
import React from "react";

const ResultsSummary = () => {
  const results = useResultsStore((store) => store.results);

  if (!results) return <Text>Complete Forms and Submit to View Results</Text>;

  return (
    <Box>
      <Group justify="space-between" p={10}>
        <Box>
          <Text size="sm">Monthly Income</Text>
          <Text size="xl">
            <NumberFormatter
              prefix="$"
              value={results.monthlyIncome.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>
        <Box>
          <Text size="sm">Monthly Expenses</Text>
          <Text size="xl">
            <NumberFormatter
              prefix="$"
              value={results.monthlyExpenses.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>
        <Box>
          <Text size="sm">Monthly Cashflow</Text>
          <Text size="xl" c={results.monthlyCashFlow < 0 ? "red.5" : "green.5"}>
            <NumberFormatter
              prefix="$"
              value={results.monthlyCashFlow.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>
        <Box>
          <Text size="sm">Pro Forma Cap</Text>
          <Text size="xl">
            {(results.proFormaCapRate * 100).toFixed(2).toString() + "%"}
          </Text>
        </Box>
        <Box>
          <Text size="sm">NOI - Monthly</Text>
          <Text size="xl">
            <NumberFormatter
              prefix="$"
              value={results.noiMonthly.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>
        <Box>
          <Text size="sm">NOI - Annual</Text>
          <Text size="xl">
            <NumberFormatter
              prefix="$"
              value={results.noiAnnual.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>
      </Group>
      <Divider />
      <Group justify="space-between" p={10} mt={10}>
        <Box>
          <Text size="sm">Total Cash Needed</Text>
          <Text size="xl">
            <NumberFormatter
              prefix="$"
              value={results.totalCashNeeded.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>

        <Box>
          <Text size="sm">Total Project Cost</Text>
          <Text size="xl">
            <NumberFormatter
              prefix="$"
              value={results.totalProjectCost.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>

        <Box>
          <Text size="sm">Cash On Cash ROI</Text>
          <Text size="xl" c={results.monthlyCashFlow < 0 ? "red.5" : "green.5"}>
            {(results.cashOnCashROI * 100).toFixed(2).toString() + "%"}
          </Text>
        </Box>

        <Box>
          <Text size="sm">Purchase Cap Rate</Text>
          <Text size="xl">
            {(results.purchaseCapRate * 100).toFixed(2).toString() + "%"}
          </Text>
        </Box>

        <Box>
          <Text size="sm">2% Rule</Text>
          <Text size="xl">
            {(results.twoPercentRule * 100).toFixed(2).toString() + "%"}
          </Text>
        </Box>

        <Box>
          <Text size="sm">Gross Rent Multiplier</Text>
          <Text size="xl">
            <NumberFormatter
              prefix="$"
              value={results.grossRentMultiplier.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>
      </Group>
    </Box>
  );
};

export default ResultsSummary;
