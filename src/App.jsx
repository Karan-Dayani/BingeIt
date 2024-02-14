import React from "react";
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home, {loader as homeLoader} from "./pages/Home";
import Movies, {loader as moviesLoader} from "./pages/Movies";
import TvShows, {loader as tvShowsLoader} from "./pages/TvShows";
import MovieDetailPage, {loader as movieDetailLoader} from "./pages/MovieDetailPage";
import TvDetailPage, {loader as tvShowDetailLoader} from "./pages/TvDetailPage";
import Watchlist, {loader as watchlistLoader} from "./pages/Watchlist";
import Search from "./pages/Search";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Layout />} >
    <Route index element={<Home />} loader={homeLoader} />

    <Route path="/movie/:id" element={<MovieDetailPage />} loader={movieDetailLoader} />
    <Route path="/tv/:id" element={<TvDetailPage />} loader={tvShowDetailLoader} />

    <Route path="/movies" element={<Movies />} loader={moviesLoader} />
    <Route path="/tv-shows" element={<TvShows />} loader={tvShowsLoader} />
    <Route path="/search" element={<Search />} />
    <Route path="/watchlist" element={<Watchlist />} loader={watchlistLoader} />
  </Route>
))

export default function App() {
  return (
    <RouterProvider router={router} />
  )
}