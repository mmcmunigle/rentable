import PercentPrefixIcon from "@/app/components/PercentPrefixIcon";
import TooltipIcon from "@/app/components/TooltipIcon";
import useInputsStore from "@/app/state-managment/inputs-store";
import { Button, NumberInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { prefixStyle } from "./styles";
import DollarPrefixIcon from "@/app/components/DollarPrefixIcon";
import { FaCheck, FaRegSave } from "react-icons/fa";

const LOCAL_STORAGE_KEY = "calc-assumptions";

const AssumptionsForm = () => {
  const setAssumptions = useInputsStore((store) => store.setAssumptions);

  const form = useForm({
    initialValues: {
      propertyTax: 0.51,
      purchaseClosingCost: 20000,
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
        value < 0 || value > 100
          ? "Must be between 0 and 100"
          : value === undefined || value.toString() === ""
          ? "Required"
          : null,
      vacancy: (value) =>
        value < 0 || value > 100
          ? "Must be between 0 and 100"
          : value === undefined || value.toString() === ""
          ? "Required"
          : null,
      repairsAndMaintenance: (value) =>
        value < 0 || value > 100
          ? "Must be between 0 and 100"
          : value === undefined || value.toString() === ""
          ? "Required"
          : null,
      capitalExpenditures: (value) =>
        value < 0 || value > 100
          ? "Must be between 0 and 100"
          : value === undefined || value.toString() === ""
          ? "Required"
          : null,
      managementFees: (value) =>
        value < 0 || value > 100
          ? "Must be between 0 and 100"
          : value === undefined || value.toString() === ""
          ? "Required"
          : null,
      annualIncomeGrowth: (value) =>
        value < 0 || value > 100
          ? "Must be between 0 and 100"
          : value === undefined || value.toString() === ""
          ? "Required"
          : null,
      annualPVGrowth: (value) =>
        value < 0 || value > 100
          ? "Must be between 0 and 100"
          : value === undefined || value.toString() === ""
          ? "Required"
          : null,
      annualExpensesGrowth: (value) =>
        value < 0 || value > 100
          ? "Must be between 0 and 100"
          : value === undefined || value.toString() === ""
          ? "Required"
          : null,
      salesExpenses: (value) =>
        value < 0 || value > 100
          ? "Must be between 0 and 100"
          : value === undefined || value.toString() === ""
          ? "Required"
          : null,
      pointsImpact: (value) =>
        value < 0 || value > 100
          ? "Must be between 0 and 100"
          : value === undefined || value.toString() === ""
          ? "Required"
          : null,
      purchaseClosingCost: (value) =>
        value < 0
          ? "Must be a positive number"
          : value === undefined || value.toString() === ""
          ? "Required"
          : null,
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
    form.resetDirty();
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
          leftSection={<PercentPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Purchase Closing Cost */}
        <NumberInput
          label="Purchase Closing Cost"
          placeholder="Enter purchase closing cost"
          {...form.getInputProps("purchaseClosingCost")}
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Vacancy */}
        <NumberInput
          label={
            <TooltipIcon
              label="Vacancy"
              tooltip="Use link to find current vacancy numbers."
              link="https://www.deptofnumbers.com/rent/utah/ogden/#:~:text=Ogden%20Rental%20Vacancy%20Rate,according%20to%20Census%20ACS%20data."
            />
          }
          placeholder="Enter vacancy percentage"
          {...form.getInputProps("vacancy")}
          leftSection={<PercentPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Repairs and Maintenance */}
        <NumberInput
          label="Repairs and Maintenance"
          placeholder="Enter repairs and maintenance percentage"
          {...form.getInputProps("repairsAndMaintenance")}
          leftSection={<PercentPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Capital Expenditures */}
        <NumberInput
          label="Capital Expenditures"
          placeholder="Enter capital expenditures percentage"
          {...form.getInputProps("capitalExpenditures")}
          leftSection={<PercentPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Management Fees */}
        <NumberInput
          label="Management Fees"
          placeholder="Enter management fees percentage"
          {...form.getInputProps("managementFees")}
          leftSection={<PercentPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Annual Income Growth */}
        <NumberInput
          label="Annual Income Growth"
          placeholder="Enter annual income growth percentage"
          {...form.getInputProps("annualIncomeGrowth")}
          leftSection={<PercentPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Annual PV Growth */}
        <NumberInput
          label="Annual PV Growth"
          placeholder="Enter annual property value growth percentage"
          {...form.getInputProps("annualPVGrowth")}
          leftSection={<PercentPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Annual Expenses Growth */}
        <NumberInput
          label="Annual Expenses Growth"
          placeholder="Enter annual expenses growth percentage"
          {...form.getInputProps("annualExpensesGrowth")}
          leftSection={<PercentPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Sales Expenses */}
        <NumberInput
          label="Sales Expenses"
          placeholder="Enter sales expenses percentage"
          {...form.getInputProps("salesExpenses")}
          leftSection={<PercentPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Points Impact */}
        <NumberInput
          label={
            <TooltipIcon
              label="Points impact"
              tooltip="The BiggerPockets calculator seems to show that points will add ~0.8% down per point to the mortgage"
            />
          }
          placeholder="Enter points impact percentage"
          {...form.getInputProps("pointsImpact")}
          leftSection={<PercentPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        <Button type="submit" variant="outline">
          Save {form.isDirty() && <FaRegSave style={{ marginLeft: "10px" }} />}
          {!form.isDirty() && <FaCheck style={{ marginLeft: "10px" }} />}
        </Button>
      </Stack>
    </form>
  );
};

export default AssumptionsForm;
