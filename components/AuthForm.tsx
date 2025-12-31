/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "@/components/FormField";
import { useRouter } from "next/navigation";
import { signUp } from "@/lib/actions/auth.action"; // ✅ ONLY signUp

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) =>
  z.object({
    name:
      type === "sign-up"
        ? z.string().min(3, "Name must be at least 3 characters")
        : z.string().optional(),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const isSignIn = type === "sign-in";
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {

/* =======================
   SIGN IN — CLIENT FETCH
======================= */
if (isSignIn) {
  const res = await fetch("http://localhost:5000/api/auth/signin", {
    method: "POST",
    credentials: "include", // REQUIRED
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: values.email,
      password: values.password,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    toast.error(data.message || "Sign in failed");
    return;
  }

  toast.success("Signed in successfully");
  router.push("/");
  return;
}


      /* =======================
         SIGN UP — SERVER ACTION
      ======================= */
      const res = await signUp({
        name: values.name!,
        email: values.email,
        password: values.password,
      });

      if (!res?.success) {
        toast.error(res?.message || "Sign up failed");
        return;
      }

      toast.success("Account created. Please sign in.");
      router.push("/sign-in");

    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>

        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button type="submit" className="btn w-full">
              {isSignIn ? "Sign in" : "Create an Account"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
