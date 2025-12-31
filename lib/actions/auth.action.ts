'use server';

import { cookies } from 'next/headers';

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

/* =======================
   TYPES (JWT AUTH)
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
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || 'Failed to create account',
      };
    }

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
    const res = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: data?.message || 'Failed to sign in',
      };
    }

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

  // must match backend cookie name exactly
  cookieStore.delete('token');
}
