import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TDiscount } from "@/types/api";
import { useEffect } from "react";
import { usePostDiscount, useUpdateDiscount } from "@/hooks/useDiscount";
import PublishStatusSelect from "../shared/PublishStatusSelect";
import SaveCancel from "../shared/SaveCancel";
import Order from "../shared/Order";

type DiscountFormProps = {
  isOpen: boolean;
  onClose: () => void;
  discount?: TDiscount | null;
  length: number;
};

const formSchema = z.object({
  code: z.string().min(1, "Discount code is required"),
  description: z.string().min(1, "Description is required"),
  labDiscount: z.number(),
  diamondDiscount: z.number(),
  order: z.number(),
  publish: z.boolean(),
});

type DiscountFormValues = z.infer<typeof formSchema>;

const defaultValues: DiscountFormValues = {
  code: "",
  description: "",
  labDiscount: 0,
  diamondDiscount: 0,
  order: 1,
  publish: true,
};

export default function DiscountForm({
  isOpen,
  onClose,
  discount,
  length,
}: DiscountFormProps) {
  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { mutate: post } = usePostDiscount();
  const { mutate: update } = useUpdateDiscount();

  useEffect(() => {
    if (discount) {
      form.reset(discount);
    } else {
      form.reset({ ...defaultValues, order: length || 1 });
    }
  }, [discount, length]);

  const onSubmit = (values: DiscountFormValues) => {
    if (discount && discount._id) {
      update(
        { id: discount._id, formData: values },
        {
          onSuccess: () => onClose(),
        },
      );
    } else {
      post(values, {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Discount</DialogTitle>
          <DialogDescription>
            Make changes to your discount. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discount Code</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write discount details..."
                      className="resize-none"
                      {...field}
                      maxLength={550}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="labDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lab Discount (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="diamondDiscount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Diamond Discount (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Order control={form.control} />
            <PublishStatusSelect control={form.control} />
            <SaveCancel />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
