import { Product } from "../models/Product";
import { Rate } from "../models/Rate";

export const recalculateAllProductPrices = async () => {
  const rate = await Rate.findOne();
  if (!rate) throw new Error("Rate data not found");

  const allProducts = await Product.find({ publish: true });

  //  Define mapping between product metals and rate metals
  const metalMapping: Record<string, keyof typeof rate.metal> = {
    "9k": "9k",
    "14k": "14k",
    "18k": "18k",
    "s/l": "silver",
    silver: "silver",
    platinum: "platinum",
  };

  for (const product of allProducts) {
    let updated = false;

    for (const variation of product.variations) {
      const rawMetal = variation.metal?.toLowerCase().trim();
      const mappedMetal = metalMapping[rawMetal] || null;

      for (const shape of variation.shapes) {
        for (const carat of shape.carats) {
          // 🔹 Determine metal rate (only if mapping found)
          const metalRate = mappedMetal ? rate.metal[mappedMetal] || 0 : 0;

          // 🔹 Determine labour rate
          let labourRate = 0;
          const labourCat = carat.labourCategory?.toLowerCase();
          if (labourCat === "l1") labourRate = rate.labour.l1;
          else if (labourCat === "l2") labourRate = rate.labour.l2;
          else if (labourCat === "l3") labourRate = rate.labour.l3;

          // 🔹 Recalculate diamond rates
          const diamondRates = carat.diamondCategory.map((cat) => {
            const key = cat.toLowerCase() as keyof typeof rate.diamond;
            return rate.diamond[key] || 0;
          });

          const diamondAmt = diamondRates.map(
            (r, i) => r * (carat.diamondWeight[i] || 0)
          );

          // 🔹 Compute recalculated totals
          const metalAmt = metalRate * carat.nWt;
          const labourAmt = labourRate * carat.nWt;
          const diamondAmtTotal = diamondAmt.reduce((a, b) => a + b, 0);
          const totalAmt = metalAmt + labourAmt + diamondAmtTotal;

          // 🔹 Update values
          carat.metalRate = metalRate;
          carat.labourRate = labourRate;
          carat.diamondRate = diamondRates;
          carat.diamondAmt = diamondAmt;
          carat.metalAmt = metalAmt;
          carat.labourAmt = labourAmt;
          carat.totalAmt = totalAmt;

          updated = true;
        }
      }
    }

    if (updated) {
      await product.save();
    }
  }

  console.log(" All products recalculated successfully");
};
