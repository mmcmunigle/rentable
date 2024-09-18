import { Tabs, Title } from "@mantine/core";
import InvestmentTable from "./outputs/InvestmentTable";
import ResultsSummary from "./outputs/ResultsSummary";

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
        <ResultsSummary />
      </Tabs.Panel>
      <Tabs.Panel value="table">
        <Title my={20} order={2}>
          Annualized Returns
        </Title>
        <InvestmentTable />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ResultsTabs;
