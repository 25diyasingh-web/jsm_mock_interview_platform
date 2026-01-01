"use server";

export async function signInAction(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const res = await fetch("http://localhost:5000/api/auth/signin", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Sign in failed");
  }

  return data;
}

"use server";

import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return null;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/me", {
      method: "GET",
      headers: {
        Cookie: `token=${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.user;
  } catch {
    return null;
  }
}

export const isAuthenticated = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  return !!token;
};

