import useInputsStore from "@/app/state-managment/inputs-store";
import useResultsStore from "@/app/state-managment/results-store";
import { BarChart } from "@mantine/charts";
import { Center, Stack, Text } from "@mantine/core";

const BarChartCashFlow = () => {
  const results = useResultsStore((store) => store.results);
  const rental = useInputsStore((store) => store.rental);
  const purchase = useInputsStore((store) => store.purchase);
  const assumptions = useInputsStore((store) => store.assumptions);

  if (!results || !rental || !purchase || !assumptions) return;

  const convertToMonthlySpend = (percent: number): number =>
    (percent / 100) * rental.totalGrossMonthlyRent;

  const utilitiesTotal = () =>
    rental.electricity + rental.garbage + rental.waterAndSewer;

  const data = [
    {
      type: "Income",
      Rent: rental.totalGrossMonthlyRent,
      "Other Income": rental.otherMonthlyIncome,
    },
    {
      type: "Expenses",
      Insurance: rental.monthlyInsurance,
      "Property Tax": parseInt((purchase.annualPropertyTaxes / 12).toFixed(0)),
      "Repairs & Maint": convertToMonthlySpend(
        assumptions.repairsAndMaintenance
      ),
      Vacancy: convertToMonthlySpend(assumptions.vacancy),
      "Management Fees": convertToMonthlySpend(assumptions.managementFees),
      "Capital Exp": convertToMonthlySpend(assumptions.capitalExpenditures),
      "Principle & Interest": parseInt(results.monthlyPI.toString()),
      Utilities: utilitiesTotal(),
      HOA: rental.hoas,
      "Other Expenses": rental.otherMonthlyExpenses,
    },
  ];

  return (
    <Center>
      <Stack align="center">
        <Text size="lg">Monthly Income vs. Expenses</Text>
        <BarChart
          w={350}
          h={250}
          data={data}
          withXAxis
          dataKey="type"
          type="stacked"
          tooltipProps={{ wrapperStyle: { zIndex: 100 } }}
          series={[
            { name: "Principle & Interest", color: "green" },
            { name: "Rent", color: "blue" },
            { name: "Other Income", color: "violet" },
            { name: "Insurance", color: "indigo" },
            { name: "Property Tax", color: "yellow" },
            { name: "Repairs & Maint", color: "red" },
            { name: "Vacancy", color: "grape" },
            { name: "Management Fees", color: "gray" },
            { name: "Capital Exp", color: "orange" },
            { name: "Utilities", color: "blue" },
            { name: "HOA", color: "cyan" },
            { name: "Other Expenses", color: "pink" },
          ]}
        />
      </Stack>
    </Center>
  );
};

export default BarChartCashFlow;
