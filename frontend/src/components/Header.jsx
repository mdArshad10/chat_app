import React, { useState } from "react";
import { Button } from "./ui/button";
import { FaBell } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useMediaQuery } from "@uidotdev/usehooks";
import AvatarDialog from "./AvatarDialog";
import SearchChat from "./SearchChat";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <header className="flex items-center justify-between border-b-2 py-3 px-6">
      <Dialog>
        <DialogTrigger className="flex items-center justify-center gap-3">
          <FiSearch /> Search
        </DialogTrigger>
        <SearchChat />
      </Dialog>

      <div>
        <h1>BuzzChat</h1>
      </div>

      <div className="flex items-center gap-3">
        <div>
          <FaBell />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline">Open</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white relative">
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <AvatarDialog />
              </Dialog>
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => console.log("logout the user")}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
