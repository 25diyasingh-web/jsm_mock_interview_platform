'use server';

import { cookies } from 'next/headers';

/* =======================
   TYPES
======================= */

export interface SignUpParams {
  name?: string;
  email: string;
  password: string;
}

export interface SignInParams {
  email: string;
  password: string;
}

/* =======================
   SIGN UP
======================= */

export async function signUp(params: SignUpParams) {
  try {
    const { name, email, password } = params;

    // TODO:
    // 1. Validate input
    // 2. Check if user exists
    // 3. Hash password
    // 4. Save user to DB
    // 5. Create JWT

    // fake token for now
    const token = 'dummy-token';

    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return {
      success: true,
      message: 'Account created successfully',
    };
  } catch (error) {
    console.error('Sign up error:', error);
    return {
      success: false,
      message: 'Something went wrong during signup',
    };
  }
}

/* =======================
   SIGN IN
======================= */

export async function signIn(params: SignInParams) {
  try {
    const { email, password } = params;

    // TODO:
    // 1. Find user by email
    // 2. Compare password hash
    // 3. Create JWT

    const token = 'dummy-token';

    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return {
      success: true,
      message: 'Signed in successfully',
    };
  } catch (error) {
    console.error('Sign in error:', error);
    return {
      success: false,
      message: 'Something went wrong during sign in',
    };
  }
}

/* =======================
   SIGN OUT
======================= */

export async function signOut() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}

/* =======================
   AUTH CHECK
======================= */

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get('token'));
}
