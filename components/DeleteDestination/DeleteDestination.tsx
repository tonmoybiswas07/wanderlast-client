
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { authClient } from "@/lib/auth-client";

const DeleteDestination = ({ _id }: { _id: string }) => {
    console.log(_id)
  const router = useRouter();
  const [loading, setLoading] = useState(false);

 const handleDeleteDestination = async () => {
  const { data, error } = await authClient.token()
  
    const jwtToken = data?.token
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URI}/destinations/${_id}`,
      {
        method: "DELETE",
        headers:{
Authorization: `Bearer ${jwtToken}`
        }
      },
     
    );

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Delete failed");
    }

    console.log(data.message);

    router.push("/destinations");
    router.refresh();
  } catch (error) {
    console.error("Delete error:", error);
  }
};

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <button className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600">
            Delete Destination
          </button>
        }
      />

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure?
          </AlertDialogTitle>

          <AlertDialogDescription>
            This action cannot be undone. This will permanently
            delete this destination from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDeleteDestination}
            disabled={loading}
            className="bg-red-500 hover:bg-red-600"
          >
            {loading ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDestination;
