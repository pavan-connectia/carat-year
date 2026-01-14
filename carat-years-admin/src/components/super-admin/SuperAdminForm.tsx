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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TSuperAdmin } from "@/types/api";
import { useEffect } from "react";
import { useSignup, useUpdateSuperAdmin } from "@/hooks/useSuperAdmin";
import SaveCancel from "../shared/SaveCancel";

type SuperAdminFormProps = {
  isOpen: boolean;
  onClose: () => void;
  superAdmin?: TSuperAdmin | null;
};

const roleEnum = z.enum(["SuperAdmin", "Admin"]);

const createSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must contain at least 6 characters"),
  role: roleEnum,
});

const updateSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().optional(),
  role: roleEnum,
});

type CreateFormValues = z.infer<typeof createSchema>;
type UpdateFormValues = z.infer<typeof updateSchema>;

const defaultValues: CreateFormValues = {
  name: "",
  email: "",
  password: "",
  role: "Admin",
};

export default function SuperAdminForm({
  isOpen,
  onClose,
  superAdmin,
}: SuperAdminFormProps) {
  const isEdit = !!superAdmin;

  const form = useForm<CreateFormValues | UpdateFormValues>({
    resolver: zodResolver(isEdit ? updateSchema : createSchema),
    defaultValues,
  });

  const { mutate: createAdmin } = useSignup();
  const { mutate: updateAdmin } = useUpdateSuperAdmin();

  useEffect(() => {
    if (superAdmin) {
      form.reset({
        name: superAdmin.name,
        email: superAdmin.email,
        password: "",
        role: superAdmin.role,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [superAdmin, form]);

  const onSubmit = (values: CreateFormValues | UpdateFormValues) => {
    if (isEdit && superAdmin?._id) {
      const { password, ...rest } = values as UpdateFormValues;
      const formData = password ? values : rest;

      updateAdmin(
        { id: superAdmin._id, formData },
        {
          onSuccess: () => {
            onClose();
            form.reset();
          },
        },
      );
    } else {
      createAdmin(values as CreateFormValues, {
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
          <DialogTitle>
            {isEdit ? "Edit Admin" : "Create Admin"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Update admin details and role."
              : "Create a new admin or super admin."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* NAME */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* EMAIL */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PASSWORD */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password {isEdit && "(leave blank to keep current)"}
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* ROLE */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="SuperAdmin">
                          Super Admin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SaveCancel />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
