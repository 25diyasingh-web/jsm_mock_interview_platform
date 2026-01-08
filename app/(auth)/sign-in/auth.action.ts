"use server";

import { cookies } from "next/headers";
/* =======================
   SIGN IN
======================= */
export async function signInAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/auth/signin`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Sign in failed");
  }

  return data;
}

/* =======================
   CURRENT USER
======================= */
export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/api/auth/me`,
    {
      headers: {
        Cookie: `token=${token}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.user;
}


/* =======================
   AUTH CHECK
======================= */
export const isAuthenticated = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return Boolean(token?.value);
};