import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

const AvatarDialog = ({}) => {
  return (
    <DialogContent className="bg-white  ">
      <DialogHeader className="grid place-items-center gap-2">
        <DialogTitle>Name</DialogTitle>

        <Avatar className="h-40 w-40">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <DialogDescription>
          Email
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="justify-end">
        <DialogClose asChild>
          <Button type="button" variant="secondary">
            Close
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default AvatarDialog;
