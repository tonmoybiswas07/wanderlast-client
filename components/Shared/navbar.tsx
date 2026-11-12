
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, User, LogOut } from "lucide-react";

import { cn } from "@/lib/utils";
import Wanderlast from "@/app/images/Wanderlast.png";
import { authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Add Destination", href: "/add-destination" },
  { label: "My Bookings", href: "/my-bookings" },
];

const authLinks = [
  { label: "Login", href: "/auth/signin" },
  { label: "Sign Up", href: "/auth/signup" },
];

const linkClass =
  "text-[15px] font-semibold text-neutral-900 transition-colors hover:text-[#1d9bb8]";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    try {
      setSigningOut(true);

      await authClient.signOut();

      setOpen(false);
      router.push("/auth/signin");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setSigningOut(false);
    }
  };

  const profileLink = (
    <Link
      href="/profile"
      onClick={() => setOpen(false)}
      className={cn(linkClass, "flex items-center gap-1.5")}
    >
      <User className="size-4" />
      Profile
    </Link>
  );

  const signOutButton = (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={signingOut}
      className="flex items-center gap-2 rounded-md px-3 py-2 text-[15px] font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <LogOut className="size-4" />
      {signingOut ? "Signing Out..." : "Sign Out"}
    </button>
  );

  return (
    <header className="absolute inset-x-0 top-4 z-50 px-4 md:px-6">
      <div className="relative mx-auto flex h-12 max-w-[1400px] items-center justify-between rounded-lg bg-white px-6 shadow-md md:h-14">

        {/* Desktop Navigation */}
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

        {/* Logo */}
        <Link
          href="/"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <Image
            src={Wanderlast}
            alt="Wanderlast"
            className="h-6 w-auto md:h-7"
            priority
          />
        </Link>

        {/* Desktop Auth */}
        <div className="hidden items-center gap-5 lg:flex">
          {!isPending && (
            user ? (
              <>
                {profileLink}
                {signOutButton}
              </>
            ) : (
              authLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className={linkClass}
                >
                  {link.label}
                </Link>
              ))
            )
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="text-neutral-900 lg:hidden"
        >
          {open ? (
            <X className="size-6" />
          ) : (
            <Menu className="size-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
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

          {!isPending && (
            user ? (
              <div className="mt-2 flex flex-col gap-1 border-t border-border pt-3">
                {profileLink}
                {signOutButton}
              </div>
            ) : (
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
            )
          )}
        </nav>
      </div>
    </header>
  );
}
