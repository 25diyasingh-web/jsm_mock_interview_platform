'use server';

import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';

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
    await connectDB();

    const { name, email, password } = params;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return { success: true, message: 'Account created successfully' };
  } catch (error) {
    console.error('Sign up error:', error);
    return { success: false, message: 'Signup failed' };
  }
}

/* =======================
   SIGN IN
======================= */

export async function signIn(params: SignInParams) {
  try {
    await connectDB();

    const { email, password } = params;

    const user = await User.findOne({ email });
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { success: false, message: 'Invalid credentials' };
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    const cookieStore = await cookies();
    cookieStore.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    });

    return { success: true, message: 'Signed in successfully' };
  } catch (error) {
    console.error('Sign in error:', error);
    return { success: false, message: 'Signin failed' };
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

/* =======================
   GET CURRENT USER
======================= */

export async function getCurrentUser() {
  try {
    await connectDB();

    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { userId: string };

    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return null;

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    };
  } catch (error) {
    console.error('Get current user error:', error);
    return null;
  }
}
