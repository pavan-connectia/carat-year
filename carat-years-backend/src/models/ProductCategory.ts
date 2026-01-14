import { Schema, Document, model, models } from "mongoose";
import slugify from "slugify";

export interface IProductCategory extends Document {
  image: string;
  title: string;
  slug: string;
  featured: boolean;
  order?: number;
  publish: boolean;
}

const productCategorySchema = new Schema<IProductCategory>(
  {
    image: String,
    title: {
      type: String,
      required: [true, "Title can't be empty"],
    },
    slug: {
      type: String,
      unique: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: { type: Number },
    publish: { type: Boolean, default: true },
  },
  { timestamps: true }
);

productCategorySchema.pre("save", async function (next) {
  const category = this as any;

  if (category.isModified("slug") || category.isNew) {
    let baseSlug =
      category.slug || slugify(category.title, { lower: true, strict: true });
    let slug = baseSlug;
    let count = 1;

    while (
      await models.ProductCategory.findOne({ slug, _id: { $ne: category._id } })
    ) {
      slug = `${baseSlug}-${count++}`;
    }

    category.slug = slug;
  }

  if (this.isNew) {
    const lastCategory = await models.ProductCategory.findOne()
      .sort("-order")
      .exec();
    this.order = lastCategory ? lastCategory.order + 1 : 1;
  }

  next();
});

export const ProductCategory = model<IProductCategory>(
  "ProductCategory",
  productCategorySchema
);
