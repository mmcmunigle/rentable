import { create } from "zustand";
import { ResultsSummary } from "../interfaces/ResultsSummary";

interface ResultsStore {
  results?: ResultsSummary;
  annualized?: AnnualizedResults[];
  setResults: (data: ResultsSummary) => void;
  setAnnualized: (data: AnnualizedResults[]) => void;
}

const useResultsStore = create<ResultsStore>((set) => ({
  results: undefined,
  annualized: undefined,
  setResults: (data: ResultsSummary) =>
    set((store) => ({ ...store, results: data })),
  setAnnualized: (data: AnnualizedResults[]) =>
    set((store) => ({ ...store, annualized: data })),
}));

export default useResultsStore;
