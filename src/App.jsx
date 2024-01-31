import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "./components/Layout";


const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} />
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}