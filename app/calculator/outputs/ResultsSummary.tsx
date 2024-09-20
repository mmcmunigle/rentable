import ResultField from "@/app/components/ResultField";
import useResultsStore from "@/app/state-managment/results-store";
import { Box, Divider, NumberFormatter, SimpleGrid, Text } from "@mantine/core";

const ResultsSummary = () => {
  const results = useResultsStore((store) => store.results);

  if (!results) return <Text>Complete Forms and Submit to View Results</Text>;

  return (
    <Box>
      <SimpleGrid cols={5} p={10}>
        <Box>
          <ResultField
            field="Monthly Income"
            tooltip="The total monthly income generated from rental activities, including rent and other property-related income."
          />
          <Text size="xl">
            <NumberFormatter
              prefix="$"
              value={results.monthlyIncome.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>
        <Box>
          <ResultField
            field="Monthly Expenses"
            tooltip="The total monthly expenses for managing and maintaining the property, including taxes, insurance, maintenance, and utilities."
          />
          <Text size="sm"></Text>
          <Text size="xl">
            <NumberFormatter
              prefix="$"
              value={results.monthlyExpenses.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>
        <Box>
          <ResultField
            field="Monthly Cashflow"
            tooltip="The difference between your monthly income and expenses."
          />
          <Text size="xl" c={results.monthlyCashFlow < 0 ? "red.5" : "green.5"}>
            <NumberFormatter
              prefix="$"
              value={results.monthlyCashFlow.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>
        <Box>
          <ResultField
            field="Pro Forma Cap"
            tooltip="The Pro Forma Capitalization Rate (Cap Rate) is the expected return on investment based on projected income and expenses. It's calculated by dividing Net Operating Income (NOI) by the total property value."
          />
          <Text size="xl">
            {(results.proFormaCapRate * 100).toFixed(2).toString() + "%"}
          </Text>
        </Box>
        <Box>
          <ResultField
            field="NOI - Monthly"
            tooltip="The Net Operating Income (NOI) for a month, calculated by subtracting operating expenses from the total income, excluding mortgage payments and capital expenses."
          />
          <Text size="xl">
            <NumberFormatter
              prefix="$"
              value={results.noiMonthly.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>
      </SimpleGrid>
      <Divider />
      <SimpleGrid cols={5} p={10} mt={10}>
        <Box>
          <ResultField
            field="Total Cash Needed"
            tooltip="The total amount of cash required to close the deal, including down payment, closing costs, and any additional expenses such as repairs or improvements."
          />
          <Text size="xl">
            <NumberFormatter
              prefix="$"
              value={results.totalCashNeeded.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>

        <Box>
          <ResultField
            field="Total Project Cost"
            tooltip="The total amount invested in the property, including the purchase price, repairs, closing costs, and any other associated costs."
          />
          <Text size="xl">
            <NumberFormatter
              prefix="$"
              value={results.totalProjectCost.toFixed(2)}
              thousandSeparator
            />
          </Text>
        </Box>

        <Box>
          <ResultField
            field="Cash On Cash ROI"
            tooltip="Cash on Cash Return on Investment (ROI) is a measure of the cash income earned on the cash invested in the property, expressed as a percentage. Negative values indicate a loss on your cash investment."
          />
          <Text size="xl" c={results.monthlyCashFlow < 0 ? "red.5" : "green.5"}>
            {(results.cashOnCashROI * 100).toFixed(2).toString() + "%"}
          </Text>
        </Box>

        <Box>
          <ResultField
            field="Purchase Cap Rate"
            tooltip="The Capitalization Rate (Cap Rate) based on the current purchase price of the property. It provides an estimate of the rate of return on the investment, calculated as NOI divided by the property price."
          />
          <Text size="xl">
            {(results.purchaseCapRate * 100).toFixed(2).toString() + "%"}
          </Text>
        </Box>

        <Box>
          <ResultField
            field="2% Rule"
            tooltip="The 2% rule suggests that a property monthly rental income should be at least 2% of the purchase price for it to be considered a good investment."
          />
          <Text size="xl" c={results.twoPercentRule < 2 ? "red.5" : "green.5"}>
            {(results.twoPercentRule * 100).toFixed(2).toString() + "%"}
          </Text>
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default ResultsSummary;
