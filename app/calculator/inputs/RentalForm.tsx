import TooltipIcon from "@/app/components/TooltipIcon";
import useInputsStore from "@/app/state-managment/inputs-store";
import { Button, NumberInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

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
        value < 0 ? "Must be a positive number" : null,
      otherMonthlyIncome: (value) =>
        value < 0 ? "Must be a positive number" : null,
      electricity: (value) => (value < 0 ? "Must be a positive number" : null),
      garbage: (value) => (value < 0 ? "Must be a positive number" : null),
      waterAndSewer: (value) =>
        value < 0 ? "Must be a positive number" : null,
      hoas: (value) => (value < 0 ? "Must be a positive number" : null),
      monthlyInsurance: (value) =>
        value < 0 ? "Must be a positive number" : null,
      otherMonthlyExpenses: (value) =>
        value < 0 ? "Must be a positive number" : null,
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
        />

        {/* Electricity */}
        <NumberInput
          label="Electricity"
          placeholder="Enter monthly electricity cost"
          {...form.getInputProps("electricity")}
        />

        {/* Garbage */}
        <NumberInput
          label="Garbage"
          placeholder="Enter monthly garbage cost"
          {...form.getInputProps("garbage")}
        />

        {/* Water & Sewer */}
        <NumberInput
          label="Water & Sewer"
          placeholder="Enter monthly water and sewer cost"
          {...form.getInputProps("waterAndSewer")}
        />

        {/* HOAs */}
        <NumberInput
          label="HOAs"
          placeholder="Enter monthly HOA fees"
          {...form.getInputProps("hoas")}
        />

        {/* Monthly Insurance */}
        <NumberInput
          label="Monthly Insurance"
          placeholder="Enter monthly insurance cost"
          {...form.getInputProps("monthlyInsurance")}
        />

        {/* Other Monthly Expenses */}
        <NumberInput
          label="Other Monthly Expenses"
          placeholder="Enter other monthly expenses"
          {...form.getInputProps("otherMonthlyExpenses")}
        />

        <Button type="submit" variant="outline">
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default RentalInfoForm;
