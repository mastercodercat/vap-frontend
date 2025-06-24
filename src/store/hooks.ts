import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./index";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Create a properly typed selector
export const useAppSelector: TypedUseSelectorHook<RootState> =
  useSelector as TypedUseSelectorHook<RootState>;

// Custom typed selector for better type inference
export const useTypedSelector = <TSelected>(
  selector: (state: RootState) => TSelected
): TSelected => {
  return useSelector(selector);
};
