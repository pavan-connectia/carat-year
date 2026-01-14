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

type ImageUploadProps = {
  control: any;
  folder: string;
};

export default function ImageUpload({
  control,
  folder = "uploads",
}: ImageUploadProps) {

  const getImageUrl = (value: unknown) => {
    if (!value || typeof value !== "string") return "";

    if (/^https?:\/\//i.test(value)) {
      return value;
    }

    const baseUrl = import.meta.env.VITE_API_BASE_URL;

    if (!baseUrl) {
      console.error("VITE_API_BASE_URL is not defined");
      return value;
    }

    const cleanBase = baseUrl.replace(/\/$/, "");
    const cleanPath = value.startsWith("/") ? value : `/${value}`;

    return `${cleanBase}${cleanPath}`;
  };


  return (
    <FormField
      control={control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Image</FormLabel>
          <FormControl>
            <div>
              {field.value && (
                <img
                  src={getImageUrl(field.value)}
                  alt="Uploaded"
                  className="mb-2 h-32 w-32 rounded object-cover"
                />
              )}

              <Input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  try {
                    const res = await postUpload({
                      file,
                      folder: folder,
                    });

                    if (res?.filePath) {
                      field.onChange(res.filePath);
                    }
                  } catch (error) {
                    toast.error("Image upload failed");
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
