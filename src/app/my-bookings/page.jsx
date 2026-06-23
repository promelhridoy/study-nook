import BookingContainer from "@/components/shared/BookingContainer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;


  const { token } = await auth.api.getToken({
    headers: await headers(),
  });


  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/bookings/${user.id}`,
    {
      headers: {
      authorization: `Bearer ${token}`
    },
       cache: "no-store" ,
      }
  );

  const rawBookings = await res.json();
  
  // Transform or ensure safe array conversion for dynamic Next.js runtime environment 
  const bookings = Array.isArray(rawBookings) ? rawBookings : [];

  return (
    <div className="container mx-auto p-5 max-w-5xl py-10 min-h-screen">
      <h1 className="text-3xl font-black mb-2 text-gray-800">My Bookings</h1>
      <p className="text-lg font-medium text-gray-500 mb-8">
        Manage your premium reserved slots, {user.name}
      </p>

      {/* Clean Client bridge with structural data separation */}
      <BookingContainer initialBookings={bookings} />
    </div>
  );
};

export default MyBookingsPage;