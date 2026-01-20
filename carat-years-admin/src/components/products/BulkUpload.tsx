import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useBulkPostProduct } from "@/hooks/useProduct";
import { toast } from "sonner";
import Papa from "papaparse";

type BulkUploadProps = {
  onClose: () => void;
};

const SHAPE_LIST = [
  "Round", "Princess", "Heart", "Oval", "Emerald",
  "Radiant", "Marquise", "Pear", "Cushion"
];

export default function BulkUpload({ onClose }: BulkUploadProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { mutate: bulkUpload, isPending } = useBulkPostProduct();

  const stringToArray = (text: string) => {
    if (!text || text.trim() === "") return [];
    return text.split(',').map(item => item.trim());
  };

  const safeParse = (str: string) => {
    try {
      const cleaned = str.replace(/'/g, '"');
      return JSON.parse(cleaned);
    } catch (e) {
      return [];
    }
  };

  const mapCaratData = (row: any, overrideDiamondCategory?: string[]) => {
    return {
      carat: parseFloat(row.carat) || 0,
      size: safeParse(row.size),
      diamondCount: parseInt(row.diamondCount) || 0,
      diamondDimension: row.diamondDimension || "",
      labourCategory: row.labourCategory || "",
      gWt: parseFloat(row.gWt) || 0,
      nWt: parseFloat(row.nWt) || 0,
      diamondCategory: overrideDiamondCategory || safeParse(row.diamondCategory),
      diamondWeight: safeParse(row.diamondWeight),
      metalRate: parseFloat(row.metalRate) || 0,
      labourRate: parseFloat(row.labourRate) || 0,
      diamondRate: safeParse(row.diamondRate),
      diamondAmt: safeParse(row.diamondAmt),
      metalAmt: parseFloat(row.metalAmt) || 0,
      labourAmt: parseFloat(row.labourAmt) || 0,
      totalAmt: parseFloat(row.totalAmt) || 0,
    };
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as any[];
        const productsMap: any = {};

        rows.forEach((row) => {
          if (!row.productCode) return;

          const pCode = row.productCode;

          if (!productsMap[pCode]) {
            productsMap[pCode] = {
              productCode: pCode,
              slug: row.slug || pCode,
              title: row.title,
              description: row.description,
              video: row.video,
              category: row.category,
              tags: stringToArray(row.tags),
              designType: row.designType,
              style: stringToArray(row.style),
              occsasion: stringToArray(row.occsasion),
              stone: row.stone,
              gender: row.gender || "Women",
              reviews:{
                averageRating: parseFloat(row.averageRating) || 4,
                numberOfReviews: parseInt(row.numberOfReviews) || 168,
              },
              publish: row.publish?.toUpperCase() === "TRUE",
              order: parseInt(row.order) || 0,
              variations: {},
            };
          }

          const vKey = `${row.metal}-${row.color}`;
          if (!productsMap[pCode].variations[vKey]) {
            productsMap[pCode].variations[vKey] = {
              metal: row.metal,
              color: row.color,
              shapes: [],
            };
          }

          const variation = productsMap[pCode].variations[vKey];
          const shouldExpand = row.autoExpand?.toUpperCase() === "TRUE";
          const csvCategory = safeParse(row.diamondCategory);

          if (shouldExpand) {
            SHAPE_LIST.forEach((shapeName, index) => {
              let finalCategory = [];

              if (csvCategory.includes("D1")) {
                finalCategory = ["D1", `D${index + 2}`];
              }
              else {
                finalCategory = [`D${index + 2}`];
              }

              variation.shapes.push({
                shape: shapeName,
                images: safeParse(row.images),
                carats: [mapCaratData(row, finalCategory)] 
              });
            });
          } else {

            variation.shapes.push({
              shape: row.shape,
              images: safeParse(row.images),
              carats: [mapCaratData(row)] 
            });
          }
        });

        const finalProducts = Object.values(productsMap).map((p: any) => ({
          ...p,
          variations: Object.values(p.variations),
        }));

        processBulkUpload(finalProducts);
      },
      error: (error: any) => {
        toast.error("Error parsing CSV: " + error.message);
        setIsProcessing(false);
      }
    });
  };

  const processBulkUpload = (data: any[]) => {
    if (data.length === 0) {
      toast.error("No valid products found in file");
      setIsProcessing(false);
      return;
    }

    bulkUpload(data, {
      onSuccess: () => {
        toast.success(`${data.length} products uploaded successfully`);
        onClose();
      },
      onError: (err: any) => {
        console.error("Upload Error:", err);
        setIsProcessing(false);
      }
    });
  };

  return (
    <div className="space-y-4 w-full">
      <div className="space-y-2">
        <label className="text-sm font-medium">Upload Product CSV</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={isPending || isProcessing}
          className="block w-full text-sm border p-2 rounded-md"
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={isPending || isProcessing} className="relative">
          {isPending || isProcessing ? "Uploading..." : "Select CSV File"}
        </Button>
      </div>
    </div>
  );
}