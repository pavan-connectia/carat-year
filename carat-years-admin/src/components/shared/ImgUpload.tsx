"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { postUpload } from "@/api/file";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Control } from "react-hook-form";

type ImageUploadProps = {
  control: Control<any>;
  name: string;
  label: string;
  folder?: string;
};

export default function ImgUpload({
  control,
  name,
  label,
  folder = "uploads",
}: ImageUploadProps) {

  const getImageUrl = (value: string) => {
    if (!value) return "";
    if (/^https?:\/\//i.test(value)) return value;

    const baseUrl = import.meta.env.VITE_API_BASE_URL || "";
    const cleanBase = baseUrl.replace(/\/$/, "");
    const cleanPath = value.startsWith("/") ? value : `/${value}`;

    return `${cleanBase}${cleanPath}`;
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="space-y-3">
              {field.value && (
                <div className="relative w-40 h-40 border rounded-lg overflow-hidden bg-muted">
                  <img
                    src={getImageUrl(field.value)}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <Input
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const loadingToast = toast.loading("Uploading image...");
                  try {
                    const res = await postUpload({ file, folder });

                    if (res?.filePath) {
                      field.onChange(res.filePath); // Updates hook-form state
                      toast.success("Uploaded successfully", { id: loadingToast });
                    }
                  } catch (error) {
                    toast.error("Upload failed", { id: loadingToast });
                  }
                }}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}