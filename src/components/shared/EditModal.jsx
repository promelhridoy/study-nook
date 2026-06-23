"use client";

import { useState } from "react";
import { Button, Modal, Surface } from "@heroui/react";
import { FaEdit } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const Field = ({ label, children }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

export function EditModal({ room }) {
  const {
    _id,
    name,
    image,
    floor,
    capacity,
    hourlyRate,
    badge,
    amenities,
    description,
  } = room;

  const [loading, setLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState(
    amenities || []
  );

  const amenityOptions = [
    "WiFi",
    "AC",
    "Projector",
    "Whiteboard",
    "Charging Port",
  ];

  const handleAmenityChange = (item) => {
    setSelectedAmenities((prev) =>
      prev.includes(item)
        ? prev.filter((a) => a !== item)
        : [...prev, item]
    );
  };

  const onSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const formData = new FormData(e.currentTarget);

  const roomData = {
    ...Object.fromEntries(formData.entries()),
    amenities: selectedAmenities,
    capacity: Number(formData.get("capacity")),
    hourlyRate: Number(formData.get("hourlyRate")),
  };

   const tokenData  = await authClient.token();
      const token = tokenData.data.token
      console.log(token);

  try {
    const res = await fetch(
      `http://https://study-nook-server-murex.vercel.app/rooms/${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(roomData),
      }
    );

    const data = await res.json();

    if (data.modifiedCount > 0 || data.success) {
      alert("Room updated successfully!");
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <Modal>
      {/* Trigger */}
        <Button
          className="bg-[#00897b] text-white"
        >
          <FaEdit />
          Edit
        </Button>
     

      <Modal.Backdrop >

      <Modal.Container placement="auto">
        <Modal.Dialog className="sm:max-w-xl">
          <Modal.CloseTrigger />

          <Modal.Header>
            <Modal.Heading>Edit Room</Modal.Heading>
          </Modal.Header>

          <Modal.Body>
            <Surface>
              <form onSubmit={onSubmit} className="space-y-4">

                {/* Name */}
                <Field label="Room Name">
                  <input
                    name="name"
                    defaultValue={name}
                    className="w-full border p-3 rounded"
                  />
                </Field>

                {/* Image */}
                <Field label="Image URL">
                  <input
                    name="image"
                    defaultValue={image}
                    className="w-full border p-3 rounded"
                  />
                </Field>

                {/* Floor */}
                <Field label="Floor">
                  <input
                    name="floor"
                    defaultValue={floor}
                    className="w-full border p-3 rounded"
                  />
                </Field>

                {/* Capacity */}
                <Field label="Seat Capacity">
                  <input
                    type="number"
                    name="capacity"
                    defaultValue={capacity}
                    className="w-full border p-3 rounded"
                  />
                </Field>

                {/* Hourly Rate */}
                <Field label="Hourly Rate">
                  <input
                    type="number"
                    name="hourlyRate"
                    defaultValue={hourlyRate}
                    className="w-full border p-3 rounded"
                  />
                </Field>

                {/* Badge */}
                <Field label="Badge">
                  <select
                    name="badge"
                    defaultValue={badge}
                    className="w-full border p-3 rounded"
                  >
                    <option value="">None</option>
                    <option value="popular">Popular</option>
                    <option value="new">New</option>
                    <option value="best">Best Value</option>
                  </select>
                </Field>

                {/* Amenities */}
                <Field label="Amenities">
                  <div className="flex flex-wrap gap-2">
                    {amenityOptions.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleAmenityChange(item)}
                        className={`px-3 py-2 border rounded transition ${
                          selectedAmenities.includes(item)
                            ? "bg-teal-600 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </Field>

                {/* Description */}
                <Field label="Description">
                  <textarea
                    name="description"
                    defaultValue={description}
                    rows={4}
                    className="w-full border p-3 rounded"
                  />
                </Field>

                {/* Submit */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#00897b] text-white"
                >
                  {loading ? "Updating..." : "Update Room"}
                </Button>

              </form>
            </Surface>
          </Modal.Body>

        </Modal.Dialog>
      </Modal.Container>
      </Modal.Backdrop >
    </Modal>
  );
}