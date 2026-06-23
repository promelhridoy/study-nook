"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrash,
  FaExclamationTriangle,
  FaTimes,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export function BookingCancelAlert({ bookingId, onDelete }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCancelBooking = async () => {

    const tokenData  = await authClient.token();
          const token = tokenData.data.token
          console.log(token);
    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
            },
        }
      );

      const data = await res.json();

      window.location.reload();

      console.log("Deleted:", data);

      // 🔥 instant UI update
      onDelete?.(bookingId);

      setOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger */}
      <Button
        onClick={() => setOpen(true)}
        className="border border-red-500 text-red-500 flex items-center gap-2"
        variant="outline"
      >
        <FaTrash />
        Cancel
      </Button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white p-6 rounded-2xl w-[400px]"
            >
              <div className="flex items-center gap-2 text-red-500 mb-3">
                <FaExclamationTriangle />
                <h2 className="font-bold">Cancel Booking?</h2>

                <button
                  className="ml-auto"
                  onClick={() => setOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <p className="text-gray-600 mb-5">
                This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <Button
                  variant="flat"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>

                <Button
                  color="danger"
                  onClick={handleCancelBooking}
                  isDisabled={loading}
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