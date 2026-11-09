import Image from "next/image"
import { ArrowRight } from "lucide-react"
import travelBg from "@/app/images/CTA.png"

const Travel = () => {
  return (
    <div>
      <section className="relative flex min-h-[520px] w-full items-center justify-center overflow-hidden border-2 border-[#15cdbb] bg-[#1d1d1d] sm:min-h-[580px]">
        {/* Background Image */}
        <Image
          src={travelBg}
          alt="Travel destination"
          fill
          priority
          className="object-cover object-center"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center px-5 text-center">
          <h2 className="text-3xl font-medium tracking-tight text-white sm:text-4xl md:text-5xl">
            Ready To Start Your Journey?
          </h2>

          <p className="mt-3 text-sm font-medium text-white sm:text-base">
            Join thousands of travelers who have discovered the world with us
          </p>

          {/* Button */}
          <button className="mt-8 inline-flex items-center gap-4 bg-white px-5 py-3.5 text-xs font-medium text-black transition-all duration-300 hover:bg-[#15cdbb]">
            BOOK YOUR TRIP TODAY
            <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </div>
  )
}

export default Travel
