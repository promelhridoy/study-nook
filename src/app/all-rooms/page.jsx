"use client";

import RoomCard from "@/components/shared/RoomCard";
import { useEffect, useMemo, useState } from "react";

const AllRoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBadge, setSelectedBadge] = useState("all");
  const [selectedFloor, setSelectedFloor] = useState("all");
  const [selectedCapacity, setSelectedCapacity] = useState("all");
  const [sortPrice, setSortPrice] = useState("default");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/rooms`);
        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, []);

  const filteredRooms = useMemo(() => {
    let filtered = rooms.filter((room) => {
      const matchesSearch = room.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesBadge =
        selectedBadge === "all"
          ? true
          : room.badge === selectedBadge;

      const matchesFloor =
        selectedFloor === "all"
          ? true
          : String(room.floor) === selectedFloor;

      const matchesCapacity =
        selectedCapacity === "all"
          ? true
          : String(room.capacity) === selectedCapacity;

      return (
        matchesSearch &&
        matchesBadge &&
        matchesFloor &&
        matchesCapacity
      );
    });

    // Sort Price
    if (sortPrice === "lowToHigh") {
      filtered.sort(
        (a, b) => a.hourlyRate - b.hourlyRate
      );
    }

    if (sortPrice === "highToLow") {
      filtered.sort(
        (a, b) => b.hourlyRate - a.hourlyRate
      );
    }

    return filtered;
  }, [
    rooms,
    searchTerm,
    selectedBadge,
    selectedFloor,
    selectedCapacity,
    sortPrice,
  ]);

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          All Study Rooms
        </h1>
        <p className="text-gray-500 mt-2">
          Find the perfect study space for your needs.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search room..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        />

        {/* Badge Filter */}
        <select
          value={selectedBadge}
          onChange={(e) =>
            setSelectedBadge(e.target.value)
          }
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">⭐ All Badges</option>
          <option value="popular">⭐ Popular</option>
          <option value="new">🔥 New</option>
          <option value="best">💰 Best Value</option>
        </select>

        {/* Floor Filter */}
        <select
          value={selectedFloor}
          onChange={(e) =>
            setSelectedFloor(e.target.value)
          }
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">📍 All Floors</option>

          {[...new Set(rooms.map((room) => String(room.floor)))]
            .filter((floor) => floor !== "undefined" && floor !== "null" && floor !== "")
            .map((floor) => (
              <option key={floor} value={floor}>
                {floor}
              </option>
            ))}
        </select>

        {/* Capacity Filter */}
        <select
          value={selectedCapacity}
          onChange={(e) =>
            setSelectedCapacity(e.target.value)
          }
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">👥 All Capacity</option>

          {[...new Set(rooms.map((room) => String(room.capacity)))]
            .filter((capacity) => capacity !== "undefined" && capacity !== "null" && capacity !== "")
            .map((capacity) => (
              <option
                key={capacity}
                value={capacity}
              >
                {capacity}
              </option>
            ))}
        </select>

        {/* Price Sort */}
        <select
          value={sortPrice}
          onChange={(e) =>
            setSortPrice(e.target.value)
          }
          className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="default">
            💰 Sort By Price
          </option>
          <option value="lowToHigh">
            💰 Low → High
          </option>
          <option value="highToLow">
            💸 High → Low
          </option>
        </select>
      </div>

      {/* Result Count */}
      <p className="text-gray-500 mb-6">
        Found {filteredRooms.length} room(s)
      </p>

      {/* Rooms Grid */}
      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard
              key={room._id}
              room={room}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-semibold">
            No Rooms Found 😔
          </h3>
          <p className="text-gray-500 mt-2">
            Try changing your search or filter.
          </p>
        </div>
      )}
    </section>
  );
};

export default AllRoomsPage;