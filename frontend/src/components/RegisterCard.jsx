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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { signupUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    name: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    bio: yup.string().required(),
  })
  .required();

export const RegisterCard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((store) => store.user);

  const handleRegisterForm = async (data) => {
    try {
      console.log(selectedFile);
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      const response = await dispatch(
        signupUser({ ...data, avatar: selectedFile })
      ).unwrap();
      console.log(response);

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAvatarImage = (e) => {
    console.log(e.target.files[0]);

    setSelectedFile(e.target.files[0]);
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>Something is wrong with fetching</div>;
  }

  return (
    <form
      onSubmit={handleSubmit(handleRegisterForm)}
      encType="multipart/form-data"
    >
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create a Account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Avatar className="flex justify-center">
            <AvatarImage
              className="w-16 h-16 rounded-full"
              // src={!watch ? "https://github.com/shadcn.png" : watch("avatar")}
              src={"https://github.com/shadcn.png"}
              alt="@shadcn"
            />
          </Avatar>

          <div className="space-y-1">
            <Label htmlFor="name">Name</Label>
            <Input
              {...register("name", { required: true })}
              id="name"
              type="text"
            />
            {errors && <p>{errors.name}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              {...register("username", { required: true })}
              id="username"
              type="text"
            />
            {errors && <p>{errors.username}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email: </Label>
            <Input
              {...register("email", { required: true })}
              id="email"
              type="email"
            />
            {errors && <p>{errors.email}</p>}
          </div>

          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              {...register("password", { required: true })}
              id="password"
              type="password"
            />
            {errors && <p>{errors.password}</p>}
          </div>
          <div className="space-y-1">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              {...register("bio", { required: true })}
              placeholder="Type your message here."
            />
            {errors && <p>{errors.bio}</p>}
          </div>
          <div className="space-y-1">
            <Input
              {...register("avatar", { required: true })}
              type="file"
              id="picture"
              accept="image/*"
              onChange={handleAvatarImage}
            />
            {errors && <p>{errors.root}</p>}
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
