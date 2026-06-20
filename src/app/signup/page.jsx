"use client";

import { motion } from "framer-motion";


import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";

import { FcGoogle } from "react-icons/fc";

const SignUpPage = () => {
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 px-4 overflow-hidden py-10">
      
      {/* Background Blurs */}
      <div className="absolute w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
      <div className="absolute w-72 h-72 bg-blue-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className="w-full max-w-md z-10"
      >
        <Card className="w-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl rounded-3xl p-8">
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Sign Up
            </h1>
            <p className="text-slate-400 mt-2">
              Join Wanderlust and start your journey
            </p>
          </motion.div>

          <Form className="flex flex-col gap-4">
            
            {/* Name Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full"
            >
              <TextField isRequired name="name" type="text">
                <Label className="text-white">Full Name</Label>
                <Input placeholder="John Doe" />
                <FieldError />
              </TextField>
            </motion.div>

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="w-full"
            >
              <TextField
                isRequired
                name="email"
                type="email"
                validate={(value) => {
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Please enter a valid email address";
                  }
                  return null;
                }}
              >
                <Label className="text-white">Email</Label>
                <Input placeholder="john@example.com" />
                <FieldError />
              </TextField>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="w-full"
            >
              <TextField
                isRequired
                minLength={8}
                name="password"
                type="password"
                validate={(value) => {
                  if (value.length < 8) {
                    return "Password must be at least 8 characters";
                  }
                  if (!/[A-Z]/.test(value)) {
                    return "Password must contain at least one uppercase letter";
                  }
                  if (!/[0-9]/.test(value)) {
                    return "Password must contain at least one number";
                  }
                  return null;
                }}
              >
                <Label className="text-white">Password</Label>
                <Input placeholder="Enter your password" />
                <Description className="text-slate-400 text-xs">
                  Must be at least 8 characters with 1 uppercase and 1 number
                </Description>
                <FieldError />
              </TextField>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="w-full mt-2"
            >
              <Button
                type="submit"
                isDisabled={loading}
                className="w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-6 hover:scale-[1.02] transition-all duration-300 shadow-lg shadow-cyan-500/20"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" color="white" />
                    Creating Account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </motion.div>
          </Form>

          {/* Divider */}
          <div className="flex justify-center items-center gap-3 my-5">
            <div className="h-px w-full bg-white/10"></div>
            <div className="whitespace-nowrap text-sm text-slate-400">
              Or signup with
            </div>
            <div className="h-px w-full bg-white/10"></div>
          </div>

          {/* Google Sign In */}
          <div className="mb-6">
            <Button
              onClick={handleGoogleSignin}
              className="w-full rounded-2xl bg-white text-black hover:bg-slate-200 font-semibold py-6 transition-all duration-300"
            >
              <FcGoogle size={22} />
              Sign up with Google
            </Button>
          </div>

          {/* Redirect to Login */}
          <p className="text-center text-sm text-slate-400">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-cyan-400 cursor-pointer hover:underline font-medium"
            >
              Login
            </span>
          </p>

        </Card>
      </motion.div>
    </div>
  );
};

export default SignUpPage;