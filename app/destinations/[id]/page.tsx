
import Image from "next/image";
import Link from "next/link";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Globe2,
  MapPin,
  ShieldCheck,
  Sparkles,
  Tag,
  HeartHandshake,
  Headset,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import EditDestinationDialog from "@/components/EditDestinationDialog/EditDestinationDialog";
import DeleteDestination from "@/components/DeleteDestination/DeleteDestination";



interface Destination {
  _id: string;
  destination: string;
  country: string;
  category: string;
  price: number;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
}

const DestinationDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:8000/destinations/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch destination details");
  }

  const data: Destination = await res.json();

  const formattedDate = data.departureDate
    ? new Date(data.departureDate).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Date not available";

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Secure Booking",
      description: "Your booking is safe and protected.",
    },
    {
      icon: Headset,
      title: "24/7 Support",
      description: "We are always here to help you.",
    },
    {
      icon: Wallet,
      title: "Best Price",
      description: "Enjoy great value for your journey.",
    },
  ];

  const bookingBenefits = [
    "Easy and secure booking",
    "Dedicated travel support",
    "Memorable travel experience",
  ];

  return (
    <main className="min-h-screen bg-[#f5f8fa] pb-20">

      {/* Top Section */}
      <section className="relative overflow-hidden bg-[#063f43]">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-teal-400/20 blur-3xl" />

        <div className="absolute -bottom-40 right-0 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 lg:px-8">

          {/* Navigation & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">

            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20"
            >
              <ArrowLeft size={17} />
              Back to Destinations
            </Link>

            {/* Edit & Delete Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <EditDestinationDialog destination={data} />
              <DeleteDestination _id={data._id} />
             
            </div>

          </div>

          {/* Heading */}
          <div className="mt-12 max-w-3xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-300/30 bg-teal-300/10 px-4 py-2 text-sm font-medium text-teal-200">
              <Sparkles size={15} />
              Discover Your Next Adventure
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl lg:text-7xl">
              Explore

              <span className="mt-2 block text-teal-300">
                {data.destination}
              </span>
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">

              <div className="flex items-center gap-2">
                <MapPin size={17} className="text-teal-300" />
                {data.country}
              </div>

              <span className="h-1 w-1 rounded-full bg-white/50" />

              <div className="flex items-center gap-2">
                <Tag size={17} className="text-teal-300" />
                {data.category}
              </div>

              <span className="h-1 w-1 rounded-full bg-white/50" />

              <div className="flex items-center gap-2">
                <Clock3 size={17} className="text-teal-300" />
                {data.duration}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto -mt-10 max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Hero Image */}
        <section className="relative h-[300px] overflow-hidden rounded-3xl border-4 border-white shadow-2xl sm:h-[430px] lg:h-[520px]">

          <Image
            src={data.imageUrl}
            alt={data.destination}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover transition duration-700 hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-end justify-between gap-4 sm:bottom-9 sm:left-9 sm:right-9">

            <div className="rounded-2xl border border-white/20 bg-white/15 px-5 py-3 text-white shadow-lg backdrop-blur-xl">
              <p className="text-xs text-white/75">
                Destination
              </p>

              <p className="mt-1 text-xl font-bold">
                {data.destination}
              </p>
            </div>

            <div className="rounded-full bg-teal-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg">
              {data.category} Trip
            </div>

          </div>
        </section>

        {/* Details and Booking */}
        <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_370px]">

          {/* Left Content */}
          <div className="space-y-10">

            {/* About */}
            <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">

              <div className="mb-6">

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
                  About The Destination
                </span>

                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                  Discover {data.destination}
                </h2>

                <div className="mt-4 h-1 w-16 rounded-full bg-teal-500" />

              </div>

              <p className="text-base leading-8 text-slate-600">
                {data.description}
              </p>

            </section>

            {/* Destination Information */}
            <section>

              <div className="mb-6">

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
                  Trip Information
                </span>

                <h2 className="mt-2 text-3xl font-extrabold text-slate-900">
                  Everything You Need
                </h2>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                {/* Destination */}
                <Card className="rounded-2xl border-slate-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex items-center gap-4 p-5">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                      <MapPin size={23} />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Destination
                      </p>

                      <h3 className="mt-1 font-bold text-slate-900">
                        {data.destination}
                      </h3>
                    </div>

                  </CardContent>
                </Card>

                {/* Country */}
                <Card className="rounded-2xl border-slate-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex items-center gap-4 p-5">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                      <Globe2 size={23} />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Country
                      </p>

                      <h3 className="mt-1 font-bold text-slate-900">
                        {data.country}
                      </h3>
                    </div>

                  </CardContent>
                </Card>

                {/* Departure Date */}
                <Card className="rounded-2xl border-slate-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex items-center gap-4 p-5">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                      <CalendarDays size={23} />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Departure Date
                      </p>

                      <h3 className="mt-1 font-bold text-slate-900">
                        {formattedDate}
                      </h3>
                    </div>

                  </CardContent>
                </Card>

                {/* Duration */}
                <Card className="rounded-2xl border-slate-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <CardContent className="flex items-center gap-4 p-5">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                      <Clock3 size={23} />
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Trip Duration
                      </p>

                      <h3 className="mt-1 font-bold text-slate-900">
                        {data.duration}
                      </h3>
                    </div>

                  </CardContent>
                </Card>

              </div>
            </section>

            {/* Why Choose Us */}
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#075e5b] via-teal-700 to-cyan-700 p-7 text-white shadow-xl sm:p-9">

              <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[30px] border-white/5" />

              <div className="relative">

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-teal-200">
                  Travel With Confidence
                </span>

                <h2 className="mt-3 text-3xl font-extrabold">
                  Your Journey, Our Priority
                </h2>

                <p className="mt-3 max-w-xl leading-7 text-white/75">
                  Make every journey special with reliable service,
                  comfortable travel planning, and dedicated support.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-3">

                  {benefits.map((benefit) => {
                    const Icon = benefit.icon;

                    return (
                      <div key={benefit.title}>

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                          <Icon size={24} />
                        </div>

                        <h3 className="mt-4 font-bold">
                          {benefit.title}
                        </h3>

                        <p className="mt-1 text-xs leading-5 text-white/70">
                          {benefit.description}
                        </p>

                      </div>
                    );
                  })}

                </div>
              </div>
            </section>
          </div>

          {/* Right Booking Card */}
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
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4">

                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700">
                      <CalendarDays size={21} />
                    </div>

                    <div>
                      <p className="text-xs text-slate-500">
                        Departure Date
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-900">
                        {formattedDate}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Duration */}
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 p-4">

                  <div className="flex items-center gap-3">

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
                </div>

                {/* Booking Button */}
                <Button
                  asChild
                  className="h-13 w-full rounded-xl bg-teal-600 text-base font-bold text-white shadow-lg shadow-teal-600/20 transition hover:bg-teal-700"
                >
                  <Link href={`/booking/${data._id}`}>
                    Book This Trip
                    <ArrowRight size={19} />
                  </Link>
                </Button>

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
      </div>
    </main>
  );
};

export default DestinationDetailsPage;
