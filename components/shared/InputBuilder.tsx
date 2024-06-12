import { FormField, FormItem, FormControl, FormMessage, FormLabel, } from "../ui/form";
import React from "react";
import { Control } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./TransformationForm";

type InputBuilderProps = {
  control: Control<z.infer<typeof formSchema>> | undefined;
  render: (props: { field: any }) => React.ReactNode;
  name: keyof z.infer<typeof formSchema>;
  formLabel?: string;
  className?: string;
};

export const InputBuilder = ({
  control,
  render,
  name,
  formLabel,
  className,
}: InputBuilderProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {formLabel && <FormLabel className="text-white">{formLabel}</FormLabel>}
          <FormControl>{render({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};