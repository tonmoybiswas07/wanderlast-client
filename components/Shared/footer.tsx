"use client"
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#0c0c0c] px-5 py-12 text-white sm:px-10 lg:px-[5.5%]">
      <div className="mx-auto max-w-[1400px]">

        {/* Brand */}
        <div>
          <h2 className="font-serif text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Wanderlast
          </h2>

          <p className="mt-2 text-sm text-gray-400 sm:text-base">
            Your gateway to extraordinary travel experiences around the world.
          </p>
        </div>

        {/* Footer Links */}
        <div className="mt-11 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase">
              Newsletter
            </h3>

            <p className="mt-1 text-[11px] text-gray-400">
              Subscribe for exclusive travel deals and inspiration.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-3 flex max-w-[280px] items-center bg-[#353535]"
            >
              <input
                type="email"
                placeholder="Enter email"
                required
                className="h-9 w-full min-w-0 bg-transparent px-3 text-xs text-white outline-none placeholder:text-gray-300"
              />

              <button
                type="submit"
                aria-label="Subscribe to newsletter"
                className="flex h-9 w-10 shrink-0 items-center justify-center text-white transition hover:text-[#15cdbb]"
              >
                <ArrowUpRight size={20} />
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-3 text-[13px] text-gray-400">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/destinations" className="transition hover:text-white">
                  Destinations
                </Link>
              </li>

              <li>
                <Link href="/my-bookings" className="transition hover:text-white">
                  My Bookings
                </Link>
              </li>

              <li>
                <Link href="/profile" className="transition hover:text-white">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase">
              Support
            </h3>

            <ul className="mt-4 space-y-3 text-[13px] text-gray-400">
              <li>
                <Link href="/help-center" className="transition hover:text-white">
                  Help Center
                </Link>
              </li>

              <li>
                <Link href="/terms" className="transition hover:text-white">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link href="/privacy" className="transition hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase">
              Contact Us
            </h3>

            <ul className="mt-4 space-y-3 text-[13px] text-gray-400">
              <li>
                <a href="tel:7869011622" className="transition hover:text-white">
                  786 901 1622
                </a>
              </li>

              <li>
                <a
                  href="mailto:info@wandarland.com"
                  className="transition hover:text-white"
                >
                  info@wandarland.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-4 sm:flex-row">

          <p className="text-[11px] text-gray-400">
            © 2026 Wanderlast. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-6">

            {/* X */}
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="text-white transition hover:text-[#15cdbb]"
            >
              <span className="text-xl font-medium">𝕏</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-white transition hover:text-[#15cdbb]"
            >
              {/* <Linkedin size={17} /> */}
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-white transition hover:text-[#15cdbb]"
            >
              {/* <Instagram size={18} /> */}
            </a>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;