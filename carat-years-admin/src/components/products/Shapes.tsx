import { useFieldArray } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormField,
} from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { LucidePlus, Trash2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { postUpload } from "@/api/file";
import { toast } from "sonner";
import Carats from "./Carats";

export default function Shapes({ vIndex, control, setValue }: any) {
  const {
    fields: shapeFields,
    append: addShape,
    remove: removeShape,
  } = useFieldArray({
    control,
    name: `variations.${vIndex}.shapes`,
  });

  const getImageUrl = (value?: unknown) => {
  if (!value || typeof value !== "string") return "";

  // absolute URL (Cloudinary etc.)
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  if (!baseUrl) return value;

  const cleanBase = baseUrl.replace(/\/$/, "");
  const cleanPath = value.startsWith("/") ? value : `/${value}`;

  return `${cleanBase}${cleanPath}`;
};


  return (
    <div className="space-y-3">
      {shapeFields.map((s, sIndex) => (
        <Card key={s.id} className="space-y-3 border p-3">
          {/* Shape Dropdown */}
          <FormField
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.shape`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Shape</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full border">
                      <SelectValue placeholder="Select shape" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Round",
                        "Oval",
                        "Princess",
                        "Cushion",
                        "Emerald",
                        "Marquise",
                        "Pear",
                        "Heart",
                        "MARQUISE",
                        "RADIANT MARQUISE PEAR ROUND EMERALD PRINCESS MARQUISE PEAR",
                        "PRINCESS"
                      ].map((shape) => (
                        <SelectItem key={shape} value={shape}>
                          {shape}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`variations.${vIndex}.shapes.${sIndex}.images`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <div className="flex flex-col gap-2">
                    {/* Preview Images */}
                    <div className="mb-2 flex flex-wrap gap-2">
                      {field.value?.map((img: string, idx: number) => (
                        <div key={idx} className="relative">
                          <img
                            src={getImageUrl(img)}
                            alt={`shape-${idx}`}
                            className="h-32 w-32 rounded object-cover"
                          />
                          <button
                            type="button"
                            className="bg-destructive absolute right-2 bottom-2 cursor-pointer rounded-sm p-1"
                            onClick={() => {
                              const newImages = field.value.filter(
                                (_: any, i: number) => i !== idx,
                              );
                              field.onChange(newImages);
                            }}
                          >
                            <Trash2 />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* File Input */}
                    <Input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={async (e) => {
                        const files = e.target.files;
                        if (!files) return;

                        const uploadedPaths: string[] = [];

                        for (let i = 0; i < files.length; i++) {
                          const file = files[i];
                          try {
                            const res = await postUpload({
                              file,
                              folder: "/uploads/product",
                            });
                            if (res?.filePath) uploadedPaths.push(res.filePath);
                          } catch (error) {
                            toast.error("Image upload failed");
                          }
                        }

                        // Append new uploaded images to existing ones
                        field.onChange([
                          ...(field.value || []),
                          ...uploadedPaths,
                        ]);
                      }}
                    />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          <Carats
            vIndex={vIndex}
            sIndex={sIndex}
            control={control}
            setValue={setValue}
          />

          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={() => removeShape(sIndex)}
          >
            Remove Shape
          </Button>
        </Card>
      ))}

      <Button
        type="button"
        size="sm"
        variant="secondary"
        onClick={() =>
          addShape({
            shape: "",
            images: [],
            carats: [
              {
                carat: 0,
                sizes: [{ size: "", goldWeight: 0, makingCharge: 0 }],
              },
            ],
          })
        }
      >
        <LucidePlus className="mr-1 h-4 w-4" /> Add Shape
      </Button>
    </div>
  );
}
