import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type OrderProps = {
  control: any;
};

export default function Order({ control }: OrderProps) {
  return (
    <FormField
      control={control}
      name="order"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Order</FormLabel>
          <FormControl>
            <Input
              type="text" // use text to allow partial input
              value={field.value ?? ""}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow digits
                if (/^\d*$/.test(value)) {
                  field.onChange(value === "" ? 0 : Number(value));
                }
              }}
              placeholder="Enter order"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
