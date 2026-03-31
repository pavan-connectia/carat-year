import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { LucideArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRates, useUpdateRate } from "@/hooks/useRate";
import { useEffect } from "react";

// ✅ use z.coerce.number() to avoid "expected number, received string"
const formSchema = z.object({
  gold9k: z.number().min(0, "Required"),
  gold14k: z.number().min(0, "Required"),
  gold18k: z.number().min(0, "Required"),
  silver: z.number().min(0, "Required"),
  platinum: z.number().min(0, "Required").optional(),

  d1: z.number().min(0, "Required"),
  d2: z.number().min(0, "Required"),
  d3: z.number().min(0, "Required"),
  d4: z.number().min(0, "Required"),
  d5: z.number().min(0, "Required"),
  d6: z.number().min(0, "Required"),
  d7: z.number().min(0, "Required"),
  d8: z.number().min(0, "Required"),
  d9: z.number().min(0, "Required"),
  d10: z.number().min(0, "Required"),
  d11: z.number().min(0, "Required"),
  d12: z.number().min(0, "Required"),
  d13: z.number().min(0, "Required"),
  d14: z.number().min(0, "Required"),
  d15: z.number().min(0, "Required"),
  d16: z.number().min(0, "Required"),
  d17: z.number().min(0, "Required"),
  d18: z.number().min(0, "Required"),
  d19: z.number().min(0, "Required"),
  d20: z.number().min(0, "Required"),
  d21: z.number().min(0, "Required"),
  d22: z.number().min(0, "Required"),
  d23: z.number().min(0, "Required"),
  d24: z.number().min(0, "Required"),
  d25: z.number().min(0, "Required"),
  d26: z.number().min(0, "Required"),
  d27: z.number().min(0, "Required"),
  d28: z.number().min(0, "Required"),
  d29: z.number().min(0, "Required"),
  d30: z.number().min(0, "Required"),

  l1: z.number().min(0, "Required"),
  l2: z.number().min(0, "Required"),
  l3: z.number().min(0, "Required"),
});

type RateFormValues = z.infer<typeof formSchema>;

export default function RateForm() {
  const { data, isLoading } = useRates();
  const { mutate, isPending } = useUpdateRate();
  const navigate = useNavigate();

  const form = useForm<RateFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gold9k: 0,
      gold14k: 0,
      gold18k: 0,
      silver: 0,
      platinum: 0,
      d1: 0,
      d2: 0,
      d3: 0,
      d4: 0,
      d5: 0,
      d6: 0,
      d7: 0,
      d8: 0,
      d9: 0,
      d10: 0,
      d11: 0,
      d12: 0,
      d13: 0,
      d14: 0,
      d15: 0,
      d16: 0,
      d17: 0,
      d18: 0,
      d19: 0,
      d20: 0,
      d21: 0,
      d22: 0,
      d23: 0,
      d24: 0,
      d25: 0,
      d26: 0,
      d27: 0,
      d28: 0,
      d29: 0,
      d30: 0,
      l1: 0,
      l2: 0,
      l3: 0,
    },
  });

  useEffect(() => {
    if (data?.data) {
      form.reset({
        gold9k: data.data.metal["9k"],
        gold14k: data.data.metal["14k"],
        gold18k: data.data.metal["18k"],
        silver: data.data.metal.silver,
        platinum: data.data.metal.platinum,
        d1: data.data.diamond.d1,
        d2: data.data.diamond.d2,
        d3: data.data.diamond.d3,
        d4: data.data.diamond.d4,
        d5: data.data.diamond.d5,
        d6: data.data.diamond.d6,
        d7: data.data.diamond.d7,
        d8: data.data.diamond.d8,
        d9: data.data.diamond.d9,
        d10: data.data.diamond.d10,
        d11: data.data.diamond.d11,
        d12: data.data.diamond.d12,
        d13: data.data.diamond.d13,
        d14: data.data.diamond.d14,
        d15: data.data.diamond.d15,
        d16: data.data.diamond.d16,
        d17: data.data.diamond.d17,
        d18: data.data.diamond.d18,
        d19: data.data.diamond.d19,
        d20: data.data.diamond.d20,
        d21: data.data.diamond.d21,
        d22: data.data.diamond.d22,
        d23: data.data.diamond.d23,
        d24: data.data.diamond.d24,
        d25: data.data.diamond.d25,
        d26: data.data.diamond.d26,
        d27: data.data.diamond.d27,
        d28: data.data.diamond.d28,
        d29: data.data.diamond.d29,
        d30: data.data.diamond.d30,
        l1: data.data.labour.l1,
        l2: data.data.labour.l2,
        l3: data.data.labour.l3,
      });
    }
  }, [data, form]);

  const onSubmit = (values: RateFormValues) => {
    mutate({
      metal: {
        "9k": values.gold9k,
        "14k": values.gold14k,
        "18k": values.gold18k,
        silver: values.silver,
        platinum: values.platinum,
      },
      diamond: {
        d1: values.d1,
        d2: values.d2,
        d3: values.d3,
        d4: values.d4,
        d5: values.d5,
        d6: values.d6,
        d7: values.d7,
        d8: values.d8,
        d9: values.d9,
        d10: values.d10,
        d11: values.d11,
        d12: values.d12,
        d13: values.d13,
        d14: values.d14,
        d15: values.d15,
        d16: values.d16,
        d17: values.d17,
        d18: values.d18,
        d19: values.d19,
        d20: values.d20,
        d21: values.d21,
        d22: values.d22,
        d23: values.d23,
        d24: values.d24,
        d25: values.d25,
        d26: values.d26,
        d27: values.d27,
        d28: values.d28,
        d29: values.d29,
        d30: values.d30
      },
      labour: {
        l1: values.l1,
        l2: values.l2,
        l3: values.l3,
      },
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-5">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <LucideArrowLeft />
        </Button>
        <h2 className="text-xl font-semibold capitalize lg:text-2xl">
          Update Metal, Diamond & Labour Rates
        </h2>
      </div>

      <Card className="mx-auto w-full p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Metal Section */}
            <section>
              <h3 className="mb-3 text-lg font-semibold">
                Metal Rates (₹ / g)
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                {[
                  { name: "gold9k", label: "Gold 9K" },
                  { name: "gold14k", label: "Gold 14K" },
                  { name: "gold18k", label: "Gold 18K" },
                  { name: "silver", label: "Silver" },
                  { name: "platinum", label: "Platinum" },
                ].map((i) => (
                  <FormField
                    control={form.control}
                    key={i.name}
                    name={i.name as keyof RateFormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{i.label}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </section>

            {/* Diamond Section */}
            <section>
              <h3 className="mb-3 text-lg font-semibold">
                Diamond Rates (₹ / carat)
              </h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
                {Array.from({ length: 30 }).map((_, i) => {
                  const name = `d${i + 1}` as keyof RateFormValues;
                  return (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{`D${i + 1}`}</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              onChange={(e) =>
                                field.onChange(Number(e.target.value))
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
            </section>

            {/* Labour Section */}
            <section>
              <h3 className="mb-3 text-lg font-semibold">Labour Charges (₹)</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  { name: "l1", label: "Labour 1" },
                  { name: "l2", label: "Labour 2" },
                  { name: "l3", label: "Labour 3" },
                ].map((i) => (
                  <FormField
                    control={form.control}
                    key={i.name}
                    name={i.name as keyof RateFormValues}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{i.label}</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </section>

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isPending || isLoading}
              >
                {isPending ? "Updating..." : "Save All Rates"}
              </Button>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
}
