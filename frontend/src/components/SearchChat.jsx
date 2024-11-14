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
import { Input } from "./ui/input";

const SearchChat = () => {
  return (
    <DialogContent className="bg-white h-fit max-h-[80%] overflow-auto ">
      <DialogHeader>
        <DialogTitle>Name</DialogTitle>
        <DialogDescription>this is for people search</DialogDescription>
        <form className="flex">
          <Input />
          <Button type="submit">Search</Button>
        </form>
        {Array.from({ length: 50 }).map((item, key) => (
          <h1>Test</h1>
        ))}
      </DialogHeader>
    </DialogContent>
  );
};

export default SearchChat;
