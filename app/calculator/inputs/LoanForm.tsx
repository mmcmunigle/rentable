import TooltipIcon from "@/app/components/TooltipIcon";
import useInputsStore from "@/app/state-managment/inputs-store";
import { Button, NativeSelect, NumberInput, Stack } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useEffect } from "react";

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
      // Add other fields with their initial values
    },
    validate: {
      downPaymentPercentage: (value) =>
        value < 0 || value > 100 ? "Must be between 0 and 100" : null,
      loanInterestRate: (value) =>
        value < 0 ? "Must be a positive percentage" : null,
      pointsChargedByLender: (value) =>
        value < 0 ? "Must be a positive number" : null,
      otherChargesFromLender: (value) =>
        value < 0 ? "Must be a positive number" : null,
      loanFeesAndPoints: (value) =>
        value < 0 ? "Must be a positive number" : null,
      amortizationYears: (value) =>
        value <= 0 ? "Must be a positive number" : null,
      capRate: (value) => (value < 0 ? "Must be a positive percentage" : null),
    },
  });

  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const loanInfo = JSON.parse(data);
      form.setValues(loanInfo);
      setLoan(loanInfo);
    }
  }, []);

  const isCashPurchase = () => {
    return form.getValues().cashPurchase === "Yes";
  };

  const handleSubmit = (values: typeof form.values) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
    setLoan(values);
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
              label="Down Payment (%)"
              tooltip="How much money do you plan to put toward the purchase of this property?"
            />
          }
          placeholder="Enter down payment percentage"
          {...form.getInputProps("downPaymentPercentage")}
        />

        {/* Loan Interest Rate (%) */}
        <NumberInput
          disabled={isCashPurchase()}
          label={
            <TooltipIcon
              label="Loan Interest Rate (%)"
              tooltip="What rate do you think you'll get on your loan?"
            />
          }
          placeholder="Enter loan interest rate"
          {...form.getInputProps("loanInterestRate")}
        />

        {/* Points Charged by Lender */}
        <NumberInput
          disabled={isCashPurchase()}
          label={
            <TooltipIcon
              label="Points Charged by Lender"
              tooltip="Often when you take out a loan, you will pay 'points.' Enter how many points."
            />
          }
          placeholder="Enter points charged by lender"
          {...form.getInputProps("pointsChargedByLender")}
        />

        {/* Other Charges From the Lender ($) */}
        <NumberInput
          disabled={isCashPurchase()}
          label={
            <TooltipIcon
              label="Other Charges From Lender ($)"
              tooltip="Are there any other fees that the lender will charge?"
            />
          }
          placeholder="Enter other charges from the lender"
          {...form.getInputProps("otherChargesFromLender")}
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
          placeholder="Enter loan fees and points"
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
          placeholder="Enter amortization period"
          {...form.getInputProps("amortizationYears")}
        />

        {/* Typical Cap Rate for Your Area (%) */}
        <NumberInput
          disabled={isCashPurchase()}
          label={
            <TooltipIcon
              label="Typical Cap Rate for Your Area (%)"
              tooltip="The Cap Rate (Capitalization Rate) is a unit of measurement for the expected rate of return on a real estate investment property."
            />
          }
          placeholder="Enter cap rate"
          {...form.getInputProps("capRate")}
        />

        {/* Add more fields as necessary */}

        <Button type="submit" variant="outline">
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default LoanDetailsForm;
