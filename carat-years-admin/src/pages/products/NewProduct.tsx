import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LucideArrowLeft, LucidePlus } from "lucide-react";
import { useNavigate } from "react-router";
import { useState } from "react";
import Order from "@/components/shared/Order";
import PublishStatusSelect from "@/components/shared/PublishStatusSelect";
import DesignTypeDD from "@/components/products/DesignTypeDD";
import StyleDD from "@/components/products/StyleDD";
import StoneDD from "@/components/products/StoneDD";
import FormInput from "@/components/shared/FormInput";
import SlugInput from "@/components/shared/SlugInput";
import { TagInput } from "@/components/ui/TagInput";
import MetalDD from "@/components/products/MetalDD";
import Shapes from "@/components/products/Shapes";
import CategoryDD from "@/components/products/CategoryDD";
import axios from "axios";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";

// Define schemas
const caratSchema = z.object({
  carat: z.number(),
  size: z.array(z.string()),
  diamondCount: z.number(),
  diamondDimension: z.string(),
  labourCategory: z.string(),
  gWt: z.number(),
  nWt: z.number(),
  diamondCategory: z.array(z.string()),
  diamondWeight: z.array(z.number()),
  metalRate: z.number(),
  labourRate: z.number(),
  diamondRate: z.array(z.number()),
  diamondAmt: z.array(z.number()),
  metalAmt: z.number(),
  labourAmt: z.number(),
  totalAmt: z.number(),
});

const shapeSchema = z.object({
  shape: z.string(),
  images: z.array(z.string()),
  carats: z.array(caratSchema),
});

const variationSchema = z.object({
  metal: z.string().min(1, "Metal can't be empty"),
  color: z.string(),
  shapes: z.array(shapeSchema),
});

const productSchema = z.object({
  productCode: z.string().min(1, { message: "Product code can't be empty" }),
  slug: z.string().min(1, { message: "Slug can't be empty" }),
  title: z.string().min(1, { message: "Product title can't be empty" }),
  description: z.string().min(1, { message: "Description can't be empty" }),
  category: z.string().min(1, { message: "Product category can't be empty" }),
  tags: z.array(z.string()),
  variations: z.array(variationSchema),
  designType: z.string().min(1, { message: "Design type can't be empty" }),
  style: z.string().min(1, { message: "Style can't be empty" }),
  stone: z.string().min(1, { message: "Stone can't be empty" }),
  order: z.number(),
  publish: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

export default function NewProduct() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize form with default values
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productCode: "",
      slug: "",
      title: "",
      description: "",
      category: "",
      tags: [],
      designType: "",
      style: "",
      stone: "",
      order: 0,
      publish: true,
      variations: [
        {
          metal: "",
          color: "",
          shapes: [
            {
              shape: "",
              images: [],
              carats: [
                {
                  carat: 0,
                  size: [],
                  diamondCount: 0,
                  diamondDimension: "",
                  labourCategory: "",
                  gWt: 0,
                  nWt: 0,
                  diamondCategory: [],
                  diamondWeight: [],
                  metalRate: 0,
                  labourRate: 0,
                  diamondRate: [],
                  diamondAmt: [],
                  metalAmt: 0,
                  labourAmt: 0,
                  totalAmt: 0,
                },
              ],
            },
          ],
        },
      ],
    },
  });

  // Setup field arrays for variations
  const {
    fields: variationFields,
    append: addVariation,
    remove: removeVariation,
  } = useFieldArray({
    control: form.control,
    name: "variations",
  });

  // Submit handler
  const onSubmit = async (data: ProductFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Submitting product data:", data);

      const token = useAuthStore.getState().token;

      // Send to backend API
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/product`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Product created successfully");
        form.reset();
        navigate("/dashboard/products");
      }

    } catch (err: any) {
      console.error("Error creating product:", err);

      let errorMessage = "Failed to create product";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-5">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <LucideArrowLeft />
        </Button>
        <h2 className="text-xl font-semibold capitalize lg:text-2xl">
          Create New Product
        </h2>
      </div>

      {/* Error Display */}
      {error && (
        <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          {/* Basic Information Card */}
          <Card className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput
                control={form.control}
                name="productCode"
                label="Product Code"

              />
              <FormInput
                control={form.control}
                name="title"
                label="Title"

              />

              <SlugInput control={form.control} form={form} />

              <CategoryDD control={form.control} />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter product description"
                      className="min-h-[100px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagInput
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Type a tag and press enter"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Details */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <DesignTypeDD control={form.control} />
              <StyleDD control={form.control} />
              <StoneDD control={form.control} />
              <Order control={form.control} />
              <PublishStatusSelect control={form.control} />
            </div>
          </Card>

          <Separator />

          {/* Variations Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Variations</h3>

            {variationFields.map((v, vIndex) => (
              <Card key={v.id} className="space-y-4 border p-4">
                {/* Metal and Color Selection */}
                <MetalDD vIndex={vIndex} />

                {/* Shapes for this variation */}
                <Shapes
                  vIndex={vIndex}
                  control={form.control}
                  setValue={form.setValue}
                />

                {/* Remove Variation Button */}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeVariation(vIndex)}
                >
                  Remove Variation
                </Button>
              </Card>
            ))}

            {/* Add Variation Button */}
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                addVariation({
                  metal: "",
                  color: "",
                  shapes: [
                    {
                      shape: "",
                      images: [],
                      carats: [
                        {
                          carat: 0,
                          size: [],
                          diamondCount: 0,
                          diamondDimension: "",
                          labourCategory: "",
                          gWt: 0,
                          nWt: 0,
                          diamondCategory: [],
                          diamondWeight: [],
                          metalRate: 0,
                          labourRate: 0,
                          diamondRate: [],
                          diamondAmt: [],
                          metalAmt: 0,
                          labourAmt: 0,
                          totalAmt: 0,
                        },
                      ],
                    },
                  ],
                })
              }
            >
              <LucidePlus className="mr-1 h-4 w-4" />
              Add Variation
            </Button>
          </div>

          <Separator />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              className="min-w-[150px]"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}