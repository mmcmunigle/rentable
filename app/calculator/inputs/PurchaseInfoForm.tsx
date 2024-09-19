import DollarPrefixIcon from "@/app/components/DollarPrefixIcon";
import TooltipIcon from "@/app/components/TooltipIcon";
import useInputsStore from "@/app/state-managment/inputs-store";
import { Button, NumberInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { prefixStyle } from "./styles";
import { FaCheck, FaRegSave } from "react-icons/fa";

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
    },
    validate: {
      purchasePrice: (value: number) =>
        value <= 0
          ? "Purchase Price must be positive"
          : value === undefined || value.toString() === ""
          ? "Purchase Price is required"
          : null,
      annualPropertyTaxes: (value: number) =>
        value < 0
          ? "Annual Property Taxes must be positive"
          : value === undefined || value.toString() === ""
          ? "Annual Property Taxes is required"
          : null,
      afterRepairValue: (value: number) =>
        value <= 0
          ? "After Repair Value must be positive"
          : value === undefined || value.toString() === ""
          ? "After Repair Value is required"
          : null,
      purchaseClosingCost: (value: number) =>
        value < 0
          ? "Purchase Closing Cost must be positive"
          : value === undefined || value.toString() === ""
          ? "Closing Cost is required"
          : null,
      estimatedRepairCost: (value: number) =>
        value < 0
          ? "Estimated Repair Cost must be positive"
          : value === undefined || value.toString() === ""
          ? "Repair Cost is required"
          : null,
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
    form.resetDirty();
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
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
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
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
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
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
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
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
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
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Add more fields as necessary */}

        <Button type="submit" variant="outline">
          Save {form.isDirty() && <FaRegSave style={{ marginLeft: "10px" }} />}
          {!form.isDirty() && <FaCheck style={{ marginLeft: "10px" }} />}
        </Button>
      </Stack>
    </form>
  );
};

export default PurchaseInfoForm;
