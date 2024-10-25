import { lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

const Home = lazy(() => import("../screen/Home"));
const Login = lazy(() => import("../screen/Login"));
const Chat = lazy(() => import("../screen/Chat"));

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
    </>
  )
);
