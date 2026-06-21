"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

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

const SignUpPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const user = Object.fromEntries(formData.entries());

      const { data, error } = await authClient.signUp.email({
        email: user.email,
        password: user.password,
        name: user.name,
        image: user.image,
      });

      if (error) {
        toast.error(error.message || "Something went wrong!");
        setLoading(false);
        return;
      }

      if (data) {
        toast.success("Account created successfully!");

        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err) {
      toast.error("Failed to create account!");
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
              Create Account
            </h1>
            <p className="text-slate-400 mt-2">
              Join and explore study rooms
            </p>
          </div>

          {/* Form */}
          <Form onSubmit={onSubmit} className="space-y-5">

            <TextField isRequired name="name">
              <Label>Name</Label>
              <Input placeholder="Enter your name" />
              <FieldError />
            </TextField>

            <TextField name="image">
              <Label>Profile Image URL</Label>
              <Input placeholder="https://..." />
              <FieldError />
            </TextField>

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

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00897b] text-white py-5 rounded-2xl"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </Form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-slate-400 w-full" />
            <span className="text-xs text-slate-400 uppercase">
              OR
            </span>
            <div className="h-px bg-slate-400 w-full" />
          </div>

          {/* Google */}
          <Button
            onClick={handleGoogleSignin}
            disabled={googleLoading}
            className="w-full bg-white border border-gray-300 text-black font-semibold py-5 rounded-2xl flex items-center justify-center gap-2"
          >
            <FcGoogle size={22} />
            {googleLoading ? "Redirecting..." : "Continue with Google"}
          </Button>

        </Card>
      </motion.div>
    </div>
  );
};

export default SignUpPage;