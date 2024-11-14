import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

const ChatList = () => {
  return (
    <ScrollArea className="h-[calc(100vh-4rem)] rounded-md border-r-2 basis-1/4">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, key) => (
          <AvatarList key={key} />
        ))}
      </div>
    </ScrollArea>
  );
};

export const AvatarList = () => {
  return (
    <div
      className="flex px-2 py-4 h-12 gap-3 items-center cursor-pointer hover:bg-slate-200 hover:drop-shadow-md"
      onClick={() => {
        console.log("AvatarList");
      }}
    >
      <Avatar className="h-8 w-8">
        <AvatarImage src="https://github.com/shadcn.png" />
      </Avatar>
      <div>
        <h3 className="text-sm font-semibold">Name</h3>
        <p className="text-xs">Username</p>
      </div>
    </div>
  );
};

export default ChatList;
