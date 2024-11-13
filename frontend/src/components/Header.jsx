import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { FaBell } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@uidotdev/usehooks";

const Header = () => {
  return (
    <header className="" >
      <Button></Button>

      <div>
        <h1>BuzzChat</h1>
      </div>

      <div className="">
        <div>
          <FaBell />
        </div>

        <Dialog>
          <DialogTrigger>Open</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you absolutely sure?</DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </header>
  );
};

export default Header;
