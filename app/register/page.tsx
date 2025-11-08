'use client';

import * as z from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import TextFormField from '@/components/text-form-field';

// Source -> https://github.com/colinhacks/zod/discussions/3412#discussioncomment-9916377
const passwordSchema = z
  .string()
  .min(8, { message: 'Password should at least be 8 characters long' })
  .max(14, { message: 'Password cannot be more than 14 characters' })
  .refine((password) => /[A-Z]/.test(password), {
    message: 'Password should have at least one uppercase character',
  })
  .refine((password) => /[a-z]/.test(password), {
    message: 'Password should have at least one lowercase character',
  })
  .refine((password) => /[0-9]/.test(password), {
    message: 'Password should have at least one number',
  })
  .refine((password) => /[!@#$%^&*]/.test(password), {
    message: 'Password should have at least one special character (!@#$%^&*)',
  });

export const FormSchema = z
  .object({
    email: z.email('Please enter a valid email address'),
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password and confirm password do not match',
    path: ['confirmPassword'],
  });

const RegisterPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const {
    formState: { errors, isSubmitting },
  } = form;

  const router = useRouter();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    console.log('onSubmit form data: ', data);

    // navigate to home page after login
    router.push('/');
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 xs:w-full xs:max-w-120 items-center justify-center mx-3 xs:mx-auto mt-12 sm:my-12 group rounded-lg border border-solid border-gray-500 bg-transparent px-3 xs:px-8 py-12"
      >
        <h1 className="mr-auto text-3xl xs:text-4xl font-semibold">
          Create an account
        </h1>
        <p className="text-white/80 mr-auto -mt-5 text-base">
          Sign up to continue
        </p>

        <div className="flex flex-col gap-6 md:gap-8 w-full">
          <TextFormField
            form={form}
            fieldId="email"
            fieldName="email"
            label="Email Address"
            placeholder="johndoe@gmail.com"
            autoComplete="email"
            fieldHasErrors={errors.email}
          />

          <TextFormField
            form={form}
            fieldId="password"
            fieldName="password"
            label="Password"
            placeholder=""
            autoComplete="new-password webauthn"
            fieldHasErrors={errors.password}
          />

          <TextFormField
            form={form}
            fieldId="confirm-password"
            fieldName="confirmPassword"
            label="Confirm Password"
            placeholder=""
            autoComplete="new-password webauthn"
            fieldHasErrors={errors.confirmPassword}
          />
        </div>

        <Button
          type="submit"
          className="inline-flex px-8 py-5 items-center text-base justify-center rounded bg-white font-medium leading-none text-black outline-none outline-offset-1 hover:bg-white/90 focus-visible:outline-2 cursor-pointer w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-5">
              Sign up{' '}
              <LoaderCircle size={16} className="text-white btn-spinner" />
            </span>
          ) : (
            <span>Sign up</span>
          )}
        </Button>

        <p className="-mt-4">
          Already have an account?{' '}
          <Link
            href="/login"
            className="text-blue-400 underline hover:no-underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default RegisterPage;
