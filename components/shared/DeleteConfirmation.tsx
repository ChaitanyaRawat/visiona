"use client";

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteImage } from "@/lib/actions/image.actions";
import { useTransition } from "react";



export const DeleteConfirmation = ({ imageId }: { imageId: string }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className="rounded-full">
        <button className="w-[130px] inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-xl border-2 border-red-500 hover:bg-red-500 scale-transition-on-hover-110">
          <span className=" px-5 py-2.5 bg-opacity-0 font-bold">
            Delete
          </span>
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="flex flex-col gap-10 bg-black text-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="mx-auto">
            Are you sure you want to delete this image?
          </AlertDialogTitle>
          <AlertDialogDescription className="font-bold text-[16px] leading-[140%] mx-auto">
            The Image will be permanently deleted
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mx-auto">
          <AlertDialogCancel className="bg-black">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="border-2 border-red-600 bg-black text-white hover:bg-red-600"
            onClick={() =>
              startTransition(async () => {
                await deleteImage(imageId);
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};