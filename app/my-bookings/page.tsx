import MyBookingDashboard from "@/components/MyBooking/MyBookingDashboard"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

interface Booking {
  _id: string

  user: {
    userId: string
    name: string
    email: string
    image?: string
  }

  destination: {
    _id: string
    destination: string
    country: string
    category: string
    price: number
    duration: string
    departureDate: string
    imageUrl: string
    description: string
  }

  departureDate: string
  status: "Confirmed" | "Pending" | "Cancelled"
  createdAt?: string
}

const MyBookingPage = async () => {
  // Get logged-in user
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const user = session?.user

  if (!user) {
    redirect("/auth/signin")
  }

  if (!user.email) {
    throw new Error("User email not found")
  }
  const jwtToken = await auth.api.getToken({
    headers: await headers(),
  })
  // Fetch user's bookings
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URI}/my-bookings/${encodeURIComponent(user.email)}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch bookings")
  }

  const bookings: Booking[] = await res.json()

  return <MyBookingDashboard initialBookings={bookings} />
}

export default MyBookingPage
