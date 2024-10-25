import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";

export const RegisterCard = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const name = watch("avatar");
  console.log(name);
  

  const handleRegisterForm = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(handleRegisterForm)}>
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a Account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-2">
            <Avatar className="">
              <AvatarImage
                className="w-16 h-16 rounded-full"
                src="https://github.com/shadcn.png"
                alt="@shadcn"
              />
            </Avatar>
            <Input
              {...register("avatar", { required: true })}
              id="picture"
              type="file"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name", { required: true })}
              id="name"
              type="text"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register("username", { required: true })}
              id="username"
              type="text"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="registerPassword">Password</Label>
            <Input
              {...register("password", { required: true })}
              id="password"
              type="password"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              {...register("bio", { required: true })}
              placeholder="Type your message here."
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Create Account
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};
