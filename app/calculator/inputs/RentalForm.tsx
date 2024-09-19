import DollarPrefixIcon from "@/app/components/DollarPrefixIcon";
import TooltipIcon from "@/app/components/TooltipIcon";
import useInputsStore from "@/app/state-managment/inputs-store";
import { Button, NumberInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";
import { prefixStyle } from "./styles";
import { FaCheck, FaRegSave } from "react-icons/fa";

const LOCAL_STORAGE_KEY = "calc-rental";

const RentalInfoForm = () => {
  const setRental = useInputsStore((store) => store.setRental);

  const form = useForm({
    initialValues: {
      totalGrossMonthlyRent: 4800,
      otherMonthlyIncome: 0,
      electricity: 0,
      garbage: 0,
      waterAndSewer: 0,
      hoas: 0,
      monthlyInsurance: 0,
      otherMonthlyExpenses: 0,
    },
    validate: {
      totalGrossMonthlyRent: (value) =>
        value < 0
          ? "Must be a positive number"
          : value === undefined || value.toString() === ""
          ? "Purchase Price is required"
          : null,
      otherMonthlyIncome: (value) =>
        value < 0
          ? "Must be a positive number"
          : value === undefined || value.toString() === ""
          ? "Other Income is required"
          : null,
      electricity: (value) =>
        value < 0
          ? "Must be a positive number"
          : value === undefined || value.toString() === ""
          ? "Electricity is required"
          : null,
      garbage: (value) =>
        value < 0
          ? "Must be a positive number"
          : value === undefined || value.toString() === ""
          ? "Garbage is required"
          : null,
      waterAndSewer: (value) =>
        value < 0
          ? "Must be a positive number"
          : value === undefined || value.toString() === ""
          ? "Water & Sewer is required"
          : null,
      hoas: (value) =>
        value < 0
          ? "Must be a positive number"
          : value === undefined || value.toString() === ""
          ? "HOAS is required"
          : null,
      monthlyInsurance: (value) =>
        value < 0
          ? "Must be a positive number"
          : value === undefined || value.toString() === ""
          ? "Monthly Insurance is required"
          : null,
      otherMonthlyExpenses: (value) =>
        value < 0
          ? "Must be a positive number"
          : value === undefined || value.toString() === ""
          ? "Other Expenses is required"
          : null,
    },
  });

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const rentalInfo = JSON.parse(data);
      form.setValues(rentalInfo);
      setRental(rentalInfo);
    }
  }, []);

  const handleSubmit = (values: typeof form.values) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
    setRental(values);
    form.resetDirty();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="lg">
        {/* Total Gross Monthly Rent */}
        <NumberInput
          label={
            <TooltipIcon
              label="Total Gross Monthly Rent"
              tooltip="How much rent will the property receive each month?"
            />
          }
          placeholder="Enter total monthly rent"
          {...form.getInputProps("totalGrossMonthlyRent")}
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Other Monthly Income */}
        <NumberInput
          label={
            <TooltipIcon
              label="Other Monthly Income"
              tooltip="Is there any other source of income on the property, such as laundry or extra storage? Include those numbers here."
            />
          }
          placeholder="Enter other monthly income"
          {...form.getInputProps("otherMonthlyIncome")}
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Electricity */}
        <NumberInput
          label="Electricity"
          placeholder="Enter monthly electricity cost"
          {...form.getInputProps("electricity")}
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Garbage */}
        <NumberInput
          label="Garbage"
          placeholder="Enter monthly garbage cost"
          {...form.getInputProps("garbage")}
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Water & Sewer */}
        <NumberInput
          label="Water & Sewer"
          placeholder="Enter monthly water and sewer cost"
          {...form.getInputProps("waterAndSewer")}
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* HOAs */}
        <NumberInput
          label="HOAs"
          placeholder="Enter monthly HOA fees"
          {...form.getInputProps("hoas")}
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Monthly Insurance */}
        <NumberInput
          label="Monthly Insurance"
          placeholder="Enter monthly insurance cost"
          {...form.getInputProps("monthlyInsurance")}
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Other Monthly Expenses */}
        <NumberInput
          label="Other Monthly Expenses"
          placeholder="Enter other monthly expenses"
          {...form.getInputProps("otherMonthlyExpenses")}
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
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

export default RentalInfoForm;
