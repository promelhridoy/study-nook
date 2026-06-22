"use client";

import { useState } from "react";
import BookingList from "./BookingList";

const BookingContainer = ({ initialBookings }) => {
  const [bookings, setBookings] = useState(initialBookings);

  const handleDeleteUI = (id) => {
    // Instant UI updating without single reload flash
    setBookings((prev) => prev.filter((item) => item._id !== id));
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16 text-gray-500">
        <h3 className="text-xl font-medium">No bookings found 😔</h3>
        <p className="text-sm mt-1">Try to book some modern study rooms first!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg text-gray-500 mb-4">
        Found {bookings.length} room booking(s)
      </h2>

      <div className="space-y-6">
        {bookings.map((booking, index) => (
          <BookingList
            key={booking._id.toString()} // Ensure string conversion
            booking={booking}
            index={index}
            onDelete={handleDeleteUI} // Clean functional communication
          />
        ))}
      </div>
    </div>
  );
};

export default BookingContainer;