
"use client";

import { useState } from "react";
import {
  Plane,
  BriefcaseBusiness,
  MapPin,
} from "lucide-react";

import MyBooking from "./MyBooking";

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
  createdAt?: string;
}

interface MyBookingDashboardProps {
  initialBookings: Booking[];
}

const MyBookingDashboard = ({
  initialBookings,
}: MyBookingDashboardProps) => {
  const [bookings, setBookings] = useState(initialBookings);

  // Update dashboard after deleting a booking
  const handleBookingDeleted = (id: string) => {
    setBookings((previousBookings) =>
      previousBookings.filter((booking) => booking._id !== id)
    );
  };

  // Booking statistics
  const confirmed = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const pending = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;

  const cancelled = bookings.filter(
    (booking) => booking.status === "Cancelled"
  ).length;

  return (
    <section className="mt-10 min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-teal-600">
              <Plane size={17} />
              MY TRAVEL DASHBOARD
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              My Bookings
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage and view all your upcoming travel plans.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              <BriefcaseBusiness size={22} />
            </div>

            <div>
              <p className="text-xs text-slate-500">
                Total Bookings
              </p>
              <p className="text-xl font-bold text-slate-900">
                {bookings.length}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Bookings
            </p>
            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {bookings.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-green-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Confirmed Trips
            </p>
            <h2 className="mt-2 text-3xl font-bold text-green-600">
              {confirmed}
            </h2>
          </div>

          <div className="rounded-2xl border border-orange-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending Trips
            </p>
            <h2 className="mt-2 text-3xl font-bold text-orange-500">
              {pending}
            </h2>
          </div>

          <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Cancelled Trips
            </p>
            <h2 className="mt-2 text-3xl font-bold text-red-500">
              {cancelled}
            </h2>
          </div>
        </div>

        {/* Booking List Header */}
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Your Travel Plans
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              All your booked destinations in one place.
            </p>
          </div>

          <span className="w-fit rounded-full bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-700">
            {bookings.length} Trips
          </span>
        </div>

        {/* Booking Cards */}
        <div className="space-y-5">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <MyBooking
                key={booking._id}
                booking={booking}
                onDeleted={handleBookingDeleted}
              />
            ))
          ) : (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-5 py-16 text-center">
              <MapPin
                className="mx-auto mb-4 text-teal-500"
                size={42}
              />

              <h3 className="text-xl font-bold text-slate-900">
                No bookings yet!
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Start exploring amazing destinations and plan your next trip.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default MyBookingDashboard;
