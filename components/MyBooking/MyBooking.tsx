
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  CalendarDays,
  MapPin,
  Eye,
  Clock3,
  CheckCircle2,
  Tag,
  ArrowUpRight,
  X,
  Loader2,
} from "lucide-react";

import { toast } from "react-toastify";
import { authClient } from "@/lib/auth-client";

interface Booking {
  _id: string;

  user: {
    userId: string;
    name: string;
    email: string;
    image?: string;
  };

  destination: {
    _id: string;
    destination: string;
    country: string;
    category: string;
    price: number;
    duration: string;
    departureDate: string;
    imageUrl: string;
    description: string;
  };

  departureDate: string;
  status: "Confirmed" | "Pending" | "Cancelled";
}

interface MyBookingProps {
  booking: Booking;
    onDeleted: (id: string) => void;
}

const MyBooking = ({ booking ,onDeleted}: MyBookingProps) => {
  const { destination, departureDate, status } = booking;

  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const statusStyle = {
    Confirmed: "bg-green-50 text-green-700 border-green-100",
    Pending: "bg-orange-50 text-orange-600 border-orange-100",
    Cancelled: "bg-red-50 text-red-600 border-red-100",
  };

  // Delete Booking
 const handleCancelBooking = async (id: string) => {
   const { data, error } = await authClient.token()
    
      const jwtToken = data?.token
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this booking?"
  );

  if (!confirmCancel) return;

  try {
    setIsDeleting(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/booking/${id}`,
      {
        method: "DELETE",
        headers:{
          "Authorization": `Bearer ${jwtToken}`
        }
      }
    );

    const result = await res.json();

    if (!res.ok) {
      throw new Error(
        result.message || "Failed to delete booking"
      );
    }

    toast.success("Booking deleted successfully!");

   onDeleted(id)

  } catch (error) {
    console.error("Delete booking error:", error);

    toast.error(
      error instanceof Error
        ? error.message
        : "Something went wrong!"
    );

    setIsDeleting(false);
  }
};

  // Hide card after successful deletion
  if (isDeleted) {
    return null;
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg">

      <div className="flex flex-col gap-5 md:flex-row md:items-center">

        {/* Destination Image */}
        <div className="relative h-56 w-full shrink-0 overflow-hidden rounded-xl md:h-40 md:w-[280px] lg:w-[320px]">

          <Image
            width={640}
            height={400}
            src={destination.imageUrl}
            alt={destination.destination}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-slate-800 shadow-sm backdrop-blur">
            <span className="flex items-center gap-1.5">
              <MapPin size={13} className="text-teal-600" />
              {destination.country}
            </span>
          </div>
        </div>

        {/* Booking Details */}
        <div className="min-w-0 flex-1 px-1 py-2">

          {/* Status */}
          <div className="mb-3">
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                statusStyle[status]
              }`}
            >
              {status === "Confirmed" ? (
                <CheckCircle2 size={14} />
              ) : (
                <Clock3 size={14} />
              )}

              {status}
            </span>
          </div>

          {/* Destination Name */}
          <h2 className="text-xl font-bold text-slate-900 transition-colors group-hover:text-teal-600 sm:text-2xl">
            {destination.destination}
          </h2>

          {/* Destination Information */}
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3">

            {/* Departure Date */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays size={16} className="text-teal-600" />

              <span>
                {new Date(
                  `${departureDate.slice(0, 10)}T12:00:00`
                ).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock3 size={16} className="text-teal-600" />
              <span>{destination.duration}</span>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Tag size={16} className="text-teal-600" />
              <span>{destination.category}</span>
            </div>
          </div>

          {/* Booking ID */}
          <p className="mt-3 flex items-center gap-2 text-xs text-slate-400">
            <MapPin size={14} />
            Booking ID: {booking._id}
          </p>

          {/* Price */}
          <div className="mt-4">
            <p className="text-xs text-slate-400">
              Total Package Price
            </p>

            <h3 className="mt-0.5 text-2xl font-extrabold text-teal-600">
              ${destination.price.toLocaleString("en-US")}
            </h3>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex shrink-0 flex-row gap-2 border-t border-slate-100 pt-4 md:flex-col md:border-l md:border-t-0 md:pl-5 md:pt-0">

          {/* View Details */}
          <Link
            href={`/destination/${destination._id}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 md:min-w-[130px]"
          >
            <Eye size={16} />
            View Details
            <ArrowUpRight size={15} />
          </Link>

          {/* Cancel Booking */}
          <button
            type="button"
            onClick={() => handleCancelBooking(booking._id)}
            disabled={isDeleting}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 md:min-w-[130px]"
          >
            {isDeleting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <X size={16} />
                Cancel Booking
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
