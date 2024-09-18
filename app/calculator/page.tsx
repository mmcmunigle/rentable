import { Stack, Title } from "@mantine/core";
import CalculatorContainer from "./CalculatorContainer";

const CalculatorPage = () => {
  return (
    <Stack>
      <Title order={1} pb={10}>
        Investment Calculator
      </Title>
      <CalculatorContainer />
    </Stack>
  );
};

export default CalculatorPage;
