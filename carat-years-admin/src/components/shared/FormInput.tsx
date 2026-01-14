import {
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";

export type FormInputProps = {
  control: any;
  name: string;
  label?: string;
  type?: "text" | "number";
  readOnly?: boolean;
  disabled?: boolean;
};

export default function FormInput({
  control,
  name,
  label,
  type = "text",
  readOnly = false,
  disabled = false,
}: FormInputProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              type={type}
              onChange={(e) =>
                field.onChange(
                  type === "number" ? Number(e.target.value) : e.target.value,
                )
              }
              readOnly={readOnly}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}