import { Center, Group, Stack, Tabs, Title } from "@mantine/core";
import InvestmentTable from "./outputs/InvestmentTable";
import ResultsSummary from "./outputs/ResultsSummary";
import ExpensesDonutChart from "./outputs/DonutChatExpenses";
import AnnualizedLineGraph from "./outputs/LineGraphAnnualized";
import BarChartCashFlow from "./outputs/BarChartCashFlow";

const ResultsTabs = () => {
  return (
    <Tabs defaultValue="results">
      <Tabs.List>
        <Tabs.Tab value="results">Results</Tabs.Tab>
        <Tabs.Tab value="table">Annualized Returns</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="results">
        <Title my={20} order={2}>
          Results Summary
        </Title>
        <Center>
          <Group mb="xl" gap="xl">
            <BarChartCashFlow />
            <ExpensesDonutChart />
          </Group>
        </Center>

        <ResultsSummary />
      </Tabs.Panel>
      <Tabs.Panel value="table">
        <Stack gap="lg">
          <Title my={20} order={2}>
            Annualized Returns
          </Title>
          <AnnualizedLineGraph />
          <InvestmentTable />
        </Stack>
      </Tabs.Panel>
    </Tabs>
  );
};

export default ResultsTabs;
