import BookingList from "@/components/shared/BookingList";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-bold">Please Login First</h1>
      </div>
    );
  }

  const res = await fetch(
    `http://localhost:5000/bookings/${user.id}`,
    { cache: "no-store" }
  );

  const bookings = await res.json();

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      <h2 className="text-xl font-semibold text-gray-600 mb-4">
        {user.name}'s Bookings
      </h2>
      <h2 className="text-lg text-gray-500">
        {bookings.length} bookings found
      </h2>

      <div className="space-y-6">
        {bookings?.length > 0 ? (
  bookings.map((booking, index) => (
    <BookingList
      key={booking._id}
      booking={booking}
      index={index}
    />
  ))
) : (
           <div className="text-center py-10 text-gray-500">
            No bookings found.
          </div>
        )} 
      </div>
    </div>
  );
};

export default MyBookingsPage;