import TooltipIcon from "@/app/components/TooltipIcon";
import useInputsStore from "@/app/state-managment/inputs-store";
import { Button, NumberInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

const LOCAL_STORAGE_KEY = "calc-assumptions";

const AssumptionsForm = () => {
  const setAssumptions = useInputsStore((store) => store.setAssumptions);

  const form = useForm({
    initialValues: {
      propertyTax: 0.51,
      purchaseClosingCost: 20000,
      downPayment: 25,
      loanInterestRate: 8.5,
      amortizationLength: 30,
      vacancy: 5,
      repairsAndMaintenance: 10,
      capitalExpenditures: 5,
      managementFees: 10.5,
      annualIncomeGrowth: 2.07,
      annualPVGrowth: 4.8,
      annualExpensesGrowth: 2,
      salesExpenses: 9,
      pointsImpact: 1,
    },
    validate: {
      propertyTax: (value) =>
        value < 0 || value > 100 ? "Must be between 0 and 100" : null,
      downPayment: (value) =>
        value < 0 || value > 100 ? "Must be between 0 and 100" : null,
      loanInterestRate: (value) =>
        value < 0 || value > 100 ? "Must be between 0 and 100" : null,
      vacancy: (value) =>
        value < 0 || value > 100 ? "Must be between 0 and 100" : null,
      repairsAndMaintenance: (value) =>
        value < 0 || value > 100 ? "Must be between 0 and 100" : null,
      capitalExpenditures: (value) =>
        value < 0 || value > 100 ? "Must be between 0 and 100" : null,
      managementFees: (value) =>
        value < 0 || value > 100 ? "Must be between 0 and 100" : null,
      annualIncomeGrowth: (value) =>
        value < 0 || value > 100 ? "Must be between 0 and 100" : null,
      annualPVGrowth: (value) =>
        value < 0 || value > 100 ? "Must be between 0 and 100" : null,
      annualExpensesGrowth: (value) =>
        value < 0 || value > 100 ? "Must be between 0 and 100" : null,
      salesExpenses: (value) =>
        value < 0 || value > 100 ? "Must be between 0 and 100" : null,
      pointsImpact: (value) =>
        value < 0 || value > 100 ? "Must be between 0 and 100" : null,
      purchaseClosingCost: (value) =>
        value < 0 ? "Must be a positive number" : null,
      amortizationLength: (value) =>
        value <= 0 ? "Must be a positive number" : null,
    },
  });

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const assumptions = JSON.parse(data);
      form.setValues(assumptions);
      setAssumptions(assumptions);
    }
  }, []);

  const handleSubmit = (values: typeof form.values) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
    setAssumptions(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="lg">
        {/* Property Tax */}
        <NumberInput
          label={
            <TooltipIcon
              label="Property Tax Rate"
              tooltip="https://smartasset.com/taxes/property-taxes"
              link="https://smartasset.com/taxes/property-taxes"
            />
          }
          placeholder="Enter property tax rate"
          {...form.getInputProps("propertyTax")}
        />

        {/* Purchase Closing Cost */}
        <NumberInput
          label="Purchase Closing Cost"
          placeholder="Enter purchase closing cost"
          {...form.getInputProps("purchaseClosingCost")}
        />

        {/* Down Payment */}
        <NumberInput
          label={
            <TooltipIcon
              label="Down Payment (%)"
              tooltip="Based on investment property loan"
            />
          }
          placeholder="Enter down payment percentage"
          {...form.getInputProps("downPayment")}
        />

        {/* Loan Interest Rate */}
        <NumberInput
          label={
            <TooltipIcon
              label="Loan Interest Rate (%)"
              tooltip="Based on investment property loan"
            />
          }
          placeholder="Enter loan interest rate"
          {...form.getInputProps("loanInterestRate")}
        />

        {/* Amortization Length */}
        <NumberInput
          label="Amortization Length (Years)"
          placeholder="Enter amortization length in years"
          {...form.getInputProps("amortizationLength")}
        />

        {/* Vacancy */}
        <NumberInput
          label={
            <TooltipIcon
              label="Vacancy (%)"
              tooltip="Use link to find current vacancy numbers."
              link="https://www.deptofnumbers.com/rent/utah/ogden/#:~:text=Ogden%20Rental%20Vacancy%20Rate,according%20to%20Census%20ACS%20data."
            />
          }
          placeholder="Enter vacancy percentage"
          {...form.getInputProps("vacancy")}
        />

        {/* Repairs and Maintenance */}
        <NumberInput
          label="Repairs and Maintenance (%)"
          placeholder="Enter repairs and maintenance percentage"
          {...form.getInputProps("repairsAndMaintenance")}
        />

        {/* Capital Expenditures */}
        <NumberInput
          label="Capital Expenditures (%)"
          placeholder="Enter capital expenditures percentage"
          {...form.getInputProps("capitalExpenditures")}
        />

        {/* Management Fees */}
        <NumberInput
          label="Management Fees (%)"
          placeholder="Enter management fees percentage"
          {...form.getInputProps("managementFees")}
        />

        {/* Annual Income Growth */}
        <NumberInput
          label="Annual Income Growth (%)"
          placeholder="Enter annual income growth percentage"
          {...form.getInputProps("annualIncomeGrowth")}
        />

        {/* Annual PV Growth */}
        <NumberInput
          label="Annual PV Growth (%)"
          placeholder="Enter annual property value growth percentage"
          {...form.getInputProps("annualPVGrowth")}
        />

        {/* Annual Expenses Growth */}
        <NumberInput
          label="Annual Expenses Growth (%)"
          placeholder="Enter annual expenses growth percentage"
          {...form.getInputProps("annualExpensesGrowth")}
        />

        {/* Sales Expenses */}
        <NumberInput
          label="Sales Expenses (%)"
          placeholder="Enter sales expenses percentage"
          {...form.getInputProps("salesExpenses")}
        />

        {/* Points Impact */}
        <NumberInput
          label={
            <TooltipIcon
              label="Points impact (%)"
              tooltip="The BiggerPockets calculator seems to show that points will add ~0.8% down per point to the mortgage"
            />
          }
          placeholder="Enter points impact percentage"
          {...form.getInputProps("pointsImpact")}
        />

        <Button type="submit" variant="outline">
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default AssumptionsForm;
