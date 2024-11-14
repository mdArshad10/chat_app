import Header from "../components/Header";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ChatList from "../components/ChatList";
import { ScrollArea } from "@/components/ui/scroll-area";

import { Separator } from "@/components/ui/separator";
import ChatMessageContainer from "../components/chatMessageContainer";

// min-h-[calc(100vh-4rem)]
const ChatScreen = () => {
  return (
    <div className="w-[100%] max-h-[100vh]">
      <Header />
      <main className="flex">
        <ChatList />
        <ChatMessageContainer />
      </main>
    </div>
  );
};

export default ChatScreen;
