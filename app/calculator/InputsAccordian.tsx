import { Accordion, Button, Stack, Text } from "@mantine/core";
import PropertyForm from "./inputs/PropertyForm";
import PurchaseInfoForm from "./inputs/PurchaseInfoForm";
import LoanDetailsForm from "./inputs/LoanForm";
import AssumptionsForm from "./inputs/AssumptionsForm";
import RentalInfoForm from "./inputs/RentalForm";
import useInputsStore from "../state-managment/inputs-store";
import {
  calculateAnnualizedResults,
  calculateTopLevelReturns,
} from "../utils/calcs-manager";
import useResultsStore from "../state-managment/results-store";

const InputsAccordian = () => {
  const purchase = useInputsStore((store) => store.purchase);
  const rental = useInputsStore((store) => store.rental);
  const loan = useInputsStore((store) => store.loan);
  const assumptions = useInputsStore((store) => store.assumptions);
  const setResults = useResultsStore((store) => store.setResults);
  const setAnnualized = useResultsStore((store) => store.setAnnualized);

  return (
    <Stack>
      <Accordion variant="contained" defaultValue="property">
        <Accordion.Item value="property">
          <Accordion.Control>
            <Text fw={700}>Property Details</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <PropertyForm />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="purchase">
          <Accordion.Control>
            <Text fw={700}>Purchase Price & Costs</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <PurchaseInfoForm />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="loan">
          <Accordion.Control>
            <Text fw={700}>Loan Details</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <LoanDetailsForm />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="rental">
          <Accordion.Control>
            <Text fw={700}>Rental Info</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <RentalInfoForm />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="assumptions">
          <Accordion.Control>
            <Text fw={700}>Assumptions</Text>
          </Accordion.Control>
          <Accordion.Panel>
            <AssumptionsForm />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <Button
        disabled={!purchase || !loan || !assumptions || !rental}
        onClick={() => {
          const results = calculateTopLevelReturns(
            purchase!,
            rental!,
            loan!,
            assumptions!
          );
          setResults(results);

          const annualized = calculateAnnualizedResults(
            results,
            assumptions!,
            purchase!
          );
          setAnnualized(annualized);
        }}
      >
        Submit
      </Button>
    </Stack>
  );
};

export default InputsAccordian;
