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
