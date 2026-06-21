"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { authClient } from "@/lib/auth-client";
import {
  Mail,
  User,
  ShieldCheck,
  Pencil,
  X,
  LogOut,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { data: session, isLoading } = authClient.useSession();
  const user = session?.user;

  const router = useRouter();

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  // sync user data
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
    }
  }, [user]);

  // update profile
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!user) return toast.error("User not found!");

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name,
        image,
      });

      if (error) {
        toast.error(error.message || "Update failed!");
        return;
      }

      toast.success("Profile updated successfully!");
      setOpenModal(false);
    } catch (err) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // sign out + redirect home
  const handleSignOut = async () => {
    try {
      await authClient.signOut();

      toast.success("Signed out successfully!");

      router.replace("/");
    } catch (err) {
      toast.error("Sign out failed!");
    }
  };

  // loading state (IMPORTANT FIX)
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  // no user state (IMPORTANT FIX)
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Please login to view profile
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">

      <motion.div
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg text-black">

          {/* ACTION BUTTONS */}
          <div className="flex justify-between items-center mb-5">

            {/* EDIT */}
            <button
              onClick={() => setOpenModal(true)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-medium"
            >
              <Pencil size={18} />
              Edit
            </button>

            {/* SIGN OUT */}
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </div>

          {/* PROFILE IMAGE */}
          <div className="flex flex-col items-center">

            <Image
              src={
                user?.image ||
                "https://i.ibb.co/4pDNDk1/avatar.png"
              }
              width={120}
              height={120}
              alt="profile"
              className="rounded-full border-4 border-cyan-400 object-cover"
            />

            <h1 className="text-3xl font-bold text-black mt-5">
              {user?.name}
            </h1>

            <p className="text-gray-600 text-sm mt-1">
              Verified Account
            </p>
          </div>

          {/* INFO */}
          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-4">
              <User className="text-cyan-500" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <h2 className="text-black font-medium">
                  {user?.name}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-4">
              <Mail className="text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <h2 className="text-black font-medium">
                  {user?.email}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-4">
              <ShieldCheck className="text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <h2 className="text-green-600 font-medium">
                  Verified User
                </h2>
              </div>
            </div>

          </div>
        </div>
      </motion.div>

      {/* MODAL */}
      {openModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
        >
          <motion.div
            initial={{ scale: 0.7, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            className="w-full max-w-md bg-white border border-gray-200 rounded-3xl p-6 relative text-black"
          >

            <button
              onClick={() => setOpenModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X />
            </button>

            <h2 className="text-2xl font-bold mb-6">
              Edit Profile
            </h2>

            <form onSubmit={handleUpdate} className="space-y-5">

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                placeholder="Enter name"
              />

              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full border border-gray-300 rounded-xl px-4 py-3"
                placeholder="Image URL"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-cyan-500 text-black font-bold"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>

            </form>
          </motion.div>
        </motion.div>
      )}

    </div>
  );
};

export default ProfilePage;