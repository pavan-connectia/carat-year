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
import { useProduct, useUpdateProduct } from "@/hooks/useProduct";
import Shapes from "@/components/products/Shapes";
import CategoryDD from "@/components/products/CategoryDD";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import Order from "@/components/shared/Order";
import PublishStatusSelect from "@/components/shared/PublishStatusSelect";
import DesignTypeDD from "@/components/products/DesignTypeDD";
import StyleDD from "@/components/products/StyleDD";
import StoneDD from "@/components/products/StoneDD";
import FormInput from "@/components/shared/FormInput";
import SlugInput from "@/components/shared/SlugInput";
import { TagInput } from "@/components/ui/TagInput";
import MetalDD from "@/components/products/MetalDD";
import OccsasionDD from "@/components/products/occsasionDD";

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
  diamondAmt: z.array(z.number()), //diamond rate * diamond weight
  metalAmt: z.number(), //metal rate * n.wt
  labourAmt: z.number(), //labour amt * n.wt
  totalAmt: z.number(), //diamont amt + metal amt + labour amt
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
  style: z.array(z.string()),
  occsasion: z.array(z.string()),
  stone: z.string().min(1, { message: "Stone can't be empty" }),
  order: z.number(),
  publish: z.boolean(),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function DetailProduct() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productCode: "",
      slug: "",
      title: "",
      description: "",
      category: "",
      tags: [],
      designType: "",
      style: [],
      occsasion: [],
      stone: "",
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
                  diamondAmt: [], //diamond rate * diamond weight
                  metalAmt: 0, //metal rate * n.wt
                  labourAmt: 0, //labour amt * n.wt
                  totalAmt: 0, //diamont amt + metal amt + labour amt
                },
              ],
            },
          ],
        },
      ],
    },
  });
  const navigate = useNavigate();

  const {
    fields: variationFields,
    append: addVariation,
    remove: removeVariation,
  } = useFieldArray({ control: form.control, name: "variations" });

  const { id } = useParams();
  const { data } = useProduct(id ?? "");
  const { mutate } = useUpdateProduct();

useEffect(() => {
  if (!data?.data) return;

  const product = data.data;

  form.reset({
    productCode: product.productCode || "",
    slug: product.slug || "",
    title: product.title || "",
    description: product.description || "",
    category: product.category?._id || "", // Ensure this is just the ID string
    tags: product.tags || [],
    designType: product.designType || "", // Matches JSON "solitaire"
    style: product.style || [],           // Matches JSON array
    occsasion: product.occsasion || [],   // Matches JSON array (with typo)
    stone: product.stone || "",           // Matches JSON "CVD Diamond"
    order: product.order || 0,
    publish: product.publish ?? true,
    variations: product.variations || [],
  });
}, [data, form]); // Added form to dependencies


  const onSubmit = (values: any) => {
    mutate({ formData: values, id: data?.data?._id });
  };

    if (!data?.data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading Product Data...</p>
      </div>
    );
  }

  console.log(data?.data);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-5">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <LucideArrowLeft />
        </Button>

        <h2 className="text-xl font-semibold capitalize lg:text-2xl">
          {data?.data?.title}
        </h2>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
          className="space-y-6"
        >
          <Card className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormInput
                control={form.control}
                name="productCode"
                label="Product Code"
              />
              <FormInput control={form.control} name="title" label="Title" />

              <SlugInput control={form.control} form={form} />

              <CategoryDD control={form.control} />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

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

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <DesignTypeDD control={form.control} />
              <StyleDD control={form.control} />
              <OccsasionDD control={form.control} />
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
                <MetalDD  vIndex={vIndex} />

                <Shapes
                  vIndex={vIndex}
                  control={form.control}
                  setValue={form.setValue}
                />

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
                          diamondAmt: [], //diamond rate * diamond weight
                          metalAmt: 0, //metal rate * n.wt
                          labourAmt: 0, //labour amt * n.wt
                          totalAmt: 0, //diamont amt + metal amt + labour amt
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

          <Button type="submit" className="w-full">
            Save Product
          </Button>
        </form>
      </Form>
    </div>
  );
}