'use client';

import * as z from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import Link from 'next/link';
import { LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import TextFormField from '@/components/text-form-field';

import { login } from '@/app/api/auth/login/actions';

// Source -> https://github.com/colinhacks/zod/discussions/3412#discussioncomment-9916377
const passwordSchema = z
  .string()
  .min(8, { message: 'Password should at least be 8 characters long' })
  .max(14, { message: 'Password cannot be more than 14 characters' });

export const FormSchema = z.object({
  email: z.email('Please enter a valid email address'),
  password: passwordSchema,
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    formState: { errors, isSubmitting },
    setError,
  } = form;

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const loginData = await login(data);

    if (loginData === undefined) return;

    const {
      errors: {
        email: { message, type, prismaErrorMessage },
      },
    } = loginData;

    console.log('prismaErrorMessage: ', prismaErrorMessage);

    setError('email', {
      type: type,
      message: message,
    });
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 xs:w-full xs:max-w-120 items-center justify-center mx-3 xs:mx-auto sm:my-20 group rounded-lg sm:border border-solid border-gray-500 bg-transparent px-4 xs:px-8 py-6 xs:py-12 absolute inset-0 m-0 border-0 sm:static"
      >
        <h1 className="mr-auto text-4xl xs:text-5xl font-semibold">
          Welcome back
        </h1>
        <p className="text-white/80 mr-auto -mt-5 text-base xs:text-xl">
          Please enter your login details
        </p>

        <div className="flex flex-col gap-6 md:gap-8 w-full mb-5">
          <TextFormField
            form={form}
            fieldId="email"
            fieldName="email"
            label="Email Address"
            placeholder="johndoe@gmail.com"
            autoComplete="email"
            fieldClassName="h-10"
            fieldHasErrors={errors.email}
          />

          <TextFormField
            form={form}
            fieldId="password"
            fieldName="password"
            label="Password"
            placeholder=""
            fieldClassName="h-10"
            autoComplete="current-password webauthn"
            fieldHasErrors={errors.password}
          />
        </div>

        <Button
          type="submit"
          className="inline-flex px-8 py-5 items-center text-base justify-center rounded bg-white font-medium leading-none text-black outline-none outline-offset-1 hover:bg-white/90 focus-visible:outline-2 cursor-pointer w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-5">
              Sign in{' '}
              <LoaderCircle size={16} className="text-black btn-spinner" />
            </span>
          ) : (
            <span>Sign in</span>
          )}
        </Button>

        <p className="-mt-4">
          Don't have an account?{' '}
          <Link
            href="/register"
            className="text-blue-400 underline hover:no-underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </FormProvider>
  );
};

export default LoginPage;
