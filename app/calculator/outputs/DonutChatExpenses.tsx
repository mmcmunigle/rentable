import useInputsStore from "@/app/state-managment/inputs-store";
import useResultsStore from "@/app/state-managment/results-store";
import { DonutChartCell, PieChart } from "@mantine/charts";
import { Center, Stack, Text } from "@mantine/core";
import { Legend } from "recharts";

const ExpensesDonutChart = () => {
  const rentalInfo = useInputsStore((store) => store.rental);
  const assumptions = useInputsStore((store) => store.assumptions);
  const purchase = useInputsStore((store) => store.purchase);
  const results = useResultsStore((store) => store.results);

  if (!rentalInfo || !assumptions || !purchase || !results) return;

  const convertToMonthlySpend = (percent: number): number =>
    (percent / 100) * rentalInfo.totalGrossMonthlyRent;

  const data: DonutChartCell[] = [
    {
      name: "P & I",
      value: parseInt(results.monthlyPI.toFixed(0)),
      color: "green",
    },
    { name: "Insurance", value: rentalInfo.monthlyInsurance, color: "pink" },
    {
      name: "Property Tax",
      value: parseInt((purchase.annualPropertyTaxes / 12).toFixed(0)),
      color: "yellow",
    },
    {
      name: "Repairs & Maint",
      value: convertToMonthlySpend(assumptions.repairsAndMaintenance),
      color: "red",
    },
    {
      name: "Vacancy",
      value: convertToMonthlySpend(assumptions.vacancy),
      color: "grape",
    },
    {
      name: "Management Fees",
      value: convertToMonthlySpend(assumptions.managementFees),
      color: "gray",
    },
    {
      name: "Capital Exp",
      value: convertToMonthlySpend(assumptions.capitalExpenditures),
      color: "orange",
    },
    { name: "Electric", value: rentalInfo.electricity, color: "dark" },
    { name: "Garbage", value: rentalInfo.garbage, color: "blue" },
    {
      name: "Water & Sewage",
      value: rentalInfo.waterAndSewer,
      color: "lime",
    },
    { name: "HOA", value: rentalInfo.hoas, color: "cyan" },
    {
      name: "Other",
      value: rentalInfo.otherMonthlyExpenses,
      color: "indigo",
    },
  ];

  return (
    <Center ml={20}>
      <Stack align="center">
        <Text size="lg">Monthly Operating Expenses</Text>
        <PieChart
          withTooltip
          tooltipDataSource="segment"
          data={data}
          w="350px"
          h="250px"
          mx="auto"
        >
          <Legend
            style={{ marginLeft: "20px" }}
            align="right"
            verticalAlign="middle"
            height={250}
            width={150}
            iconSize={8}
            formatter={(value) => (
              <span style={{ fontSize: "14px" }}>{value}</span>
            )}
          />
        </PieChart>
      </Stack>
    </Center>
  );
};

export default ExpensesDonutChart;
