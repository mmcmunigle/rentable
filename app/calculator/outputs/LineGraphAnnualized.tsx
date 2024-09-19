import useResultsStore from "@/app/state-managment/results-store";
import { LineChart } from "@mantine/charts";
import React from "react";

const AnnualizedLineGraph = () => {
  const annualizedResults = useResultsStore((store) => store.annualized);

  if (!annualizedResults) return;

  const data: object[] = annualizedResults.map((results) => {
    return {
      year: results.year,
      "Cash on Cash ROI (%)": parseFloat(results.cashOnCashROI.toFixed(3)),
      "Property Value ($)": parseInt(results.propertyValue.toFixed(0)),
      "Profit If Sold ($)": parseInt(results.profitIfSold.toFixed(0)),
    };
  });

  return (
    <LineChart
      h={300}
      w="100%"
      data={data}
      dataKey="year"
      withLegend
      withRightYAxis
      legendProps={{ verticalAlign: "top", align: "left" }}
      gridAxis="x"
      yAxisProps={{
        width: 85,
        // domain: [
        //   (dataMin: number) => Math.round((dataMin - 200000) / 100000) * 100000,
        //   (dataMax: number) => Math.round((dataMax + 200000) / 100000) * 100000,
        // ],
      }}
      // rightYAxisProps={{
      //   domain: [
      //     (dataMin: number) => Math.round(dataMin / 0.01) * 0.01,
      //     (dataMax: number) => Math.round(dataMax + 0.01) / 0.01,
      //   ],
      // }}
      tooltipAnimationDuration={100}
      valueFormatter={(value) => new Intl.NumberFormat("en-US").format(value)}
      yAxisLabel="Value $"
      xAxisLabel="Year"
      rightYAxisLabel="ROI %"
      series={[
        { name: "Property Value ($)", color: "orange.6" },
        { name: "Profit If Sold ($)", color: "green.6" },
        { name: "Cash on Cash ROI (%)", color: "blue.6", yAxisId: "right" },
      ]}
    />
  );
};

export default AnnualizedLineGraph;
