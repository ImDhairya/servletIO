import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./index.css";
import Login from "./components/Login.jsx";
import Chat from "./components/Chat.jsx";
import Register from "./components/Register.jsx";
import {UserProvider} from "./context/UserContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Base component
    children: [
      // {
      //   path: "/login",
      //   element: <Login />,
      // },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/chat",
        element: <Chat />,
        children: [
          {
            path: "/chat/user",
            element: <div>User Chat</div>, // Define your Chat User component here
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  /*
  {
    path: "/chat",
    element: <Chat />,
    children: [
      {
        path: "/chat/user",
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
   */
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
