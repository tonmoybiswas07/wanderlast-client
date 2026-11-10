
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CalendarDays,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export interface Destination {
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

interface DestinationCardProps {
  destination: Destination;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
  const formattedDate = new Date(
    `${destination.departureDate}T00:00:00`
  ).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Section */}
      <div className="relative h-[240px] overflow-hidden">
        <Image
          src={destination.imageUrl}
          alt={destination.destination}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />

        <Badge className="absolute left-4 top-4 rounded-full bg-[#1ba0b9] px-4 py-1.5 text-white hover:bg-[#168ba2]">
          {destination.category}
        </Badge>

        {/* Price */}
        <div className="absolute bottom-4 right-4 rounded-xl bg-white px-4 py-2 shadow-lg">
          <p className="text-xs text-slate-500">Starting from</p>
          <p className="text-xl font-bold text-[#159eb7]">
            ${destination.price.toLocaleString("en-US")}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="space-y-4 p-5">
        <div>
          <div className="mb-2 flex items-center gap-1.5 text-sm text-slate-500">
            <MapPin size={16} className="text-[#1ba0b9]" />
            <span>{destination.country}</span>
          </div>

          <h2 className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#159eb7]">
            {destination.destination}
          </h2>
        </div>

        <p className="line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">
          {destination.description}
        </p>

        {/* Travel Information */}
        <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50">
              <Clock size={17} className="text-[#1ba0b9]" />
            </div>

            <div>
              <p className="text-xs text-slate-400">Duration</p>
              <p className="text-sm font-semibold text-slate-700">
                {destination.duration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-50">
              <CalendarDays size={17} className="text-[#1ba0b9]" />
            </div>

            <div>
              <p className="text-xs text-slate-400">Departure</p>
              <p className="text-sm font-semibold text-slate-700">
                {formattedDate}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Footer Section */}
      <CardFooter className="p-5 pt-0">
        
        <Button
          className="h-11 w-full rounded-xl bg-[#1ba0b9] font-semibold text-white transition-all hover:bg-[#168ba2]"
        >
          <Link href={`/destinations/${destination._id}`}>
            View Details
            <ArrowUpRight
              size={18}
              className="ml-1 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DestinationCard;
