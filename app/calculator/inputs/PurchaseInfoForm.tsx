import TooltipIcon from "@/app/components/TooltipIcon";
import useInputsStore from "@/app/state-managment/inputs-store";
import { Button, NumberInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";

const LOCAL_STORAGE_KEY = "calc-purchase";

const PurchaseInfoForm = () => {
  const setPurchase = useInputsStore((store) => store.setPurchase);

  const form = useForm({
    initialValues: {
      purchasePrice: 750000,
      annualPropertyTaxes: 0,
      afterRepairValue: 750000,
      purchaseClosingCost: 20000,
      estimatedRepairCost: 0,
      // Add other fields with their initial values
    },
    validate: {
      purchasePrice: (value: number) =>
        value <= 0 ? "Purchase Price must be positive" : null,
      annualPropertyTaxes: (value: number) =>
        value < 0 ? "Annual Property Taxes must be positive" : null,
      afterRepairValue: (value: number) =>
        value <= 0 ? "After Repair Value must be positive" : null,
      purchaseClosingCost: (value: number) =>
        value < 0 ? "Purchase Closing Cost must be positive" : null,
      estimatedRepairCost: (value: number) =>
        value < 0 ? "Estimated Repair Cost must be positive" : null,
      // Add other fields validation as necessary
    },
  });

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const purchaseInfo = JSON.parse(data);
      form.setValues(purchaseInfo);
      setPurchase(purchaseInfo);
    }
  }, []);

  const handleSubmit = (values: typeof form.values) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
    setPurchase(values);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="lg">
        {/* Purchase Price */}
        <NumberInput
          label={
            <TooltipIcon
              label="Purchase Price"
              tooltip="This is the cost that you plan to buy the property for."
            />
          }
          placeholder="Enter purchase price"
          {...form.getInputProps("purchasePrice")}
        />

        {/* Annual Property Taxes */}
        <NumberInput
          label={
            <TooltipIcon
              label="Annual Property Taxes"
              tooltip="How much are the annual (whole year) property taxes?"
            />
          }
          placeholder="Enter annual property taxes"
          {...form.getInputProps("annualPropertyTaxes")}
        />

        {/* After Repair Value */}
        <NumberInput
          label={
            <TooltipIcon
              label="After Repair Value"
              tooltip="This is the estimated worth of the property after repairs are completed."
            />
          }
          placeholder="Enter after repair value"
          {...form.getInputProps("afterRepairValue")}
        />

        {/* Purchase Closing Cost */}
        <NumberInput
          label={
            <TooltipIcon
              label="Purchase Closing Cost"
              tooltip="When someone purchases a property, there are numerous one-time fees involved."
            />
          }
          placeholder="Enter purchase closing cost"
          {...form.getInputProps("purchaseClosingCost")}
        />

        {/* Estimated Repair Cost */}
        <NumberInput
          label={
            <TooltipIcon
              label="Estimated Repair Cost"
              tooltip="How much money is it going to take to fix up the property?"
            />
          }
          placeholder="Enter estimated repair cost"
          {...form.getInputProps("estimatedRepairCost")}
        />

        {/* Add more fields as necessary */}

        <Button type="submit" variant="outline">
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default PurchaseInfoForm;
