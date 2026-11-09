import Image from "next/image"

import ShieldCheckIcon from "@/app/images/ShieldCheck.png"
import MapTrifoldIcon from "@/app/images/MapTrifold.png"
import HeadsetIcon from "@/app/images/Headset.png"

const reasons = [
  {
    icon: ShieldCheckIcon,
    title: "Safe & Secure",
    description:
      "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: MapTrifoldIcon,
    title: "Expert Guides",
    description:
      "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: HeadsetIcon,
    title: "24/7 Support",
    description:
      "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
]

export function WhyChoose() {
  return (
    <section className="bg-[#e0f5f8] px-6 py-20 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
            Why Choose Wanderlast
          </h2>
          <p className="mt-3 text-muted-foreground md:text-lg">
            Your trusted partner for exceptional travel experiences
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 items-start gap-6 md:grid-cols-3 md:gap-8">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-lg bg-white p-8 shadow-sm"
            >
              <Image
                src={reason.icon}
                alt=""
                width={48}
                height={48}
                className="size-12"
              />
              <h3 className="mt-6 text-2xl font-semibold">{reason.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
