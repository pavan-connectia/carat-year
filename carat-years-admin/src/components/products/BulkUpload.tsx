import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useBulkPostProduct } from "@/hooks/useProduct";
import { toast } from "sonner";

type BulkUploadProps = {
  onClose: () => void;
};

export default function BulkUpload({ onClose }: BulkUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState("");

  const { mutate: bulkUpload, isPending } = useBulkPostProduct();

  // 📌 Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!selectedFile.name.endsWith(".json")) {
      setError("Only .json files are allowed");
      return;
    }

    setError("");
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);

        if (!Array.isArray(parsed)) {
          throw new Error("JSON must be an array of products");
        }

        setProducts(parsed);
      } catch (err: any) {
        setError(err.message || "Invalid JSON file");
        setProducts([]);
      }
    };

    reader.readAsText(selectedFile);
  };

  // 📌 Submit bulk products
  const handleSubmit = () => {
    if (products.length === 0) {
      toast.error("No products to upload");
      return;
    }

    bulkUpload(products, {
      onSuccess: () => {
        setProducts([]);
        setFile(null);
        onClose();
      },
    });
  };

  return (
    <div className="space-y-4 w-full">
      {/* Upload input */}
      <div className="space-y-2">
        <input
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="block w-full text-sm"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isPending}>
          {isPending ? "Uploading..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}
