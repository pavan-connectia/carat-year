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
import { TProductCategory } from "@/types/api";
import { useEffect } from "react";
import {
  usePostProductCategory,
  useUpdateProductCategory,
} from "@/hooks/useProductCategory";
import SaveCancel from "../shared/SaveCancel";
import { Button } from "../ui/button";
import slugify from "slugify";
import Order from "../shared/Order";
import PublishStatusSelect from "../shared/PublishStatusSelect";
import ImageUpload from "../shared/ImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type ProductCategoryProps = {
  isOpen: boolean;
  onClose: () => void;
  category?: TProductCategory | null;
  length: number;
};

const formSchema = z.object({
  image: z.string(),
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  featured: z.boolean(),
  order: z.number(),
  publish: z.boolean(),
});

type ProductCategoryValues = z.infer<typeof formSchema>;

const defaultValues = {
  image: "",
  title: "",
  slug: "",
  featured: false,
  order: 1,
  publish: true,
};

export default function ProductCategoryForm({
  isOpen,
  onClose,
  category,
}: ProductCategoryProps) {
  const form = useForm<ProductCategoryValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const { mutate: post } = usePostProductCategory();
  const { mutate: update } = useUpdateProductCategory();

  useEffect(() => {
    if (category) {
      form.reset(category);
    } else {
      form.reset(defaultValues);
    }
  }, [category]);

  const onSubmit = (values: ProductCategoryValues) => {
    if (category && category._id) {
      update(
        { id: category._id, formData: values },
        {
          onSuccess: () => {
            onClose();
          },
        },
      );
    } else {
      post(values, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Product Category</DialogTitle>
          <DialogDescription>
            Make changes to your product category. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <ImageUpload control={form.control} folder="uploads/category" />
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          const title = form.getValues("title");
                          form.setValue(
                            "slug",
                            slugify(title || "", { lower: true, strict: true }),
                          );
                        }}
                      >
                        Generate
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured (In Home page)</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value === "true")}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full border">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="true">Yes</SelectItem>
                      <SelectItem value="false">No</SelectItem>
                    </SelectContent>
                  </Select>
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
