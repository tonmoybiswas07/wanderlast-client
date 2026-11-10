"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { FormEvent, ChangeEvent } from "react";

import type { Destination } from "../DestinationCard/DestinationCard";

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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Save, Loader2 } from "lucide-react";

// Support both MongoDB field names and Details page aliases
type DestinationFormData = Destination & {
  name?: string;
  location?: string;
  image?: string;
  overview?: string;
};

interface EditDestinationDialogProps {
  destination: Destination;
}

const EditDestinationDialog = ({
  destination,
}: EditDestinationDialogProps) => {
  const router = useRouter();

  const currentDestination =
    destination as DestinationFormData;

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    destination:
      currentDestination.destination ||
      currentDestination.name ||
      "",
    country:
      currentDestination.country ||
      currentDestination.location ||
      "",
    category: currentDestination.category || "",
    price: String(currentDestination.price ?? ""),
    duration: currentDestination.duration || "",
    departureDate:
      currentDestination.departureDate?.slice(0, 10) || "",
    imageUrl:
      currentDestination.imageUrl ||
      currentDestination.image ||
      "",
    description:
      currentDestination.description ||
      currentDestination.overview ||
      "",
  });

  // Track open state changes via ref
  const openRef = useRef(false);
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  // Load latest destination data whenever dialog opens
  useEffect(() => {
    if (openRef.current) {
      setFormData({
        destination:
          currentDestination.destination ||
          currentDestination.name ||
          "",
        country:
          currentDestination.country ||
          currentDestination.location ||
          "",
        category: currentDestination.category || "",
        price: String(currentDestination.price ?? ""),
        duration: currentDestination.duration || "",
        departureDate:
          currentDestination.departureDate?.slice(0, 10) || "",
        imageUrl:
          currentDestination.imageUrl ||
          currentDestination.image ||
          "",
        description:
          currentDestination.description ||
          currentDestination.overview ||
          "",
      });

      setError("");
      setSuccess("");
    }
  }, []);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle destination update
  const handleUpdate = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
setSuccess("");

      if (!destination._id) {
        throw new Error("Destination ID not found");
      }

      if (!formData.destination.trim()) {
        throw new Error("Destination name is required");
      }

      const updatedDestination = {
        destination: formData.destination.trim(),
        country: formData.country.trim(),
        category: formData.category,
        price: Number(formData.price),
        duration: formData.duration.trim(),
        departureDate: formData.departureDate,
        imageUrl: formData.imageUrl.trim(),
        description: formData.description.trim(),
      };

      const res = await fetch(
        `http://localhost:8000/destinations/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedDestination),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(
          result.message || "Failed to update destination"
        );
      }

      setSuccess("Destination updated successfully!");

      setOpen(false);

      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <button
          type="button"
          className="rounded-full bg-teal-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-teal-700"
        >
          Edit Destination
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Edit Travel Package
          </DialogTitle>

          <DialogDescription>
            Update your existing destination information.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleUpdate}
          className="space-y-5 py-4"
        >
          {/* Destination Name */}
          <div className="space-y-2">
            <Label htmlFor="destination">
              Destination Name
            </Label>

            <Input
              id="destination"
              name="destination"
              type="text"
              placeholder="Enter destination name"
              value={formData.destination}
              onChange={handleChange}
              required
              className="h-11"
            />
          </div>

          {/* Country and Category */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>

              <Input
                id="country"
                name="country"
                placeholder="Enter country"
                value={formData.country}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label>Category</Label>

              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    category: value || "",
                  }))
                }
              >
                <SelectTrigger className="h-11 w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="Beach">Beach</SelectItem>
                  <SelectItem value="Mountain">
                    Mountain
                  </SelectItem>
                  <SelectItem value="Adventure">
                    Adventure
                  </SelectItem>
                  <SelectItem value="City">City</SelectItem>
                  <SelectItem value="Cultural">
                    Cultural
                  </SelectItem>
                  <SelectItem value="Nature">Nature</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Price and Duration */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Price (USD)</Label>

              <Input
                id="price"
                name="price"
                type="number"
                min="1"
                value={formData.price}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>

              <Input
                id="duration"
                name="duration"
                placeholder="e.g. 5 days"
                value={formData.duration}
                onChange={handleChange}
                required
                className="h-11"
              />
            </div>
          </div>

          {/* Departure Date */}
          <div className="space-y-2">
            <Label htmlFor="departureDate">
              Departure Date
            </Label>

            <Input
              id="departureDate"
              name="departureDate"
              type="date"
              value={formData.departureDate}
              onChange={handleChange}
              required
              className="h-11"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>

            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              placeholder="Enter image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="h-11"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Description
            </Label>

            <Textarea
              id="description"
              name="description"
              placeholder="Enter destination description"
              value={formData.description}
              onChange={handleChange}
              required
              className="min-h-[120px] resize-none"
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Success Message */}
          {success && (
            <p className="rounded-md bg-green-50 p-3 text-sm text-green-600">
              {success}
            </p>
          )}

          {/* Action Buttons */}
          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={loading}
              className="bg-[#1ba0b9] text-white hover:bg-[#168ba2]"
            >
              {loading ? (
                <>
                  <Loader2
                    className="animate-spin"
                    size={18}
                  />
                  Updating...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Update Package
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationDialog;