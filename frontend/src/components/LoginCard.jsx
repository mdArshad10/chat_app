import { Label } from "@radix-ui/react-label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export const LoginCard = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  console.log(getValues());

  const loginHandler = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(loginHandler)}>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login the user</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="loginUsername">Email</Label>
            <Input
              {...register("username", { required: true })}
              id="loginUsername"
              type="email"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="loginPassword">password</Label>
            <Input
              {...register("password", { required: true })}
              id="loginPassword"
              type="password"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Login</Button>
        </CardFooter>
      </Card>
    </form>
  );
};
