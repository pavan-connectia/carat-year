import { useEffect } from "react";
import { useFieldArray, useWatch } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormField,
} from "@/components/ui/form";
import { LucidePlus, LucideTrash2 } from "lucide-react";
import { useRates } from "@/hooks/useRate";

interface SizesProps {
  vIndex: number;
  sIndex: number;
  cIndex: number;
  control: any;
  setValue: any;
  metal: string;
}

export default function Sizes({
  vIndex,
  sIndex,
  cIndex,
  control,
  setValue,
  metal,
}: SizesProps) {
  const { data } = useRates();
  const rates = data?.data;
  const {
    fields: sizeFields,
    append: addSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.sizes`,
  });

  const sizes = useWatch({
    control,
    name: `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.sizes`,
  });

  useEffect(() => {
    if (!sizes || !rates) return;

    sizes.forEach((size: any, szIndex: number) => {
      const goldWeight = Number(size.goldWeight || 0);
      const makingCharge = Number(size.makingCharge || 0);
      const diamondWeight = Number(size.diamondWeight || 0);
      const discountPercent = Number(size.discountValue || 0);

      let metalRate = rates.gold["18k"];
      const metalUpper = metal?.toUpperCase() || "9K";
      if (metalUpper.includes("9K")) metalRate = rates.gold["9k"];
      else if (metalUpper.includes("14K")) metalRate = rates.gold["14k"];
      else if (metalUpper.includes("18K")) metalRate = rates.gold["18k"];
      else if (metalUpper.includes("SILVER")) metalRate = rates.silver;

      const diamondRate = rates.diamond;

      const makingValue = goldWeight * makingCharge;
      const goldValue = goldWeight * metalRate;
      const diamondValue = diamondWeight * diamondRate;
      const discountAmount = (discountPercent / 100) * diamondValue;
      const grossValue =
        makingValue + goldValue + diamondValue - discountAmount;
      const totalValue = grossValue * (1 + (size.gstPercent || 3) / 100);

      // Only set if value changed
      if (size.goldValue !== goldValue)
        setValue(
          `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.sizes.${szIndex}.goldValue`,
          goldValue,
        );
      if (size.diamondValue !== diamondValue)
        setValue(
          `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.sizes.${szIndex}.diamondValue`,
          diamondValue,
        );
      if (size.grossValue !== grossValue)
        setValue(
          `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.sizes.${szIndex}.grossValue`,
          grossValue,
        );
      if (size.totalValue !== totalValue)
        setValue(
          `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.sizes.${szIndex}.totalValue`,
          totalValue,
        );
    });
  }, [sizes, rates, vIndex, sIndex, cIndex, metal, setValue]);

  return (
    <div className="space-y-8">
      {sizeFields.map((sz: any, szIndex: number) => (
        <div
          key={sz.id}
          className="grid grid-cols-1 items-end gap-4 md:grid-cols-4"
        >
          {[
            { key: "size", editable: true },
            { key: "goldWeight", editable: true },
            { key: "makingCharge", editable: true },
            { key: "diamondWeight", editable: true },
            { key: "discountValue", editable: true },
            { key: "goldValue", editable: false },
            { key: "diamondValue", editable: false },
            { key: "grossValue", editable: false },
            { key: "totalValue", editable: false },
          ].map((field) => (
            <FormField
              key={field.key}
              control={control}
              name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.sizes.${szIndex}.${field.key}`}
              render={({ field: f }) => (
                <FormItem>
                  <FormLabel className="capitalize">{field.key}</FormLabel>
                  <FormControl>
                    <Input
                      {...f}
                      type={field.key === "size" ? "text" : "number"}
                      value={
                        f.value !== undefined && f.value !== null
                          ? f.value
                          : field.key === "size"
                            ? ""
                            : 0
                      }
                      onChange={(e) =>
                        field.editable
                          ? f.onChange(
                              field.key === "size"
                                ? e.target.value
                                : Number(e.target.value),
                            )
                          : null
                      }
                      disabled={!field.editable}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => removeSize(szIndex)}
          >
            <LucideTrash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}

      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() =>
          addSize({
            size: "",
            goldWeight: 0,
            makingCharge: 0,
            diamondWeight: 0,
            discountValue: 0,
            goldValue: 0,
            diamondValue: 0,
            grossValue: 0,
            totalValue: 0,
          })
        }
      >
        <LucidePlus className="mr-1 h-4 w-4" /> Add Size
      </Button>
    </div>
  );
}
