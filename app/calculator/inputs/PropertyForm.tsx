import TooltipIcon from "@/app/components/TooltipIcon";
import useInputsStore from "@/app/state-managment/inputs-store";
import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { FaCheck, FaRegSave } from "react-icons/fa";

const LOCAL_STORAGE_KEY = "calc-property";

const PropertyInfoForm = () => {
  const setProperty = useInputsStore((store) => store.setProperty);

  const form = useForm({
    initialValues: {
      reportTitle: "",
      propertyAddress: "",
      propertyCity: "",
      propertyState: "",
      propertyZip: "",
      mlsNumber: "",
      propertySalesDescription: "",
    },
    validate: {
      reportTitle: (value) =>
        value.trim() === "" ? "Report Title is required" : null,
      propertyAddress: (value) =>
        value.trim() === "" ? "Property Address is required" : null,
      propertyCity: (value) =>
        value.trim() === "" ? "Property City is required" : null,
      propertyState: (value) =>
        value.trim() === "" ? "Property State is required" : null,
      propertyZip: (value) =>
        /^\d{5}$/.test(value) ? null : "Invalid Zip Code",
    },
  });

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const purchaseInfo = JSON.parse(data);
      form.setValues(purchaseInfo);
      setProperty(purchaseInfo);
    }
  }, []);

  const handleSubmit = (values: typeof form.values) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
    setProperty(values);
    form.isDirty();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack align="stretch" gap="lg">
        {/* Report Title */}
        <TextInput
          label={
            <TooltipIcon
              label="Report Title"
              tooltip="https://smartasset.com/taxes/property-taxes"
            />
          }
          placeholder="Enter report title"
          {...form.getInputProps("reportTitle")}
        />

        {/* Property Address */}
        <TextInput
          label="Property Address"
          placeholder="Address"
          {...form.getInputProps("propertyAddress")}
        />

        {/* Property City */}
        <TextInput
          label="Property City"
          placeholder="City"
          {...form.getInputProps("propertyCity")}
        />

        {/* Property State */}
        <TextInput
          label="Property State"
          placeholder="State"
          {...form.getInputProps("propertyState")}
        />

        {/* Property Zip */}
        <TextInput
          label="Property Zip"
          placeholder="Zip"
          {...form.getInputProps("propertyZip")}
        />

        {/* MLS Number */}
        <TextInput
          label={
            <TooltipIcon
              label="MLS Number"
              tooltip="This is the identification number given to the property in the MLS."
            />
          }
          placeholder="MLS number"
          {...form.getInputProps("mlsNumber")}
        />

        {/* Property Sales Description */}
        <TextInput
          label={
            <TooltipIcon
              label="Property Sales Description"
              tooltip="Use this space to write anything about the property."
            />
          }
          placeholder="Description"
          {...form.getInputProps("propertySalesDescription")}
        />

        <Button type="submit" variant="outline">
          Save {form.isDirty() && <FaRegSave style={{ marginLeft: "10px" }} />}
          {!form.isDirty() && <FaCheck style={{ marginLeft: "10px" }} />}
        </Button>
      </Stack>
    </form>
  );
};

export default PropertyInfoForm;
