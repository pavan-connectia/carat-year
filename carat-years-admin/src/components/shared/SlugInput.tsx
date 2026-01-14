import slugify from "slugify";
import { Button } from "../ui/button";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

type SlugInputProps = {
  control: any;
  form: any;
};

export default function SlugInput({ control, form }: SlugInputProps) {
  return (
    <FormField
      control={control}
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
                    slugify(title || "", {
                      lower: true,
                      strict: true,
                    }),
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
  );
}
