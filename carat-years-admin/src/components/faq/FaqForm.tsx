import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TFaq } from "@/types/api";
import { useEffect } from "react";
import { usePostFaq, useUpdateFaq } from "@/hooks/useFaq";
import PublishStatusSelect from "../shared/PublishStatusSelect";
import SaveCancel from "../shared/SaveCancel";
import Order from "../shared/Order";

type FaqFormProps = {
  isOpen: boolean;
  onClose: () => void;
  faq?: TFaq | null;
  length: number;
};

const formSchema = z.object({
  question: z.string().min(1, "Question is required"),
  answer: z.string().min(1, "Answer is required"),
  order: z.number(),
  publish: z.boolean(),
});

type FaqFormValues = z.infer<typeof formSchema>;

const defaultValues = {
  question: "",
  answer: "",
  order: 1,
  publish: true,
};

export default function FaqForm({
  isOpen,
  onClose,
  faq,
  length,
}: FaqFormProps) {
  const form = useForm<FaqFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });
  const { mutate: post } = usePostFaq();
  const { mutate: update } = useUpdateFaq();

  useEffect(() => {
    if (faq) {
      form.reset(faq);
    } else {
      form.reset({ ...defaultValues, order: length || 1 });
    }
  }, [faq]);

  const onSubmit = (values: FaqFormValues) => {
    if (faq && faq._id) {
      update(
        { id: faq._id, formData: values },
        {
          onSuccess: () => {
            onClose();
            form.reset();
          },
        },
      );
    } else {
      post(values, {
        onSuccess: () => {
          onClose();
          form.reset();
        },
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Faq</DialogTitle>
          <DialogDescription>
            Make changes to your faq. Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Question" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="answer"
                      className="resize-none"
                      {...field}
                      maxLength={550}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Order control={form.control} />

            <PublishStatusSelect control={form.control} />

            <SaveCancel />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
