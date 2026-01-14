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

type DesignTypeDDProps = {
  control: any;
};

export default function DesignTypeDD({ control }: DesignTypeDDProps) {
  return (
    <FormField
      control={control}
      name="designType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Design Type</FormLabel>
          <FormControl>
            <Select 
              key={field.value} 
              onValueChange={field.onChange} 
              value={field.value || ""}
            >
              <SelectTrigger className="w-full border">
                <SelectValue placeholder="Select design type" />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Classic",
                  "Vintage",
                  "Contemporary",
                  "Minimalist",
                  "Statement",
                  "Ethnic",
                  "Boho",
                  "Customizable",
                  "solitaire",
                  "Signature",
                  "Bracelet",
                  "single line",
                  "Party",
                  "PENDANT",
                  "chain set"
                ].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
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