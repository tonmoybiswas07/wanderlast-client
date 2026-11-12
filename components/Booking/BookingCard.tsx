
"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Sparkles,
  Tag,
} from "lucide-react";

import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";

interface BookingData {
  _id: string;
  price: number;
  category: string;
  departureDate: string;
  duration: string;
}

interface BookingCardProps {
  data: BookingData;
}

const bookingBenefits = [
  "Easy and secure booking",
  "Dedicated travel support",
  "Memorable travel experience",
];

const BookingCard = ({ data }: BookingCardProps) => {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const initialDate = data.departureDate
    ? data.departureDate.slice(0, 10)
    : "";

  const [departureDate, setDepartureDate] = useState(initialDate);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const formattedDate = departureDate
    ? new Date(`${departureDate}T12:00:00`).toLocaleDateString(
        "en-US",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "Date not available";

  // Submit Booking
  const handleBooking = async () => {
    if (!user) {
      setBookingMessage("Please login before booking.");
      return;
    }

    if (!departureDate) {
      setBookingMessage("Please select a departure date.");
      return;
    }

    try {
      setBookingLoading(true);
      setBookingMessage("");
      setBookingSuccess(false);

     
const bookingData = {
  // User Information
  user: {
    userId: user.id,
    name: user.name,
    email: user.email,
    image: user.image ?? "",
  },

  // Complete Destination Information
  destination: {
    ...data,
  },
  

  // Booking Information
  departureDate,
  status: "Pending",
};
console.log(data)


      const res = await fetch("http://localhost:8000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Booking failed");
      }

      setBookingSuccess(true);
      setBookingMessage("Your trip has been booked successfully!");
    } catch (error) {
      console.error("Booking error:", error);

      setBookingMessage(
        error instanceof Error
          ? error.message
          : "Booking failed. Please try again."
      );
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div>
      <aside className="lg:sticky lg:top-24">
        <Card className="overflow-hidden rounded-3xl border border-slate-100 bg-white py-0 shadow-xl">
          {/* Price Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 to-cyan-500 p-7 text-white">
            <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/10" />

            <div className="relative">
              <div className="flex items-center gap-2 text-sm font-medium text-white/80">
                <Sparkles size={16} />
                Your next adventure starts here
              </div>

              <p className="mt-5 text-sm text-white/80">
                Starting from
              </p>

              <h2 className="mt-1 text-4xl font-extrabold">
                ${data.price}
              </h2>

              <p className="mt-1 text-sm text-white/75">
                Per person
              </p>

              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm backdrop-blur-md">
                <Tag size={15} />
                {data.category} Package
              </div>
            </div>
          </div>

          <CardContent className="space-y-6 p-6">
            {/* Departure Date */}
            <div className="rounded-2xl bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                  <CalendarDays size={21} />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Selected Departure Date
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {formattedDate}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="departureDate"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Choose Departure Date
                </label>

                <input
                  id="departureDate"
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={departureDate}
                  onChange={(e) => {
                    setDepartureDate(e.target.value);
                    setBookingMessage("");
                    setBookingSuccess(false);
                  }}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                <Clock3 size={21} />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Trip Duration
                </p>

                <p className="mt-1 text-sm font-bold text-slate-900">
                  {data.duration}
                </p>
              </div>
            </div>

            {/* User Information */}
            {isPending ? (
              <p className="text-center text-sm text-slate-500">
                Loading user information...
              </p>
            ) : user ? (
              <div className="flex items-center gap-3 rounded-2xl border border-slate-100 p-3">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name || "User"}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-700">
                    {user.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {user.name}
                  </p>
                  <p className="truncate text-xs text-slate-500">
                    {user.email}
                  </p>
                </div>

                <CheckCircle2
                  size={20}
                  className="ml-auto shrink-0 text-teal-600"
                />
              </div>
            ) : (
              <p className="rounded-xl bg-amber-50 p-3 text-center text-sm text-amber-700">
                Please login to book this trip.
              </p>
            )}

            {/* Booking Button */}
            <Button
              onClick={handleBooking}
              disabled={bookingLoading || isPending || !user || !departureDate}
              className="h-13 w-full rounded-xl bg-teal-600 text-base font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700"
            >
              {bookingLoading ? (
                "Booking..."
              ) : (
                <>
                  Book This Trip
                  <ArrowRight size={19} />
                </>
              )}
            </Button>

            {/* Booking Message */}
            {bookingMessage && (
              <p
                className={`text-center text-sm font-medium ${
                  bookingSuccess
                    ? "text-teal-700"
                    : "text-red-600"
                }`}
              >
                {bookingMessage}
              </p>
            )}

            {/* Benefits */}
            <div className="space-y-4 border-t border-slate-100 pt-5">
              {bookingBenefits.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm text-slate-600"
                >
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-teal-600"
                  />
                  {item}
                </div>
              ))}
            </div>

            {/* Help Box */}
            <div className="rounded-2xl bg-teal-50 p-4 text-center">
              <HeartHandshake
                size={25}
                className="mx-auto text-teal-600"
              />

              <p className="mt-2 text-sm font-bold text-slate-800">
                Need help planning your trip?
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Our team is ready to help you.
              </p>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
};

export default BookingCard;
