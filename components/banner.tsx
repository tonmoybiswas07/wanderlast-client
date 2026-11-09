import Image from "next/image"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import BannerImage from "@/app/images/Banner.png"

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
]

export function Banner() {
  return (
    <section className="relative flex min-h-[680px] flex-col overflow-hidden md:min-h-[760px]">
      <Image
        src={BannerImage}
        alt="Aerial view of a coastal bay with turquoise water and green hills"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-32 pb-44 text-center">
        <h1 className="max-w-4xl text-5xl leading-[1.05] font-normal text-white md:text-7xl lg:text-8xl">
          Discover Your
          <br className="hidden md:block" /> Next
          <br className="hidden md:block" /> Adventure
        </h1>

        <p className="mt-6 max-w-2xl text-base text-white/90 md:text-lg">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
          <Button
            className="h-12 rounded-md bg-[#4b8596] px-7 text-sm font-semibold tracking-wider text-white uppercase hover:bg-[#3f7484] md:text-base"
          >
            Explore Now
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button
            variant="outline"
            className="h-12 rounded-md border-transparent bg-white/25 px-7 text-sm font-semibold tracking-wider text-white uppercase backdrop-blur hover:bg-white/35 hover:text-white md:text-base"
          >
            View Destination
          </Button>
        </div>
      </div>

      <div className="relative z-10 bg-black/30 backdrop-blur-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1fr_auto]">
          {searchFields.map((field) => (
            <div
              key={field.label}
              className="border-t border-white/20 px-6 py-4 text-center first:border-t-0 sm:text-left lg:border-t-0 lg:border-l lg:py-5 lg:first:border-l-0 lg:first:pl-12"
            >
              <p className="text-lg font-semibold text-white md:text-xl">
                {field.label}
              </p>
              <p className="mt-0.5 text-[13px] text-white/85">
                {field.placeholder}
              </p>
            </div>
          ))}

          <Button className="h-full rounded-none bg-[#2f9db5] px-10 text-lg font-semibold text-white hover:bg-[#268ba4] md:px-12 md:text-xl">
            Search
          </Button>
        </div>
      </div>
    </section>
  )
}
