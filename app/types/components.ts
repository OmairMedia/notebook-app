// Button
export interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
  text?: string;
}

// FormInput
export interface FormInputProps {
  id: string;
  modelValue: string | number;
  type: "text" | "email" | "password" | "number" | "tel" | "url";
  hasError: boolean;
  placeholder?: string;
  autocomplete?: string;
}

// FormLabel
export interface FormLabelProps {
  forId: string;
}

// FormError
export interface FormErrorProps {
  inputId: string;
  errors: string[];
}

// FormField (wrapper)
export interface FormFieldProps {
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

export interface SelectProps {
  id: string;
  modelValue: string | number | null;
  options: SelectOption[];
  placeholder?: string;
  hasError: boolean;
}

// AppCombobox
export interface ComboboxProps {
  id: string;
  modelValue: string | number | null;
  options: SelectOption[];
  label: string;
  placeholder?: string;
  hasError: boolean;
  autoComplete?: "list" | "both";
}
