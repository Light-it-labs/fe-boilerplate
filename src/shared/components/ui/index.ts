import { Control, FieldValues, Path } from "react-hook-form";

export * from "./Button";
export * from "./Calendar";
export * from "./DateField";
export * from "./DatePicker";
export * from "./Modal";
export * from "./RangeCalendar";

// This type defines the props (name and control) for the hookform version of form inputs.
// When control is provided, onChange and onBlur should not be allowed.
export interface WithHookForm<U extends FieldValues> {
  name: Path<U>;
  control: Control<U>;
  onChange?: never;
  onBlur?: never;
}
// This type allows onChange and onBlur to be passed when there is no control.
// Also makes name optional and a generic string instead of a form Path.
export interface WithoutHookForm<T> {
  name?: string;
  control?: never;
  onChange?: (newValue: T) => void;
  onBlur?: (event: React.FocusEvent) => void;
}
