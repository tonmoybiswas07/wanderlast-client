
import DestinationCard from "@/components/DestinationCard/DestinationCard";
import { MapPin, Search } from "lucide-react";

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

const DestinationPage = async () => {
  let data: Destination[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URI}/destinations`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch destinations");
    }

    data = await res.json();
  } catch (error) {
    console.error("Destination fetch error:", error);
  }

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-900 px-4 py-20 text-center text-white">
        <div className="mx-auto max-w-3xl">
          <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium">
            Explore The World With Us
          </span>

          <h1 className="mb-5 text-4xl font-bold tracking-tight md:text-5xl">
            Explore All Destinations
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-7 text-blue-100 md:text-lg">
            Find your perfect travel experience from our curated collection
            of amazing destinations around the world.
          </p>
        </div>
      </section>

      {/* Destination Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-600">
              <MapPin size={17} />
              <span>Discover Your Next Adventure</span>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Popular Destinations
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Showing {data.length} destinations
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">
            <Search size={18} />
            <span>Explore destinations</span>
          </div>
        </div>

        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((destination) => (
              <DestinationCard
                key={destination._id}
                destination={destination}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-20 text-center">
            <MapPin className="mx-auto mb-4 text-slate-400" size={42} />

            <h3 className="text-xl font-semibold text-slate-800">
              No Destinations Found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              There are no destinations available right now. Please check back
              later.
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default DestinationPage;
