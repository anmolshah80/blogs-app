'use client';

import * as z from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import TextFormField from '@/components/text-form-field';
import TextAreaFormField from '@/components/textarea-form-field';

import usePostMutation from '@/hooks/use-post-mutation';

const FormSchema = z.object({
  blogTitle: z
    .string({
      error: 'Title cannot be empty',
    })
    .trim()
    .min(5, {
      error: 'Title should at least be 5 characters long',
    })
    .max(70, {
      error: 'Title cannot be more than 70 characters',
    }),
  blogDescription: z
    .string({
      error: 'Description cannot be empty',
    })
    .trim()
    .min(70, {
      error: 'Description should at least be 70 characters long',
    })
    .max(500, {
      error: 'Description cannot be more than 500 characters',
    }),
  blogCategory: z
    .string({
      error: 'Category cannot be empty',
    })
    .trim()
    .min(3, {
      error: 'Category should at least be 3 characters long',
    }),
});

const CreateForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      blogTitle: '',
      blogDescription: '',
      blogCategory: '',
    },
  });

  const hasAlreadyRenderedToast = useRef(false);

  const mutation = usePostMutation('create_blog_post', 'POST');

  const { data, error, isPending, isSuccess, isError, mutate } = mutation;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // console.log('Form errors:', form.formState.errors);
    console.log('onSubmit form data: ', data);

    mutate({
      title: data.blogTitle,
      body: data.blogDescription,
      category: data.blogCategory,
      userId: 1,
    });

    if (isSuccess && !isError) {
      toast.success('Your blog has been created!', {
        closeButton: true,
        duration: 5000,
      });
    }
  };

  console.log('responseData (after POST): ', data);
  console.log('error (after POST): ', error);
  console.log(
    'isPending (after POST): ',
    isPending,
    'isSuccess: ',
    isSuccess,
    'isError: ',
    isError,
  );

  const {
    formState: { errors, isSubmitting },
  } = form;

  if (isError && !hasAlreadyRenderedToast.current) {
    hasAlreadyRenderedToast.current = true;

    toast.error('An error occurred while creating the blog post', {
      description: error.message,
      closeButton: true,
      duration: 8000,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-full max-w-140 items-center justify-center mx-auto mt-12"
      >
        <div className="flex flex-col gap-6 md:gap-8 w-full">
          <TextFormField
            form={form}
            fieldId="blog-title"
            fieldName="blogTitle"
            label="Title"
            placeholder="Blog title"
            autoComplete="name"
            fieldHasErrors={errors.blogTitle}
          />

          <TextAreaFormField
            form={form}
            fieldId="blog-description"
            fieldName="blogDescription"
            label="Description"
            placeholder="Type your blog details here"
            fieldClassName="min-h-[12rem]"
            fieldHasErrors={errors.blogDescription}
          />

          <TextFormField
            form={form}
            fieldId="blog-category"
            fieldName="blogCategory"
            label="Category"
            placeholder="React"
            fieldHasErrors={errors.blogCategory}
            fieldDescription={
              <span className="flex items-center text-xs text-mauve11">
                Add comma-separated values such as React, Next.js, Tailwind CSS,
                etc.
              </span>
            }
          />
        </div>

        <Button
          type="submit"
          className="inline-flex px-8 py-5 items-center text-base justify-center rounded bg-black font-medium leading-none text-white outline-none outline-offset-1 hover:bg-(--ds-gray-100) focus-visible:outline-2 border-2 border-gray-700 cursor-pointer"
          disabled={isSubmitting || isPending}
          onClick={() => {
            hasAlreadyRenderedToast.current = false;
          }}
        >
          {isSubmitting || isPending ? (
            <span className="flex items-center justify-center gap-5">
              Submit{' '}
              <LoaderCircle size={16} className="text-white btn-spinner" />
            </span>
          ) : (
            <span>Submit</span>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateForm;
