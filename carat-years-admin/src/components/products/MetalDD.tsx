import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

const METAL_OPTIONS = [
  { value: "9k", label: "9K Gold" },
  { value: "14k", label: "14K Gold" },
  { value: "18k", label: "18K Gold" },
  { value: "silver", label: "Silver (925)" },
  { value: "platinum", label: "Platinum" },
];

const COLOR_OPTIONS = [
  { value: "Silver", label: "Silver" },
  { value: "Platinum", label: "Platinum" },
  { value: "Yellow Gold", label: "Yellow Gold" },
  { value: "White Gold", label: "White Gold" },
  { value: "Rose Gold", label: "Rose Gold" },
];

export default function MetalDD({ vIndex }: { vIndex: number }) {
  const { control, watch, setValue } = useFormContext();
  
  const metalValue = watch(`variations.${vIndex}.metal`);
  
  // Filter color options based on metal
  const getFilteredColorOptions = () => {
    if (!metalValue) return [];
    
    switch (metalValue) {
      case "silver":
        return COLOR_OPTIONS.filter(opt => opt.value === "Silver");
      case "platinum":
        return COLOR_OPTIONS.filter(opt => opt.value === "Platinum");
      case "9k":
      case "14k":
      case "18k":
        return COLOR_OPTIONS.filter(opt => 
          opt.value === "Yellow Gold" || 
          opt.value === "White Gold" || 
          opt.value === "Rose Gold"
        );
      default:
        return COLOR_OPTIONS;
    }
  };

  // Auto-set color when metal changes
  useEffect(() => {
    if (!metalValue) return;
    
    const filteredOptions = getFilteredColorOptions();
    if (filteredOptions.length === 1) {
      setValue(`variations.${vIndex}.color`, filteredOptions[0].value);
    }
  }, [metalValue, setValue, vIndex]);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      <FormField
        control={control}
        name={`variations.${vIndex}.metal`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Metal</FormLabel>
            <Select value={field.value} onValueChange={field.onChange}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select metal" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {METAL_OPTIONS.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`variations.${vIndex}.color`}
        render={({ field }) => {
          const filteredOptions = getFilteredColorOptions();
          const isDisabled = !metalValue || filteredOptions.length <= 1;
          
          return (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <Select 
                value={field.value} 
                onValueChange={field.onChange}
                disabled={isDisabled}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={
                      !metalValue ? "Select metal first" : 
                      filteredOptions.length === 1 ? filteredOptions[0].label : 
                      "Select color"
                    } />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {filteredOptions.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}