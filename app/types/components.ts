// Button
export interface AppButtonProps {
  variant: "primary" | "secondary" | "ghost";
  type: "button" | "submit" | "reset";
  loading: boolean;
  disabled: boolean;
}

// FormInput
export interface AppFormInputProps {
  id: string;
  modelValue: string | number;
  type: "text" | "email" | "password" | "number" | "tel" | "url";
  hasError: boolean;
  placeholder?: string;
  autocomplete?: string;
}

// FormLabel
export interface AppFormLabelProps {
  forId: string;
}

// FormError
export interface AppFormErrorProps {
  inputId: string;
  errors: string[];
}

// FormField (wrapper)
export interface AppFormFieldProps {
  inputId: string;
  label: string;
  errors: string[];
  onBlur: () => void;
}

// AppSelect
export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface AppSelectProps {
  id: string;
  modelValue: string | number | null;
  options: SelectOption[];
  placeholder?: string;
  hasError: boolean;
}

// AppCombobox
export interface AppComboboxProps {
  id: string;
  modelValue: string | number | null;
  options: SelectOption[];
  label: string;
  placeholder?: string;
  hasError: boolean;
  autoComplete?: "list" | "both";
}
