'use server';

import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

import prisma from '@/lib/db';
import { Prisma } from '@/prisma/lib/generated/prisma';
import { createSession, deleteSession } from '@/lib/session';

type TLoginFormData = {
  email: string;
  password: string;
};

type TRegisterFormData = Pick<Prisma.UserCreateInput, 'email'> & {
  password: string;
};

export async function login(formData: TLoginFormData) {
  try {
    const { email, password } = formData;

    const existingUser = await prisma.user.findUniqueOrThrow({
      where: {
        email: email,
      },
    });

    if (!existingUser) {
      return {
        errors: {
          email: {
            message: 'Invalid email or password',
            type: 'invalid_email',
          },
        },
      };
    }

    // load hash from the users database and compare it with the input password
    const isPasswordMatching = await bcrypt.compare(
      password,
      existingUser.hashedPassword,
    );

    if (!isPasswordMatching) {
      return {
        errors: {
          email: {
            message: 'Invalid email or password',
            type: 'invalid_password',
          },
        },
      };
    }

    await createSession(existingUser.id);
  } catch (error) {
    return {
      errors: {
        email: {
          prismaErrorMessage:
            error instanceof Error ? error.message : '401 Unauthorized',
          message: 'Invalid email or password',
          type: 'invalid_email_address',
        },
      },
    };
  }

  // navigate to blogs page after login
  // moved this redirect function outside the try-catch block so that it doesn't get caught as an error
  redirect('/blogs');
}

export async function logout() {
  await deleteSession();

  redirect('/login');
}

export async function register(formData: TRegisterFormData) {
  try {
    // hash the password before storing it in the database
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    const createdUser = await prisma.user.create({
      data: {
        email: formData.email,
        hashedPassword: hashedPassword,
      },
    });

    // if (!createdUser) return notFound();

    if (!createdUser) {
      // return {
      //   createdUserData: undefined,
      //   error: '400 Bad Request',
      // };
      throw new Error('400 Bad Request');
    }

    return {
      createdUserData: createdUser,
      error: undefined,
    };
  } catch (error) {
    return {
      createdUserData: undefined,
      error: error instanceof Error ? error.message : '400, Bad Request',
    };
  }
}
