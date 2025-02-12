import { useEffect } from "react";
import {
  Link,
  Outlet,
  createRouter,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import Navbar from "@/components/navbar";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";

interface RootContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootComponent,
});

function RootComponent() {
  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_API_URL;
    axios.defaults.withCredentials = true;
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="min-h-[90vh] flex flex-col items-center justify-center">
        <Outlet />
      </div>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
