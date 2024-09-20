import useInputsStore from "@/app/state-managment/inputs-store";
import useResultsStore from "@/app/state-managment/results-store";
import { DonutChartCell, PieChart } from "@mantine/charts";
import { Center, Stack, Text } from "@mantine/core";
import { Legend } from "recharts";

const PieChartExpenses = () => {
  const rental = useInputsStore((store) => store.rental);
  const assumptions = useInputsStore((store) => store.assumptions);
  const purchase = useInputsStore((store) => store.purchase);
  const results = useResultsStore((store) => store.results);

  if (!rental || !assumptions || !purchase || !results) return;

  const convertToMonthlySpend = (percent: number): number =>
    (percent / 100) * rental.totalGrossMonthlyRent;

  const utilitiesTotal = () =>
    rental.electricity + rental.garbage + rental.waterAndSewer;

  const data: DonutChartCell[] = [
    {
      name: "P & I",
      value: parseInt(results.monthlyPI.toFixed(0)),
      color: "green",
    },
    { name: "Insurance", value: rental.monthlyInsurance, color: "indigo" },
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
    { name: "Utilities", value: utilitiesTotal(), color: "blue" },
    { name: "HOA", value: rental.hoas, color: "cyan" },
    {
      name: "Other",
      value: rental.otherMonthlyExpenses,
      color: "pink",
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

export default PieChartExpenses;
