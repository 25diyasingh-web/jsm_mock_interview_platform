"use server";

import { cookies } from "next/headers";

/* =======================
   SIGN IN
======================= */
export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      cache: "no-store",
    }
  );

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!res.ok) {
    throw new Error(data?.message || "Sign in failed");
  }

  return data;
}

/* =======================
   CURRENT USER
======================= */
export async function getCurrentUser() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/me`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.user ?? null;
}

/* =======================
   AUTH CHECK
======================= */
export async function isAuthenticated() {
  return Boolean((await cookies()).get("token")?.value);
}
