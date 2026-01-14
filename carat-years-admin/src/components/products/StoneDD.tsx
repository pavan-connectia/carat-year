import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";

type StoneDDProps = {
  control: any;
};

export default function StoneDD({ control }: StoneDDProps) {
  return (
    <FormField
      control={control}
      name="stone"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Stone</FormLabel>
          <FormControl>
            {/* The key={field.value} forces the select to update when data loads */}
            <Select 
              key={field.value} 
              onValueChange={field.onChange} 
              value={field.value || ""}
            >
              <SelectTrigger className="w-full border">
                <SelectValue placeholder="Select stone" />
              </SelectTrigger>
              <SelectContent>
                {["Diamond", "Moissanite", "CVD Diamond", "No Stone"].map((stone) => (
                  <SelectItem key={stone} value={stone}>
                    {stone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
