import { useFieldArray, useWatch, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormField,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { LucidePlus } from "lucide-react";
import FormInput from "../shared/FormInput";
import { TagInput } from "../ui/TagInput";
import { useRates } from "@/hooks/useRate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultiSelect } from "../ui/multi-select";
import { useEffect } from "react";

export default function Carats({ vIndex, sIndex, control, setValue }: any) {
  const { watch } = useFormContext();
  const { data } = useRates();

  const metal = useWatch({
    control,
    name: `variations.${vIndex}.metal`,
  });


  const normalizeMetal = (metal?: string, color?: string) => {
    if (!metal) return "";

    const m = metal.toLowerCase();
    const c = color?.toLowerCase() || "";

    // SILVER
    if (m === "925" || c.includes("silver")) return "silver";

    // PLATINUM
    if (c.includes("platinum")) return "platinum";

    // GOLD
    if (m.includes("9k")) return "9k";
    if (m.includes("14k")) return "14k";
    if (m.includes("18k")) return "18k";

    return "";
  };




  const metalRateValue = data?.data?.metal?.[normalizeMetal(metal)] ?? 0;

  const {
    fields: caratFields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: `variations.${vIndex}.shapes.${sIndex}.carats`,
  });

  const recalcTotal = (cIndex: number) => {
    const diamondAmts =
      watch(
        `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.diamondAmt`,
      ) || [];
    const metalAmt =
      watch(
        `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.metalAmt`,
      ) || 0;
    const labourAmt =
      watch(
        `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.labourAmt`,
      ) || 0;

    setValue(
      `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.totalAmt`,
      diamondAmts.reduce((a: number, b: number) => a + b, 0) +
      Number(metalAmt) +
      Number(labourAmt),
    );
  };

  useEffect(() => {
    if (!data?.data?.labour) return;

    caratFields.forEach((_, cIndex) => {
      const val = watch(
        `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.labourCategory`
      );

      if (val) {
        setValue(
          `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.labourCategory`,
          val,
          { shouldDirty: false }
        );
      }
    });
  }, [data?.data?.labour]);

  return (
    <div className="space-y-3">
      {caratFields.map((_, cIndex) => (
        <Card
          key={cIndex}
          className="grid gap-5 border-l-4 border-gray-400 p-3 sm:grid-cols-2"
        >
          <FormInput
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.carat`}
            label="Carat"
            type="number"
          />

          <FormField
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.size`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl>
                  <TagInput
                    {...field}
                    placeholder="Type a size & press enter"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormInput
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.diamondCount`}
            label="Diamond Count"
            type="number"
          />

          <FormInput
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.diamondDimension`}
            label="Diamond Dimension"
          />

          <FormField
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.labourCategory`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Labour Category</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);

                      const labourRate =
                        data?.data?.labour?.[val.toLowerCase()] ?? 0;

                      const nWt = watch(
                        `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.nWt`
                      );

                      setValue(
                        `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.labourRate`,
                        labourRate
                      );
                      setValue(
                        `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.labourAmt`,
                        labourRate * (nWt || 0)
                      );

                      recalcTotal(cIndex);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Labour Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(data?.data?.labour || {}).map((l) => (
                        <SelectItem key={l} value={l.toUpperCase()}>
                          {l.toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormInput
            control={control}
            type="number"
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.gWt`}
            label="Gross Weight (gWt)"
          />

          <FormField
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.nWt`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Net Weight (nWt)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => {
                      const nWt = Number(e.target.value);
                      field.onChange(nWt);

                      const labourRate = watch(
                        `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.labourRate`,
                      );

                      setValue(
                        `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.metalRate`,
                        metalRateValue,
                      );
                      setValue(
                        `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.metalAmt`,
                        metalRateValue * nWt,
                      );
                      setValue(
                        `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.labourAmt`,
                        labourRate * nWt,
                      );

                      recalcTotal(cIndex);
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.diamondCategory`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Diamond Category</FormLabel>
                <FormControl>
                  <MultiSelect
                    value={field.value || []}
                    onChange={(categories) => {
                      field.onChange(categories);
                      const rates = categories.map(
                        (cat) => data?.data?.diamond?.[cat] ?? 0,
                      );

                      setValue(
                        `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.diamondRate`,
                        rates,
                      );
                      setValue(
                        `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.diamondWeight`,
                        categories.map(() => 0),
                      );

                      recalcTotal(cIndex);
                    }}
                    options={Object.keys(data?.data?.diamond || {})}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {watch(
            `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.diamondCategory`,
          )?.map((cat: string, wIndex: number) => (
            <FormField
              key={cat}
              control={control}
              name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.diamondWeight.${wIndex}`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight ({cat.toUpperCase()})</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        const weight = Number(e.target.value);
                        field.onChange(weight);

                        const rate = watch(
                          `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.diamondRate.${wIndex}`,
                        );

                        setValue(
                          `variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.diamondAmt.${wIndex}`,
                          weight * rate,
                        );

                        recalcTotal(cIndex);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          ))}

          <FormInput
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.metalRate`}
            label="Metal Rate"
            readOnly
          />

          <FormInput
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.labourRate`}
            label="Labour Rate"
            readOnly
          />

          <FormInput
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.diamondRate`}
            label="Diamond Rate"
            readOnly
          />

          <FormInput
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.diamondAmt`}
            label="Diamond Amt"
            readOnly
          />

          <FormInput
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.metalAmt`}
            label="Metal Amount"
            readOnly
          />

          <FormInput
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.labourAmt`}
            label="Labour Amount"
            readOnly
          />

          <FormInput
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.carats.${cIndex}.totalAmt`}
            label="Total Amount"
            readOnly
          />

          <Button
            variant="destructive"
            size="sm"
            onClick={() => remove(cIndex)}
          >
            Remove Carat
          </Button>
        </Card>
      ))}

      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() =>
          append({
            carat: 0,
            size: [],
            diamondCount: 0,
            diamondDimension: "",
            labourCategory: "",
            nWt: 0,
            diamondCategory: [],
            diamondWeight: [],
            diamondRate: [],
            diamondAmt: [],
            metalRate: metalRateValue,
            metalAmt: 0,
            labourRate: 0,
            labourAmt: 0,
            totalAmt: 0,
          })
        }
      >
        <LucidePlus className="mr-1 h-4 w-4" /> Add Carat
      </Button>
    </div>
  );
}
