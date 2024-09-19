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

  const data = [
    {
      type: "Income",
      Rent: rental.totalGrossMonthlyRent,
      Other: rental.otherMonthlyIncome,
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
      Electric: rental.electricity,
      Garbage: rental.garbage,
      "Water & Sewage": rental.waterAndSewer,
      HOA: rental.hoas,
      Other: rental.otherMonthlyExpenses,
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
          series={[
            { name: "Principle & Interest", color: "green" },
            { name: "Rent", color: "blue" },
            { name: "Other", color: "violet" },
            { name: "Insurance", color: "pink" },
            { name: "Property Tax", color: "yellow" },
            { name: "Repairs & Maint", color: "red" },
            { name: "Vacancy", color: "grape" },
            { name: "Management Fees", color: "gray" },
            { name: "Capital Exp", color: "orange" },
            { name: "Electric", color: "dark" },
            { name: "Garbage", color: "blue" },
            { name: "Water & Sewage", color: "lime" },
            { name: "HOA", color: "cyan" },
            { name: "Other", color: "indigo" },
          ]}
        />
      </Stack>
    </Center>
  );
};

export default BarChartCashFlow;
