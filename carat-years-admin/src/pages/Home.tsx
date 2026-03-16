"use client";

import{ useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useHome, useUpdateHome } from "@/hooks/useHome";
import { THome } from "@/types/api";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, Save } from "lucide-react";
import ImgUpload from "@/components/shared/ImgUpload";

const homeSchema = z.object({
  hero: z.object({
    image: z.string().min(1, "Hero image is required"),
    title: z.string().min(1, "Title is required"),
    headLine: z.string().min(1, "Headline is required"),
    description: z.string().min(1, "Description is required"),
    button1: z.string().min(1, "Link is required"),
    button2: z.string().min(1, "Link is required"),
  }),
  custom: z.object({
    image: z.string().min(1, "Custom image is required"),
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    button: z.string().min(1, "Link is required"),
  }),
});

type HomeFormValues = z.infer<typeof homeSchema>;

export default function Home() {
  const { data: homeResponse, isLoading } = useHome();
  const { mutate: updateHome, isPending: isUpdating } = useUpdateHome();

  const form = useForm<HomeFormValues>({
    resolver: zodResolver(homeSchema),
    defaultValues: {
      hero: { image: "", title: "", headLine: "", description: "", button1: "", button2: "" },
      custom: { image: "", title: "", description: "", button: "" },
    },
  });

  // Load data from backend into form
  useEffect(() => {
    if (homeResponse?.data) {
      // We map the data to match the schema structure
      form.reset({
        hero: homeResponse.data.hero,
        custom: homeResponse.data.custom,
      });
    }
  }, [homeResponse, form]);

  const onSubmit = (values: HomeFormValues) => {
    // values will now contain the correct image paths from the ImageUpload component
    updateHome({ formData: values as THome });
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 pb-20">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h1 className="text-3xl font-bold">Home Configuration</h1>
        <button
          onClick={form.handleSubmit(onSubmit)}
          disabled={isUpdating}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg transition-opacity hover:opacity-90"
        >
          {isUpdating ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
          Save Changes
        </button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          
          {/* HERO SECTION */}
          <section className="bg-card p-6 rounded-xl border space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2 text-primary">Hero Section</h2>
            
            <ImgUpload
              control={form.control} 
              name="hero.image" 
              label="Hero Image"
              folder="uploads/home" 
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="hero.headLine" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Headline</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="hero.title" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="hero.description" render={({ field }) => (
                <FormItem className="md:col-span-2"><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="hero.button1" render={({ field }) => (
                <FormItem><FormLabel>Button 1 Link</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
              <FormField control={form.control} name="hero.button2" render={({ field }) => (
                <FormItem><FormLabel>Button 2 Link</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
              )} />
            </div>
          </section>

          {/* CUSTOM SECTION */}
          <section className="bg-card p-6 rounded-xl border space-y-6">
            <h2 className="text-xl font-semibold border-b pb-2 text-primary">Custom Section</h2>
            
            <ImgUpload
              control={form.control} 
              name="custom.image" 
              label="Custom Image"
              folder="uploads/home" 
            />

            <FormField control={form.control} name="custom.title" render={({ field }) => (
              <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )} />
            <FormField control={form.control} name="custom.description" render={({ field }) => (
              <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl></FormItem>
            )} />
            <FormField control={form.control} name="custom.button" render={({ field }) => (
              <FormItem><FormLabel>Button Link</FormLabel><FormControl><Input {...field} /></FormControl></FormItem>
            )} />
          </section>
        </form>
      </Form>
    </div>
  );
}