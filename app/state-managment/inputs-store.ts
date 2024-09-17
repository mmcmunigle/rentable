import { create } from "zustand";
import { PropertyInfo } from "../interfaces/PropertyInfo";
import { PurchaseInfo } from "../interfaces/PurchaseInfo";
import { LoanDetails } from "../interfaces/LoanDetails";
import { RentalInfo } from "../interfaces/RentalInfo";
import { Assumptions } from "../interfaces/Assumptions";

interface InputsStore {
  property?: PropertyInfo;
  purchase?: PurchaseInfo;
  loan?: LoanDetails;
  rental?: RentalInfo;
  assumptions?: Assumptions;
  setProperty: (data: PropertyInfo) => void;
  setPurchase: (data: PurchaseInfo) => void;
  setLoan: (data: LoanDetails) => void;
  setRental: (data: RentalInfo) => void;
  setAssumptions: (data: Assumptions) => void;
}

const useInputsStore = create<InputsStore>((set) => ({
  property: undefined,
  purchase: undefined,
  loan: undefined,
  rental: undefined,
  assumptions: undefined,
  setProperty: (data: PropertyInfo) =>
    set((store) => ({ ...store, property: data })),
  setPurchase: (data: PurchaseInfo) =>
    set((store) => ({ ...store, purchase: data })),
  setLoan: (data: LoanDetails) => set((store) => ({ ...store, loan: data })),
  setRental: (data: RentalInfo) => set((store) => ({ ...store, rental: data })),
  setAssumptions: (data: Assumptions) =>
    set((store) => ({ ...store, assumptions: data })),
}));

export default useInputsStore;
