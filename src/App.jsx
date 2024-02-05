import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home, {loader as homeLoader} from "./pages/Home";
import Movies, {loader as moviesLoader} from "./pages/Movies";
import TvShows, {loader as tvShowsLoader} from "./pages/TvShows";
import Watchlist from "./pages/Watchlist";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} >
    <Route index element={<Home />} loader={homeLoader} />
    <Route path="/movies" element={<Movies />} loader={moviesLoader} />
    <Route path="/tv-shows" element={<TvShows />} loader={tvShowsLoader} />
    <Route path="/watchlist" element={<Watchlist />}  />
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}