
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  UserRound,
  Camera,
  ArrowLeft,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Sparkles,
  Compass,
  Globe2,
  RotateCcw,
  ArrowUpRight,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );
  const [imageError, setImageError] = useState(false);

  // Load current user information
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImage(user.image || "");
      setImageError(false);
    }
  }, [user?.id, user?.name, user?.image]);

  // Validate URL and check whether the image actually loads
  const validateImage = (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new window.Image();

      img.onload = () => {
        resolve(img.naturalWidth > 0 && img.naturalHeight > 0);
      };

      img.onerror = () => resolve(false);

      img.src = url;
    });
  };

  // Update Profile
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");

    if (!name.trim()) {
      setMessage("Please enter your name.");
      setMessageType("error");
      return;
    }

    const imageUrl = image.trim();
    const currentImage = user?.image || "";

    if (imageUrl) {
      try {
        const url = new URL(imageUrl);

        if (!["http:", "https:"].includes(url.protocol)) {
          throw new Error("Invalid URL");
        }
      } catch {
        setMessage("Please enter a valid image URL.");
        setMessageType("error");
        return;
      }

      // Validate only when the image URL has changed
      if (imageUrl !== currentImage) {
        setSaving(true);

        const isValidImage = await validateImage(imageUrl);

        if (!isValidImage) {
          setSaving(false);
          setImageError(true);
          setMessage("Unable to load image. Please use a valid image URL.");
          setMessageType("error");
          return;
        }
      }
    }

    try {
      setSaving(true);

      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: imageUrl || null,
      });

      if (error) {
        throw new Error(error.message || "Failed to update profile.");
      }

      setImageError(false);
      setMessage("Your profile has been updated successfully!");
      setMessageType("success");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  // Reset changes
  const handleReset = () => {
    setName(user?.name || "");
    setImage(user?.image || "");
    setImageError(false);
    setMessage("");
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f9fa]">
        <Loader2 className="size-9 animate-spin text-[#1d9bb8]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-5 bg-[#f5f9fa]">
        <div className="flex size-20 items-center justify-center rounded-3xl bg-[#e2f4f7]">
          <UserRound className="size-10 text-[#1d9bb8]" />
        </div>

        <h2 className="text-2xl font-bold text-neutral-900">
          Welcome to Wanderlast
        </h2>

        <p className="text-neutral-500">
          Please sign in to view your profile.
        </p>

        <Link
          href="/auth/signin"
          className="rounded-xl bg-[#1d9bb8] px-7 py-3 font-bold text-white transition hover:bg-[#167f99]"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const displayName = name.trim() || "Your Name";
  const hasImage = Boolean(image.trim()) && !imageError;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f5f9fa] px-4 pt-28 pb-16 md:px-8">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute top-20 -right-32 size-96 rounded-full bg-[#1d9bb8]/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-32 size-96 rounded-full bg-cyan-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">

        {/* Top Navigation */}
        <div className="mb-9 flex items-center justify-between">
          <Link
            href="/"
            className="group flex items-center gap-2 text-sm font-semibold text-neutral-500 transition hover:text-[#1d9bb8]"
          >
            <ArrowLeft className="size-4 transition group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-[#1d9bb8]/15 bg-white px-4 py-2 text-xs font-bold text-[#1d9bb8] shadow-sm">
            <Sparkles className="size-4" />
            TRAVELER ACCOUNT
          </div>
        </div>

        {/* Heading */}
        <div className="mb-9">
          <p className="mb-3 text-xs font-extrabold tracking-[4px] text-[#1d9bb8]">
            YOUR PERSONAL SPACE
          </p>

          <h1 className="text-4xl font-black tracking-tight text-[#142b36] md:text-5xl">
            Your Journey,
            <span className="block text-[#1d9bb8]">
              Your Identity.
            </span>
          </h1>

          <p className="mt-4 max-w-lg text-sm leading-7 text-neutral-500 md:text-base">
            Make your travel identity yours. Update your name and profile
            picture to personalize your Wanderlast experience.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid items-start gap-7 lg:grid-cols-[0.85fr_1.35fr]">

          {/* Profile Preview Card */}
          <section className="overflow-hidden rounded-[28px] bg-[#123744] shadow-2xl shadow-[#123744]/10">

            {/* Cover */}
            <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#126d83] via-[#1d9bb8] to-[#6dc6d4] p-7">
              <div className="absolute -top-16 -right-12 size-64 rounded-full border border-white/15" />
              <div className="absolute -top-7 -right-3 size-44 rounded-full border border-white/15" />
              <div className="absolute -bottom-20 -left-12 size-48 rounded-full bg-white/10" />

              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold tracking-[3px] text-white/70">
                    WANDERLAST
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-white">
                    Traveler Card
                  </h2>
                </div>

                <div className="rounded-2xl border border-white/20 bg-white/15 p-3 backdrop-blur-md">
                  <Compass className="size-7 text-white" />
                </div>
              </div>

              <Globe2 className="absolute right-8 bottom-5 size-20 text-white/20" />
            </div>

            {/* User Information */}
            <div className="relative px-7 pb-8">

              {/* Avatar */}
              <div className="-mt-[68px] mb-5 flex items-end justify-between">
                <div className="relative flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-[30px] border-[5px] border-[#123744] bg-[#e3f5f7] shadow-xl">
                  {hasImage ? (
                    <img
                      src={image.trim()}
                      alt="Traveler profile"
                      onError={() => setImageError(true)}
                      className="size-full object-cover"
                    />
                  ) : (
                    <UserRound className="size-14 text-[#1d9bb8]" />
                  )}
                </div>

                <div className="mb-2 flex items-center gap-1.5 rounded-full bg-[#1d9bb8]/20 px-3 py-2 text-xs font-bold text-[#8de8f5]">
                  <span className="size-2 rounded-full bg-[#62e6b2]" />
                  Active Traveler
                </div>
              </div>

              <p className="mb-2 text-xs font-bold tracking-[2px] text-[#72c8d7]">
                HELLO, TRAVELER
              </p>

              <h2 className="break-words text-3xl font-black text-white">
                {displayName}
              </h2>

              <p className="mt-2 break-all text-sm text-white/55">
                {user.email}
              </p>

              <div className="my-7 h-px bg-white/10" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-[2px] text-white/40">
                    MEMBER OF
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">
                    Wanderlast Community
                  </p>
                </div>

                <div className="flex size-11 items-center justify-center rounded-2xl bg-white/10">
                  <Compass className="size-5 text-[#72c8d7]" />
                </div>
              </div>

              <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-white/70">
                  <Sparkles className="size-4 text-[#72c8d7]" />
                  YOUR NEXT ADVENTURE STARTS HERE
                </div>
              </div>
            </div>
          </section>

          {/* Edit Profile */}
          <section className="rounded-[28px] border border-neutral-100 bg-white p-6 shadow-xl shadow-slate-200/40 md:p-9">

            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="mb-2 text-xs font-bold tracking-[2px] text-[#1d9bb8]">
                  PERSONAL SETTINGS
                </p>

                <h2 className="text-2xl font-black text-[#142b36]">
                  Edit Profile
                </h2>

                <p className="mt-2 text-sm text-neutral-400">
                  Make your profile stand out.
                </p>
              </div>

              <div className="flex size-12 items-center justify-center rounded-2xl bg-[#e8f7f9]">
                <Camera className="size-6 text-[#1d9bb8]" />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">

              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-3 block text-sm font-bold text-[#263d46]"
                >
                  Your Name
                </label>

                <div className="group relative">
                  <UserRound className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-neutral-400 transition group-focus-within:text-[#1d9bb8]" />

                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setMessage("");
                    }}
                    placeholder="Enter your full name"
                    required
                    maxLength={100}
                    className="w-full rounded-2xl border border-neutral-200 bg-[#f8fafb] py-4 pr-4 pl-12 text-sm font-medium text-[#142b36] outline-none transition placeholder:text-neutral-400 focus:border-[#1d9bb8] focus:bg-white focus:ring-4 focus:ring-[#1d9bb8]/10"
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label
                  htmlFor="image"
                  className="mb-3 block text-sm font-bold text-[#263d46]"
                >
                  Profile Image URL
                </label>

                <div className="group relative">
                  <ImageIcon className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-neutral-400 transition group-focus-within:text-[#1d9bb8]" />

                  <input
                    id="image"
                    type="url"
                    value={image}
                    onChange={(e) => {
                      setImage(e.target.value);
                      setImageError(false);
                      setMessage("");
                    }}
                    placeholder="https://your-image-url.com/photo.jpg"
                    className="w-full rounded-2xl border border-neutral-200 bg-[#f8fafb] py-4 pr-4 pl-12 text-sm font-medium text-[#142b36] outline-none transition placeholder:text-neutral-400 focus:border-[#1d9bb8] focus:bg-white focus:ring-4 focus:ring-[#1d9bb8]/10"
                  />
                </div>

                <p className="mt-3 text-xs leading-5 text-neutral-400">
                  Paste a publicly accessible image URL. Your profile
                  preview will update automatically.
                </p>

                {/* Live Preview */}
                <div className="mt-5 rounded-2xl border border-dashed border-[#1d9bb8]/30 bg-[#f2fafb] p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
                      {hasImage ? (
                        <img
                          src={image.trim()}
                          alt="Image preview"
                          onError={() => setImageError(true)}
                          className="size-full object-cover"
                        />
                      ) : (
                        <UserRound className="size-8 text-[#1d9bb8]" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-bold text-[#263d46]">
                        Image Preview
                      </p>

                      <p className="mt-1 text-xs text-neutral-400">
                        {imageError
                          ? "Unable to load this image."
                          : image.trim()
                            ? "Your new profile picture is ready."
                            : "No profile image selected."}
                      </p>
                    </div>

                    <div className="ml-auto">
                      <Camera className="size-5 text-[#1d9bb8]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Read-only Email */}
              <div>
                <label className="mb-3 block text-sm font-bold text-[#263d46]">
                  Email Address
                </label>

                <div className="flex items-center gap-3 rounded-2xl border border-neutral-100 bg-neutral-100/70 px-4 py-4">
                  <Globe2 className="size-5 shrink-0 text-neutral-400" />

                  <span className="truncate text-sm text-neutral-500">
                    {user.email}
                  </span>

                  <span className="ml-auto text-[10px] font-bold tracking-wider text-neutral-400 uppercase">
                    Read only
                  </span>
                </div>
              </div>

              {/* Success / Error Message */}
              {message && (
                <div
                  role={messageType === "error" ? "alert" : "status"}
                  aria-live="polite"
                  className={`flex items-start gap-3 rounded-2xl p-4 text-sm font-semibold ${
                    messageType === "success"
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {messageType === "success" ? (
                    <CheckCircle2 className="size-5 shrink-0" />
                  ) : (
                    <AlertCircle className="size-5 shrink-0" />
                  )}

                  {message}
                </div>
              )}

              {/* Buttons */}
              <div className="flex flex-col gap-3 border-t border-neutral-100 pt-6 sm:flex-row">

                <button
                  type="button"
                  onClick={handleReset}
                  disabled={saving}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-neutral-200 px-5 py-4 text-sm font-bold text-neutral-600 transition hover:bg-neutral-50 disabled:opacity-50"
                >
                  <RotateCcw className="size-4" />
                  Reset
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="group flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#1d9bb8] px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-[#1d9bb8]/20 transition hover:-translate-y-0.5 hover:bg-[#167f99] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving ? (
                    <>
                      <Loader2 className="size-5 animate-spin" />
                      Saving Changes...
                    </>
                  ) : (
                    <>
                      <Save className="size-5" />
                      Save Changes
                      <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-9 flex flex-col items-center justify-between gap-3 border-t border-neutral-200/70 pt-6 text-xs text-neutral-400 sm:flex-row">
          <p>© 2026 Wanderlast. Explore the world your way.</p>

          <div className="flex items-center gap-2">
            <Globe2 className="size-4 text-[#1d9bb8]" />
            Made for travelers, everywhere.
          </div>
        </div>
      </div>
    </main>
  );
}
