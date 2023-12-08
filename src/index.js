import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Admin from "./components/Admin";
import ShowBook from "./components/ShowBook";
import ErrorPage from "./components/ErrorPage";
import QRScanner from "./components/QRScanner";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";

const ShowAdmin = lazy(() => import("./components/ShowAdmin"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin",
        element: <Admin />,
      },
      
      { path: "/showBook/:bookId", element: <ShowBook /> },
      { path: "/qrScanner", element: <QRScanner /> },

      {
        path: "/showAdmin",
        element: (
          <Suspense fallback={<h1>Loading....</h1>}>
            <ShowAdmin />
          </Suspense>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
