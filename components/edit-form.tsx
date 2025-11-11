'use client';

import * as z from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';

import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import TextFormField from '@/components/text-form-field';
import TextAreaFormField from '@/components/textarea-form-field';

import { updatePost } from '@/app/actions/actions';

import { TPost } from '@/lib/types';

interface EditFormProps {
  postId: string;
  postData: TPost | undefined;
  error: string | undefined;
}

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

const EditForm = ({
  postId,
  postData,
  error: fetchPostError,
}: EditFormProps) => {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      blogTitle: '',
      blogDescription: '',
      blogCategory: '',
    },
    values: {
      blogTitle: postData ? postData.title : '',
      blogDescription: postData ? postData.description : '',
      blogCategory: postData ? postData.category : '',
    },
  });

  const router = useRouter();

  const {
    formState: { errors, isSubmitting },
    reset,
  } = form;

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsPending(true);

    const updatedPost = updatePost(postId, {
      title: data.blogTitle,
      description: data.blogDescription,
      category: data.blogCategory,
    });

    updatedPost.then((value) => {
      // only one of the destructured properties will be accessible
      // based on whether it is able to update a post or not
      const { updatedPostData, error } = value;

      // if the post is updated render a success toast
      if (updatedPostData !== undefined) {
        toast.success(`Your blog with ID ${postId} has been updated!`, {
          closeButton: true,
          duration: 5000,
        });

        // clear form field values and navigate to blogs page
        reset();
        router.push('/blogs');
      }

      // if there is issue while updating the post then render an error toast
      if (error !== undefined) {
        toast.error(
          `An error occurred while updating the blog post with ID ${postId}`,
          {
            description: error,
            closeButton: true,
            duration: 10000,
          },
        );
      }

      setIsPending(false);
    });
  };

  if (fetchPostError || postData === undefined) {
    return (
      <div className="py-16 flex flex-col items-center justify-center mx-auto min-h-[70dvh]">
        <h2 className="mb-2 text-2xl font-medium">Blog post unavailable</h2>
        <p className="italic text-muted-foreground">
          We couldn't find the blog post you're looking for. Please try again
          later.
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 w-full max-w-140 items-center justify-center mx-auto mt-12"
      >
        <h1 className="mr-auto text-4xl text-white/80">Edit Post</h1>

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
              <span className="flex items-center text-xs">
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

export default EditForm;
