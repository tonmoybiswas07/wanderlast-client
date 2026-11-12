
import { Banner } from "@/components/banner"
import { WhyChoose } from "@/components/why-choose"
import Testimonials from "@/components/features"
import Travel from "@/components/travel"

export default function Page() {
  return (
    <main>
      <Banner />

      <WhyChoose />
      <Testimonials></Testimonials>
      <Travel />
    </main>
  )
}
