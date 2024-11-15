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
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const schema = yup
  .object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export const LoginCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((store) => store.user);

  const loginHandler = async (data) => {
    try {
      const response = await dispatch(loginUser(data)).unwrap();
      if (response.success) {
        navigate("/chat");
      }
    } catch (err) {
      console.log("some thinking error on fetching user");

      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading messages...</div>;
  }

  if (error) {
    return <div>Something is wrong with fetching</div>;
  }

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
              {...register("email", { required: true })}
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
