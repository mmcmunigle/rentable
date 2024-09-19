import DollarPrefixIcon from "@/app/components/DollarPrefixIcon";
import PercentPrefixIcon from "@/app/components/PercentPrefixIcon";
import TooltipIcon from "@/app/components/TooltipIcon";
import useInputsStore from "@/app/state-managment/inputs-store";
import { Button, NativeSelect, NumberInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { prefixStyle } from "./styles";
import { FaCheck, FaRegSave } from "react-icons/fa";

const LOCAL_STORAGE_KEY = "calc-loan";

const LoanDetailsForm = () => {
  const setLoan = useInputsStore((store) => store.setLoan);

  const form = useForm({
    initialValues: {
      cashPurchase: "No",
      downPaymentPercentage: 25,
      loanInterestRate: 8.5,
      pointsChargedByLender: 0,
      otherChargesFromLender: 0,
      loanFeesAndPoints: 2,
      interestOnly: "No",
      amortizationYears: 30,
      capRate: 0,
    },
    validate: {
      downPaymentPercentage: (value, values) =>
        value < 0 || value > 100
          ? "Must be between 0 and 100"
          : (values.cashPurchase === "No" && value === undefined) ||
            (values.cashPurchase === "No" && value.toString() === "")
          ? "Down Payment is required"
          : null,
      loanInterestRate: (value, values) =>
        value < 0 || value > 100
          ? "Must be a positive percentage"
          : (values.cashPurchase === "No" && value === undefined) ||
            (values.cashPurchase === "No" && value.toString() === "")
          ? "Loan Interest Rate is required"
          : null,
      pointsChargedByLender: (value) =>
        value < 0 ? "Must be a positive number" : null,
      otherChargesFromLender: (value) =>
        value < 0 ? "Must be a positive number" : null,
      loanFeesAndPoints: (value) =>
        value < 0 ? "Must be a positive number" : null,
      amortizationYears: (value, values) =>
        value <= 0
          ? "Must be a positive number"
          : (values.cashPurchase === "No" && value === undefined) ||
            (values.cashPurchase === "No" && value.toString() === "")
          ? "Amortization Years is required"
          : null,
      capRate: (value) =>
        value < 0 || value > 100 ? "Must be a positive percentage" : null,
    },
  });

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const loanRaw = JSON.parse(data);
      form.setValues(loanRaw);
      setLoan(loanRaw);
    }
  }, []);

  const isCashPurchase = () => {
    return form.getValues().cashPurchase === "Yes";
  };

  const handleSubmit = (values: typeof form.values) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
    setLoan({
      ...values,
      cashPurchase: values.cashPurchase === "Yes",
      interestOnly: values.interestOnly === "Yes",
    });
    form.resetDirty();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack align="stretch">
        {/* Cash Purchase (Y/N) */}
        <NativeSelect
          label={
            <TooltipIcon
              label="Cash Purchase?"
              tooltip="How much money do you plan to put toward the purchase of this property?"
            />
          }
          {...form.getInputProps("cashPurchase")}
          data={["Yes", "No"]}
        />

        {/* Down Payment of Purchase Price (%) */}
        <NumberInput
          disabled={isCashPurchase()}
          label={
            <TooltipIcon
              label="Down Payment"
              tooltip="How much money do you plan to put toward the purchase of this property?"
            />
          }
          placeholder="Down payment percentage"
          {...form.getInputProps("downPaymentPercentage")}
          leftSection={<PercentPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Loan Interest Rate (%) */}
        <NumberInput
          disabled={isCashPurchase()}
          label={
            <TooltipIcon
              label="Loan Interest Rate"
              tooltip="What rate do you think you'll get on your loan?"
            />
          }
          placeholder="Loan interest rate"
          {...form.getInputProps("loanInterestRate")}
          leftSection={<PercentPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Points Charged by Lender */}
        <NumberInput
          disabled={isCashPurchase()}
          label={
            <TooltipIcon
              label="Points Charged by Lender"
              tooltip="Often when you take out a loan, you will pay 'points.' how many points."
            />
          }
          placeholder="Points charged by lender"
          {...form.getInputProps("pointsChargedByLender")}
        />

        {/* Other Charges From the Lender ($) */}
        <NumberInput
          disabled={isCashPurchase()}
          label={
            <TooltipIcon
              label="Other Charges From Lender"
              tooltip="Are there any other fees that the lender will charge?"
            />
          }
          placeholder="Other charges"
          {...form.getInputProps("otherChargesFromLender")}
          thousandSeparator=","
          leftSection={<DollarPrefixIcon />}
          leftSectionProps={{ style: prefixStyle }}
        />

        {/* Loan Fees & Points */}
        <NumberInput
          disabled={isCashPurchase()}
          label={
            <TooltipIcon
              label="Loan Fees & Points"
              tooltip="For the purpose of this calculation, would you like to wrap loan fees/points into the loan?"
            />
          }
          placeholder="Loan fees and points"
          {...form.getInputProps("loanFeesAndPoints")}
        />

        {/* Interest Only? (Y/N) */}
        <NativeSelect
          disabled={isCashPurchase()}
          label={
            <TooltipIcon
              label="Interest Only?"
              tooltip="Loans typically contain two parts: the interest (the profit for the lender) and the principle (the amount you are paying off each month.) However, some loans are interest-only, which means the principle balance is never paid down."
            />
          }
          {...form.getInputProps("interestOnly")}
          data={["Yes", "No"]}
        />

        {/* Amortized Over How Many Years? */}
        <NumberInput
          disabled={isCashPurchase()}
          label={
            <TooltipIcon
              label="Amortized Over How Many Years?"
              tooltip="How long do you expect the term length to be on your loan?"
            />
          }
          placeholder="Amortization period"
          {...form.getInputProps("amortizationYears")}
        />

        {/* Typical Cap Rate for Your Area (%) */}
        <NumberInput
          disabled={isCashPurchase()}
          label={
            <TooltipIcon
              label="Typical Cap Rate for Your Area"
              tooltip="The Cap Rate (Capitalization Rate) is a unit of measurement for the expected rate of return on a real estate investment property."
            />
          }
          placeholder="Cap rate"
          {...form.getInputProps("capRate")}
          leftSection={<PercentPrefixIcon />}
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

export default LoanDetailsForm;
