"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export function DeleteAlert({ room }) {
  const { _id, name } = room;
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {

    const tokenData  = await authClient.token();
      const token = tokenData.data.token
      console.log(token);
    try {
      setLoading(true);

      const res = await fetch(
        `https://study-nook-server-murex.vercel.app/rooms/${_id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          }
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0 || data.success) {
        setOpen(false);
        router.push("/all-rooms");
        router.refresh();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.div whileTap={{ scale: 0.95 }}>
        <Button
          onClick={() => setOpen(true)}
          className="text-red-500 border border-red-500 rounded-xl"
        >
          <FaTrash />
          Delete
        </Button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-2xl w-[420px]"
            >
              <h2 className="text-lg font-bold">
                Delete Room?
              </h2>

              <p className="text-sm text-gray-500 mt-2">
                This will permanently delete <b>{name}</b>.
              </p>

              <div className="flex justify-end gap-3 mt-5">
                <Button
                  onClick={() => setOpen(false)}
                  variant="flat"
                >
                  Cancel
                </Button>

                <Button
                  onClick={handleDelete}
                  disabled={loading}
                  className="bg-red-500 text-white"
                >
                  {loading ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}