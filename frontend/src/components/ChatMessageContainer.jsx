import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AvatarList } from "./ChatList";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

const ChatMessageContainer = () => {
  const { register, handleSubmit, reset } = useForm();

  const messageHandler = async (data) => {
    // Send the message to the server
    console.log(data);
    reset();
  };

  return (
    <div className="basis-3/4">
      <div className="py-3">header</div>
      <div className="bg-slate-300 h-[85%]"></div>
      <div className="h-[8%] flex justify-center items-center">
        <form
          onSubmit={handleSubmit(messageHandler)}
          className="flex items-center w-full px-5"
        >
          <Input
            type="text"
            {...register("message", { required: true })}
            placeholder="Enter your message"
            className=" w-full px-3 py-2 text-sm rounded-md shadow-sm focus:outline-none"
          />
          <Button type="submit" className="ml-3">
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatMessageContainer;
