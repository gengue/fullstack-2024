import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";
import { loader as tourDetailLoader } from "./routes/trip-page";
import ErrorPage from "./error-page";
import { HomePage } from './routes/home-page';
import { TripPage } from './routes/trip-page';
import { BookingPage } from './routes/booking-page';

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/tours/:id",
        id: "tour-detail",
        element: <TripPage />,
        loader: tourDetailLoader,
      },
      {
        path: "/book/:id",
        id: "booking",
        element: <BookingPage />,
      },
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
