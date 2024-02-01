import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home, {loader as homeLoader} from "./pages/Home";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import Watchlist from "./pages/Watchlist";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} >
    <Route index element={<Home />} loader={homeLoader} />
    <Route path="/movies" element={<Movies />}  />
    <Route path="/tv-shows" element={<TvShows />}  />
    <Route path="/watchlist" element={<Watchlist />}  />
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}