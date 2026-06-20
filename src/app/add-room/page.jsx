"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, PlusCircle } from "lucide-react";

export default function AddRoomPage() {
  const [loading, setLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const amenityOptions = [
    "Whiteboard",
    "Projector",
    "Wi-Fi",
    "Power Outlets",
    "Quiet Zone",
    "Air Conditioning",
  ];

  // toggle amenities
  const handleAmenityChange = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const roomData = Object.fromEntries(formData.entries());

    // convert numbers
    roomData.capacity = Number(roomData.capacity);
    roomData.hourlyRate = Number(roomData.hourlyRate);

    // add amenities
    roomData.amenities = selectedAmenities;

    console.log("Final Room Data:", roomData);

    try {
      const res = await fetch("http://localhost:5000/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
      });

      const data = await res.json();

      if (data.insertedId) {
        alert("Room added successfully!");

        form.reset();
        setSelectedAmenities([]);
      } else {
        alert("Failed to add room!");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            Add New Study Room
          </h1>
          <p className="text-gray-600 mt-2">
            Create and publish a new study room listing
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Room Name */}
              <div>
                <label className="block mb-2 font-medium">
                  Room Name
                </label>
                <input
                  type="text"
                  name="roomName"
                  required
                  placeholder="Community Study Hall"
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Image URL */}
              <div>
                <label className="block mb-2 font-medium">
                  Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  required
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Floor */}
              <div>
                <label className="block mb-2 font-medium">
                  Floor
                </label>
                <input
                  type="text"
                  name="floor"
                  required
                  placeholder="Floor 3"
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Capacity */}
              <div>
                <label className="block mb-2 font-medium">
                  Seat Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  required
                  min="1"
                  placeholder="10"
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Hourly Rate */}
              <div>
                <label className="block mb-2 font-medium">
                  Hourly Rate ($)
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  required
                  min="0"
                  placeholder="18"
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Amenities */}
              <div>
                <label className="block mb-2 font-medium">
                  Amenities
                </label>

                <div className="flex flex-wrap gap-2">
                  {amenityOptions.map((amenity) => (
                    <button
                      key={amenity}
                      type="button"
                      onClick={() =>
                        handleAmenityChange(amenity)
                      }
                      className={`px-3 py-2 rounded-lg border transition ${
                        selectedAmenities.includes(amenity)
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "bg-gray-100 border-gray-300 text-black hover:bg-gray-200"
                      }`}
                    >
                      {amenity}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block mb-2 font-medium">
                  Description
                </label>

                <textarea
                  name="description"
                  required
                  rows={5}
                  placeholder="Describe the study room..."
                  className="w-full bg-white border border-gray-300 rounded-lg p-3 text-black placeholder-gray-500 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>

            {/* Selected Amenities */}
            {selectedAmenities.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Selected Amenities:
                </p>

                <div className="flex flex-wrap gap-2">
                  {selectedAmenities.map((item) => (
                    <span
                      key={item}
                      className="bg-emerald-600 text-white px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publishing Room...
                </>
              ) : (
                <>
                  <PlusCircle className="w-5 h-5" />
                  List Study Room
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}