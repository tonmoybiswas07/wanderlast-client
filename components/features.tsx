
"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import type { CarouselApi } from "@/components/ui/carousel";

import person1 from "@/app/images/person1.png";
import person2 from "@/app/images/person2.png";

const testimonials = [
  {
    text: `"The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable."`,
    name: "Michael Chen",
    location: "Singapore",
    image: person1,
  },
  {
    text: `"Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!"`,
    name: "Sarah Johnson",
    location: "New York, USA",
    image: person2,
  },
  {
    text: `"Our trip to Paris was an incredible experience. Everything was organized perfectly, and every moment felt special. We cannot wait to travel again!"`,
    name: "David Wilson",
    location: "London, UK",
    image: person1,
  },
  {
    text: `"The Maldives vacation was beyond beautiful. The hotel, beaches, and activities made our holiday truly unforgettable. Everything was perfect!"`,
    name: "Emily Davis",
    location: "Toronto, Canada",
    image: person2,
  },
];

export default function Testimonials() {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <section className="w-full border border-[#15cdbb] bg-white px-5 py-16 sm:px-10 lg:px-[5.5%] lg:py-20">
      <div className="mx-auto max-w-[1400px]">

        {/* Heading */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-black sm:text-4xl lg:text-5xl">
              What Travelers Say
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Real experiences from our happy travelers
            </p>
          </div>

          {/* Carousel Navigation */}
          <div className="hidden items-center gap-3 sm:flex">
            <button
              onClick={() => api?.scrollPrev()}
              aria-label="Previous testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:border-[#12b8d5] hover:text-[#12b8d5]"
            >
              <ArrowLeft size={19} />
            </button>

            <button
              onClick={() => api?.scrollNext()}
              aria-label="Next testimonials"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:border-[#12b8d5] hover:text-[#12b8d5]"
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-5">
            {testimonials.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-full pl-5 md:basis-1/2"
              >
                <div className="flex min-h-[230px] gap-4 border border-gray-200 p-4 sm:gap-6 sm:p-5">

                  {/* Text Content */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between">
                    <p className="text-[16px] font-medium leading-[1.12] tracking-tight text-black sm:text-[17px]">
                      {item.text}
                    </p>

                    <div className="mt-5">
                      <p className="text-sm font-medium text-[#159fc0]">
                        — {item.name}
                      </p>

                      <p className="mt-0.5 pl-4 text-[11px] text-gray-500">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Profile Image */}
                  <div className="relative h-[195px] w-[42%] shrink-0 self-center overflow-hidden sm:w-[38%]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 42vw, 250px"
                      className="object-cover"
                    />
                  </div>

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Mobile Navigation */}
        <div className="mt-6 flex justify-center gap-3 sm:hidden">
          <button
            onClick={() => api?.scrollPrev()}
            aria-label="Previous testimonials"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:border-[#12b8d5] hover:text-[#12b8d5]"
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={() => api?.scrollNext()}
            aria-label="Next testimonials"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-300 text-gray-500 transition hover:border-[#12b8d5] hover:text-[#12b8d5]"
          >
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
