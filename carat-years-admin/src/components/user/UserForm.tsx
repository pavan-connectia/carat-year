import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { TUser } from "@/types/api";
import { useEffect } from "react";
import { useSignup, useUpdateUser } from "@/hooks/useUser";
import SaveCancel from "../shared/SaveCancel";

type UserFormProps = {
  isOpen: boolean;
  onClose: () => void;
  user?: TUser | null;
};

const createSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().min(1, "Mobile is required"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
});

const updateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().min(1, "Mobile is required"),
  password: z.string().optional(),
});

type CreateUserFormValues = z.infer<typeof createSchema>;
type UpdateUserFormValues = z.infer<typeof updateSchema>;

const defaultValues = {
  name: "",
  email: "",
  mobile: "",
  password: "",
};

export default function UserForm({ isOpen, onClose, user }: UserFormProps) {
  const isEdit = !!user;
  const form = useForm<CreateUserFormValues | UpdateUserFormValues>({
    resolver: zodResolver(isEdit ? updateSchema : createSchema),
    defaultValues: defaultValues,
  });

  const { mutate: post } = useSignup();
  const { mutate: update } = useUpdateUser();

  useEffect(() => {
    if (user) {
      form.reset({ ...user, password: "" });
    } else {
      form.reset(defaultValues);
    }
  }, [user, form]);

  const onSubmit = (values: CreateUserFormValues | UpdateUserFormValues) => {
    if (isEdit && user?._id) {
      const { password, ...rest } = values;
      const formData = password ? values : rest;

      update(
        { id: user._id, formData },
        {
          onSuccess: () => {
            onClose();
            form.reset();
          },
        },
      );
    } else {
      post(values as CreateUserFormValues, {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>User</DialogTitle>
          <DialogDescription>
            Make changes to your user. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {[
              { name: "name", label: "Name" },
              { name: "email", label: "Email" },
              { name: "mobile", label: "Mobile" },
              { name: "password", label: "Password" },
            ].map((i) => (
              <FormField
                control={form.control}
                key={i.name}
                name={i.name as "name" | "email" | "mobile" | "password"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{i.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={i.label} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <SaveCancel />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
