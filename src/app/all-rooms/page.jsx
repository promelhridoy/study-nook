"use client";

import RoomCard from "@/components/shared/RoomCard";
import { useEffect, useState } from "react";

const AllRoomsPage = () => {
  const [rooms, setRooms] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBadge, setSelectedBadge] = useState("all");
  const [selectedFloor, setSelectedFloor] = useState("all");
  const [selectedCapacity, setSelectedCapacity] = useState("all");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const params = new URLSearchParams();

        if (searchTerm) {
          params.append("search", searchTerm);
        }

        if (selectedBadge !== "all") {
          params.append("badge", selectedBadge);
        }

        if (selectedFloor !== "all") {
          params.append("floor", selectedFloor);
        }

        if (selectedCapacity !== "all") {
          params.append("capacity", selectedCapacity);
        }

        const res = await fetch(
          `https://study-nook-server-murex.vercel.app/rooms?${params.toString()}`
        );

        const data = await res.json();
        setRooms(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchRooms();
  }, [
    searchTerm,
    selectedBadge,
    selectedFloor,
    selectedCapacity,
  ]);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          All Study Rooms
        </h1>

        <p className="text-gray-500 mt-2">
          Find the perfect study space.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search room..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="border rounded-xl px-4 py-3"
        />

        <select
          value={selectedBadge}
          onChange={(e) =>
            setSelectedBadge(e.target.value)
          }
          className="border rounded-xl px-4 py-3"
        >
          <option value="all">
            All Badges
          </option>
          <option value="popular">
            Popular
          </option>
          <option value="new">
            New
          </option>
          <option value="best">
            Best Value
          </option>
        </select>

        <select
          value={selectedFloor}
          onChange={(e) =>
            setSelectedFloor(e.target.value)
          }
          className="border rounded-xl px-4 py-3"
        >
          <option value="all">
            All Floors
          </option>

          {[...new Set(rooms.map((r) => r.floor))]
            .filter(Boolean)
            .map((floor) => (
              <option
                key={floor}
                value={floor}
              >
                Floor {floor}
              </option>
            ))}
        </select>

        <select
          value={selectedCapacity}
          onChange={(e) =>
            setSelectedCapacity(e.target.value)
          }
          className="border rounded-xl px-4 py-3"
        >
          <option value="all">
            All Capacity
          </option>

          {[...new Set(rooms.map((r) => r.capacity))]
            .filter(Boolean)
            .map((capacity) => (
              <option
                key={capacity}
                value={capacity}
              >
                {capacity} Persons
              </option>
            ))}
        </select>
      </div>

      <p className="text-gray-500 mb-6">
        Found {rooms.length} room(s)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <RoomCard
            key={room._id}
            room={room}
          />
        ))}
      </div>
    </section>
  );
};

export default AllRoomsPage;