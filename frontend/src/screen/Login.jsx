
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import { RegisterCard } from "../components/RegisterCard";
import { LoginCard } from "../components/LoginCard";

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 mb-5">
          <TabsTrigger value="login" className="py-2">
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className="py-2">
            Register
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginCard />
        </TabsContent>

        <TabsContent value="register">
          <RegisterCard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
