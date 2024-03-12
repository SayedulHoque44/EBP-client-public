import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import AuthComponent from "./Auth/AuthComponent.jsx";
import PContext from "./Util/Context/PContext.jsx";
import { router } from "./Util/Router/Router.jsx";
import "./index.css";
import { store } from "./redux/store.js";
// window.global = window;
// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <PContext>
    <Provider store={store}>
      <AuthComponent>
        <QueryClientProvider client={queryClient}>
          <Toaster />
          <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthComponent>
    </Provider>
  </PContext>
);
