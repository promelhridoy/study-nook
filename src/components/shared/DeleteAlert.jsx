"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

export function DeleteAlert({ room }) {
  const { _id, name } = room;

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `http://localhost:5000/rooms/${_id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0 || data.success) {
        router.push("/all-rooms");
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          className="text-red-500 border-red-500 rounded-xl"
          variant="outline"
        >
          <FaTrash />
          Delete
        </Button>
      </motion.div>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <AlertDialog.Dialog className="sm:max-w-[420px] rounded-2xl">
              <AlertDialog.CloseTrigger />

              <AlertDialog.Header>
                <AlertDialog.Icon status="danger" />
                <AlertDialog.Heading>
                  Delete Room Permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>

              <AlertDialog.Body>
                <p className="text-gray-600">
                  This will permanently delete{" "}
                  <strong>{name}</strong> and all of its
                  data. This action cannot be undone.
                </p>
              </AlertDialog.Body>

              <AlertDialog.Footer>
                <Button slot="close" variant="tertiary">
                  Cancel
                </Button>

                <Button
                  onClick={handleDelete}
                  slot="close"
                  variant="danger"
                  disabled={loading}
                >
                  {loading ? "Deleting..." : "Delete"}
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </motion.div>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}