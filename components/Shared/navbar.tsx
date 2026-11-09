"use client"

import Link from "next/link"
import Image from "next/image"

import { useState } from "react"
import { Menu, X, User } from "lucide-react"

import { cn } from "@/lib/utils"
import Wanderlast from "@/app/images/Wanderlast.png"

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "#destinations" },
  { label: "My Bookings", href: "#bookings" },
  { label: "Admin", href: "#admin" },
]

const authLinks = [
  { label: "Login", href: "#login" },
  { label: "Sign Up", href: "#signup" },
]

const linkClass =
  "text-[15px] font-semibold text-neutral-900 transition-colors hover:text-[#1d9bb8]"

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-4 z-50 px-4 md:px-6">
      <div className="relative mx-auto flex h-12 max-w-[1400px] items-center justify-between rounded-lg bg-white px-6 shadow-md md:h-14">
        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                linkClass,
                index === 0 &&
                  "text-[#1d9bb8] underline decoration-2 underline-offset-4"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src={Wanderlast}
            alt="Wanderlast"
            className="h-6 w-auto md:h-7"
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <Link href="#profile" className={cn(linkClass, "flex items-center gap-1.5")}>
            <User className="size-4" data-icon="inline-start" />
            Profile
          </Link>
          {authLinks.map((link) => (
            <Link key={link.label} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="text-neutral-900 lg:hidden"
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <div
        className={cn(
          "mx-auto mt-2 max-w-[1400px] rounded-lg bg-white p-4 shadow-md lg:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-1">
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-3 py-2 text-[15px] font-semibold hover:bg-muted",
                index === 0 ? "text-[#1d9bb8]" : "text-neutral-900"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-1.5 rounded-md px-3 py-2 text-[15px] font-semibold text-neutral-900 hover:bg-muted"
          >
            <User className="size-4" data-icon="inline-start" />
            Profile
          </Link>
        </nav>
        <div className="mt-2 flex gap-4 border-t border-border pt-3">
          {authLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="px-3 py-1 text-[15px] font-semibold text-neutral-900 hover:text-[#1d9bb8]"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
