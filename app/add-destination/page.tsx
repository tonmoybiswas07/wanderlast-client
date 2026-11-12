
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  MapPin,
  Globe,
  Tag,
  Wallet,
  Clock,
  CalendarDays,
  Image as ImageIcon,
  FileText,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { authClient } from "@/lib/auth-client";

const AddDestinationPage = () => {
  const router = useRouter();

  const [category, setCategory] = useState("Beach");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: "",
    text: "",
  });

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setLoading(true);
    setMessage({ type: "", text: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);
    const {data,error} = await authClient.token()
    const token = data?.token
    

    const travelPackage = {
      destination: String(formData.get("destination") || "").trim(),
      country: String(formData.get("country") || "").trim(),
      category,
      price: Number(formData.get("price")),
      duration: String(formData.get("duration") || "").trim(),
      departureDate: String(formData.get("departureDate") || ""),
      imageUrl: String(formData.get("imageUrl") || "").trim(),
      description: String(formData.get("description") || "").trim(),
    };

    try {
      const res = await fetch(
        "http://localhost:8000/add-destination",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:`Bearer ${token}`
          },
          body: JSON.stringify(travelPackage),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message || "Failed to add destination."
        );
      }

      setMessage({
        type: "success",
        text: "Travel package added successfully!",
      });

      form.reset();
      setCategory("Beach");

      // Redirect after successful submission
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1200);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-12 rounded-xl border-gray-200 bg-gray-50/70 px-4 text-sm shadow-none transition-all focus-visible:border-[#1ba0b9] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#1ba0b9]/15";

  const labelClass =
    "mb-2 block text-sm font-semibold text-gray-700";

  return (
    <main className="min-h-screen bg-[#f7f9fc] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="mx-auto max-w-6xl">

        {/* Back Button */}
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#1ba0b9]"
        >
          <ArrowLeft size={17} />
          Back
        </button>

        {/* Page Heading */}
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[#1ba0b9]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#168ba2]">
              <Sparkles size={14} />
              Destination Management
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
              Add New Destination
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
              Create an amazing travel package and share a
              new destination with your travelers.
            </p>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-4 py-3 shadow-sm">
            <div className="flex size-11 items-center justify-center rounded-xl bg-[#1ba0b9]/10 text-[#1ba0b9]">
              <MapPin size={21} />
            </div>
            <div>
              <p className="text-xs text-gray-400">
                New Package
              </p>
              <p className="text-sm font-bold text-gray-800">
                Destination Form
              </p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.04)]">

          {/* Card Header */}
          <div className="border-b border-gray-100 px-6 py-6 sm:px-9">
            <h2 className="text-lg font-bold text-gray-900">
              Package Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the details below to create your travel package.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-9">

            {/* Basic Information */}
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-50 text-[#1ba0b9]">
                  <MapPin size={19} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    Basic Information
                  </h3>
                  <p className="text-xs text-gray-400">
                    General details about the destination
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* Destination */}
                <div className="space-y-1 md:col-span-2">
                  <Label htmlFor="destination" className={labelClass}>
                    Destination Name <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="destination"
                      name="destination"
                      placeholder="e.g. Bali Paradise"
                      required
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="space-y-1">
                  <Label htmlFor="country" className={labelClass}>
                    Country <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="country"
                      name="country"
                      placeholder="e.g. Indonesia"
                      required
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Category */}
                <div className="space-y-1">
                  <Label className={labelClass}>
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={category}
                    onValueChange={(value) => setCategory(value || "")}
                  >
                    <SelectTrigger className={`${inputClass} w-full`}>
                      <div className="flex items-center gap-3">
                        <Tag size={16} className="text-gray-400" />
                        <SelectValue placeholder="Select category" />
                      </div>
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem value="Beach">Beach</SelectItem>
                      <SelectItem value="Mountain">Mountain</SelectItem>
                      <SelectItem value="Adventure">Adventure</SelectItem>
                      <SelectItem value="City">City</SelectItem>
                      <SelectItem value="Cultural">Cultural</SelectItem>
                      <SelectItem value="Nature">Nature</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="my-8 border-t border-dashed border-gray-200" />

            {/* Package Details */}
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <Wallet size={19} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    Package Details
                  </h3>
                  <p className="text-xs text-gray-400">
                    Set the price, duration and departure date
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* Price */}
                <div className="space-y-1">
                  <Label htmlFor="price" className={labelClass}>
                    Price (USD) <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Wallet className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="1"
                      placeholder="e.g. 1299"
                      required
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Duration */}
                <div className="space-y-1">
                  <Label htmlFor="duration" className={labelClass}>
                    Duration <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Clock className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="duration"
                      name="duration"
                      placeholder="e.g. 7 Days / 6 Nights"
                      required
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>

                {/* Departure Date */}
                <div className="space-y-1 md:col-span-2">
                  <Label htmlFor="departureDate" className={labelClass}>
                    Departure Date <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <CalendarDays className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="departureDate"
                      name="departureDate"
                      type="date"
                      required
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="my-8 border-t border-dashed border-gray-200" />

            {/* Media & Description */}
            <div className="mb-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                  <ImageIcon size={19} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    Media & Description
                  </h3>
                  <p className="text-xs text-gray-400">
                    Add a destination image and description
                  </p>
                </div>
              </div>

              <div className="space-y-6">

                {/* Image URL */}
                <div className="space-y-1">
                  <Label htmlFor="imageUrl" className={labelClass}>
                    Image URL <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
                    <Input
                      id="imageUrl"
                      name="imageUrl"
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      required
                      className={`${inputClass} pl-11`}
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    Use a publicly accessible image URL.
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <Label htmlFor="description" className={labelClass}>
                    Description <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <FileText className="absolute left-4 top-4 size-4 text-gray-400" />
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe the destination, attractions, activities and travel experience..."
                      required
                      className="min-h-40 resize-y rounded-xl border-gray-200 bg-gray-50/70 py-4 pl-11 text-sm shadow-none transition-all focus-visible:border-[#1ba0b9] focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-[#1ba0b9]/15"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Feedback Message */}
            {message.text && (
              <div
                className={`mb-6 flex items-center gap-3 rounded-xl border p-4 text-sm ${
                  message.type === "success"
                    ? "border-green-200 bg-green-50 text-green-700"
                    : "border-red-200 bg-red-50 text-red-600"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 size={19} />
                ) : (
                  <AlertCircle size={19} />
                )}
                {message.text}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-7 sm:flex-row sm:justify-end">
              <Button
                type="reset"
                variant="outline"
                disabled={loading}
                onClick={() => {
                  setCategory("Beach");
                  setMessage({ type: "", text: "" });
                }}
                className="h-12 rounded-xl border-gray-200 px-6 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                <Trash2 size={17} />
                Clear Form
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="h-12 rounded-xl bg-[#1ba0b9] px-8 text-sm font-semibold text-white shadow-lg shadow-[#1ba0b9]/15 transition-all hover:bg-[#168ba2] disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Adding Package...
                  </>
                ) : (
                  <>
                    <Save size={18} />
                    Add Travel Package
                  </>
                )}
              </Button>
            </div>

          </form>
        </div>

        {/* Bottom Note */}
        <p className="mt-6 text-center text-xs text-gray-400">
          Make sure all destination information is accurate before publishing.
        </p>
      </div>
    </main>
  );
};

export default AddDestinationPage;
