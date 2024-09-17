import { Stack, Text, Title } from "@mantine/core";
import React from "react";
import CalculatorContainer from "./CalculatorContainer";

const CalculatorPage = () => {
  return (
    <Stack>
      <Title order={1} p={10}>
        Investment Calculator
      </Title>
      <CalculatorContainer />
    </Stack>
  );
};

export default CalculatorPage;
