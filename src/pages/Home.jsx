import React from "react";
import { getPopularMovies, getPopularTvShows } from "../api";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import CardSlider from "../components/CardSlider";

export function loader() {
    return defer({
        popularMovies: getPopularMovies(1),
        PopularTvShows: getPopularTvShows(1)
    })
}

export default function Home() {
    const data = useLoaderData();
    return (
        <>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={data.popularMovies}>
                    {(popularMovies) => (
                        <CardSlider data={popularMovies.results} title={"Popular Movies"} seeMore={"/movies"} />
                    )}
                </Await>
                <Await resolve={data.PopularTvShows}>
                    {(PopularTvShows) => (
                        <CardSlider data={PopularTvShows.results} title={"Popular Tv Shows"} seeMore={"/tv-shows"} />
                    )}
                </Await>
            </Suspense>
        </>
    )
}