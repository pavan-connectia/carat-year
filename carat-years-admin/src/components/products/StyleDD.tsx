import { Check, ChevronsUpDown,} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "../ui/form";

const styles = ["solitaire", "Side-Stone", "3-Stone", "5-stone", "7-stone", "Eternity", "Anniversary"];

export default function StyleDD({ control }: { control: any }) {
  return (
    <FormField
      control={control}
      name="style"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Style</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between h-auto min-h-10"
                >
                  <div className="flex flex-wrap gap-1">
                    {field.value?.length > 0 ? (
                      field.value.map((val: string) => (
                        <Badge key={val} variant="secondary" className="mr-1">
                          {val}
                        </Badge>
                      ))
                    ) : (
                      "Select styles..."
                    )}
                  </div>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search style..." />
                <CommandList>
                  <CommandEmpty>No style found.</CommandEmpty>
                  <CommandGroup>
                    {styles.map((style) => (
                      <CommandItem
                        key={style}
                        onSelect={() => {
                          const newValue = field.value?.includes(style)
                            ? field.value.filter((v: string) => v !== style)
                            : [...(field.value || []), style];
                          field.onChange(newValue);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value?.includes(style) ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {style}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}