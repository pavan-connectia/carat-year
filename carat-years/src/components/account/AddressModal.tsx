import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePostAddress, useUpdateAddress } from "@/hooks/useAddress";
import type { TAddress } from "@/types/api";
import { useEffect } from "react";

const addressSchema = z.object({
  type: z.string(),
  name: z.string().min(1, "Name is required"),
  email: z.email().min(1, "Invalid email"),
  phone: z.string().min(10, "Phone is required"),
  pincode: z.string().min(5, "Pincode is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  addressLine1: z.string().min(1, "Address is required"),
  addressLine2: z.string().optional(),
  landmark: z.string().optional(),
  isDefault: z.boolean(),
});

export type TAddressForm = z.infer<typeof addressSchema>;

type AddressModalProps = {
  open: boolean;
  onClose: () => void;
  address?: TAddress | null;
};

const defaultValues = {
  type: "home",
  name: "",
  email: "",
  phone: "",
  pincode: "",
  state: "",
  city: "",
  addressLine1: "",
  addressLine2: "",
  landmark: "",
  isDefault: false,
};

export default function AddressModal({
  open,
  onClose,
  address,
}: AddressModalProps) {
  const form = useForm<TAddressForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: defaultValues,
  });
  const { mutate: create } = usePostAddress();
  const { mutate: update } = useUpdateAddress();

  const onSubmit = (values: TAddress) => {
    if (address) {
      update({
        id: address._id || "",
        formData: values,
      });
    } else {
      create(values);
    }

    onClose();
  };

  useEffect(() => {
    if (address) form.reset(address);
    else form.reset(defaultValues);
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="h-[96vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Address</DialogTitle>
        </DialogHeader>

        <Card className="p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-1 gap-5 md:grid-cols-2"
            >
              {[
                { name: "type", label: "Address Type", type: "text" },
                { name: "name", label: "Full Name", type: "text" },
                { name: "email", label: "Email", type: "text" },
                { name: "phone", label: "Phone", type: "text" },
                { name: "pincode", label: "Pincode", type: "text" },
                { name: "state", label: "State", type: "text" },
                { name: "city", label: "City", type: "text" },
                {
                  name: "addressLine1",
                  label: "Address Line 1",
                  type: "text",
                  full: true,
                },
                {
                  name: "addressLine2",
                  label: "Address Line 2 (Optional)",
                  type: "text",
                  full: true,
                },
                {
                  name: "landmark",
                  label: "Landmark (Optional)",
                  type: "text",
                  full: true,
                },
                {
                  name: "isDefault",
                  label: "Set as default",
                  type: "checkbox",
                },
              ].map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name as keyof TAddressForm}
                  render={({ field: f }) => (
                    <FormItem
                      className={
                        field.type === "checkbox"
                          ? "flex items-center space-x-2"
                          : field.full
                            ? "col-span-full"
                            : ""
                      }
                    >
                      {field.type === "text" ? (
                        <>
                          <FormLabel>{field.label}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={field.label}
                              value={f.value as string}
                              onChange={f.onChange}
                              onBlur={f.onBlur}
                              name={f.name}
                              ref={f.ref}
                            />
                          </FormControl>
                        </>
                      ) : (
                        <>
                          <FormControl>
                            <Checkbox
                              checked={!!f.value}
                              onCheckedChange={f.onChange}
                            />
                          </FormControl>
                          <FormLabel>{field.label}</FormLabel>
                        </>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}

              <Button type="submit" className="col-span-full">
                Save Address
              </Button>
            </form>
          </Form>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
