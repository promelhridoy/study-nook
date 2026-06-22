"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Link from "next/link";

import {
  Button,
  Card,
  Form,
  Input,
  Label,
  TextField,
  FieldError,
  Spinner,
  Description,
} from "@heroui/react";

import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const isPending = loading || googleLoading;

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
      });

      if (error) {
        toast.error(error.message || "Something went wrong!");
        setLoading(false);
        return;
      }

      if (data) {
        toast.success("Signed in successfully!");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      toast.error("Failed to sign in!");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setGoogleLoading(true);
    const id = toast.loading("Redirecting to Google...");

    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
      toast.success("Redirecting...", { id });
    } catch (error) {
      toast.error("Google Sign In Failed!", { id });
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#00897b]">
              Sign In
            </h1>
            <p className="text-slate-400 mt-2">
              Welcome back! Please enter your details
            </p>
          </div>

          {/* Form */}
          <Form onSubmit={onSubmit} className="space-y-5">

            <TextField isRequired name="email" type="email">
              <Label>Email</Label>
              <Input placeholder="you@example.com" />
              <FieldError />
            </TextField>

            <TextField
              isRequired
              name="password"
              type="password"
              validate={(value) => {
                if (value.length < 8)
                  return "Min 8 characters required";
                if (!/[A-Z]/.test(value))
                  return "Must include uppercase letter";
                if (!/[0-9]/.test(value))
                  return "Must include number";
                return null;
              }}
            >
              <Label>Password</Label>
              <Input placeholder="••••••••" />
              <Description className="text-slate-400">
                8+ chars, 1 uppercase, 1 number
              </Description>
              <FieldError />
            </TextField>

            {/* Email Sign In Button */}
            <Button
              type="submit"
              disabled={isPending} 
              className="w-full bg-[#00897b] text-white py-5 rounded-2xl flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner size="sm" color="white" />
                  Signing in... 
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </Form>

          <div>
            <p className="text-sm text-slate-400 mt-4">
              Don't have an account?{" "}
              <Link href="/signup" className="text-red-500 hover:underline">
                Sign up
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-slate-200/20 w-full" />
            <span className="text-xs text-slate-400 uppercase">
              OR 
            </span>
            <div className="h-px bg-slate-200/20 w-full" />
          </div>

          {/* Google Sign In Button */}
          <Button
            onClick={handleGoogleSignin}
            disabled={isPending} 
            className="w-full bg-white border border-gray-300 text-black font-semibold py-5 rounded-2xl flex items-center justify-center gap-2"
          >
            {googleLoading ? (
              <>
                <Spinner size="sm" color="current" />
                Redirecting...
              </>
            ) : (
              <>
                <FcGoogle size={22} />
                Continue with Google
              </>
            )}
          </Button>

        </Card>
      </motion.div>
    </div>
  );
};

export default SignInPage;