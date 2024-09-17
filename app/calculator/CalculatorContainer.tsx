"use client";
import { Grid } from "@mantine/core";
import React from "react";
import ResultsTabs from "./ResultsTabs";
import InputsAccordian from "./InputsAccordian";

const CalculatorContainer = () => {
  return (
    <Grid gutter="xl">
      <Grid.Col span={3}>
        <InputsAccordian />
      </Grid.Col>
      <Grid.Col span={9}>
        <ResultsTabs />
      </Grid.Col>
    </Grid>
  );
};

export default CalculatorContainer;
