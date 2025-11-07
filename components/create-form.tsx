'use client';

import * as z from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import TextFormField from '@/components/text-form-field';

const FormSchema = z.object({
  title: z
    .string({
      error: 'Blog title cannot be empty',
    })
    .trim()
    .min(2, {
      error: 'Please enter the blog title',
    }),
  description: z
    .string({
      error: 'Blog description cannot be empty',
    })
    .trim()
    .min(2, {
      error: 'Please enter the blog description',
    }),
});

const CreateForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: undefined,
      description: undefined,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // console.log('Form errors:', form.formState.errors);
    console.log('onSubmit form data: ', data);
    window.alert(JSON.stringify(data, undefined, 2));
  };

  const {
    formState: { errors, isSubmitting },
  } = form;

  console.log('errors: ', errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-6 md:gap-8">
          <div className="flex flex-col sm:flex-row gap-6">
            <TextFormField
              form={form}
              fieldId="first-name"
              fieldName="firstName"
              label="First name"
              placeholder="John"
              autoComplete="name"
            />

            <TextFormField
              form={form}
              fieldId="last-name"
              fieldName="lastName"
              label="Last name"
              placeholder="Doe"
              autoComplete="family-name"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <TextFormField
              form={form}
              fieldId="email-address"
              fieldName="email"
              label="Email address"
              placeholder="johndoe@gmail.com"
              autoComplete="email"
            />

            <TextFormField
              form={form}
              fieldId="phone-number"
              fieldName="phone"
              label="Phone number (opt.)"
              placeholder="e.g., +977 123-456-7890"
              autoComplete="mobile tel"
              maxLength={17}
              // fieldHasErrors={errors.phone}
              fieldDescription={
                <span className="flex items-center text-xs text-mauve11">
                  Include your country code for international numbers
                </span>
              }
            />
          </div>
        </div>

        <Button
          type="submit"
          className="inline-flex w-[100px] h-[35px] items-center text-base justify-center rounded bg-black px-[15px] font-medium leading-none text-white outline-none outline-offset-1 hover:bg-black/80 focus-visible:outline-2 select-none"
          disabled={isSubmitting}
        >
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default CreateForm;
