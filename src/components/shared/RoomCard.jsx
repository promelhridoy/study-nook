"use client";

import Image from "next/image";
import { Card, Chip } from "@heroui/react";
import { motion } from "framer-motion";
import Link from "next/link";

const MotionCard = motion(Card);

const RoomCard = ({ room }) => {
    const { _id, name, description, hourlyRate, amenities, image, badge } = room;
  const badgeMap = {
    popular: "⭐ Popular",
    new: "🔥 New",
    best: "💰 Best Value",
  };

  return (
    <MotionCard
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md hover:shadow-xl"
    >
      {/* Image */}
      <div className="relative h-[220px] w-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />

        {/* Badge */}
        {badge && (
          <div className="absolute left-3 top-3">
            <span className="rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {badgeMap[room.badge]}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4 p-5">
        {/* Name */}
        <h2 className="text-xl font-bold text-[#004d40]">
          {name}
        </h2>

        {/* Description */}
        <p className="line-clamp-2 text-sm leading-relaxed text-gray-600">
          {description}
        </p>

        {/* Price */}
        <div>
          <span className="text-2xl font-bold text-[#00897b]">
            ${hourlyRate}
          </span>
          <span className="ml-1 text-sm text-gray-500">
            / hour
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2">
          {amenities?.slice(0, 3).map((item, index) => (
            <Chip
              key={index}
              size="sm"
              variant="flat"
              className="bg-gray-100 text-gray-700"
            >
              {item}
            </Chip>
          ))}

          {amenities?.length > 3 && (
            <Chip
              size="sm"
              variant="flat"
              className="bg-gray-100 text-gray-500"
            >
              +{amenities.length - 3} more
            </Chip>
          )}
        </div>

        {/* View Details */}
        <Link href={`/all-rooms/${_id}`}>
          <button className="w-full rounded-xl bg-[#00897b] py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#00796b]">
            View Details
          </button>
        </Link>
      </div>
    </MotionCard>
  );
};

export default RoomCard;