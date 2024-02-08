import React from "react";
import { getPopularMovies, getPopularTvShows, getTrending } from "../api";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import CardSlider from "../components/CardSlider";
import MyCarousel from "../components/MyCarousel";
import Loading from "../components/Loading";

export function loader() {
    return defer({
        popularMovies: getPopularMovies(1),
        PopularTvShows: getPopularTvShows(1),
        Trending: getTrending()
    })
}

export default function Home() {
    const data = useLoaderData();
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Await resolve={data.Trending}>
                    {(Trending) => (
                        <MyCarousel data={Trending.results} />
                    )}
                </Await>
                <Await resolve={data.popularMovies}>
                    {(popularMovies) => (
                        <CardSlider data={popularMovies.results} title={"Popular Movies"} seeMore={"/movies?page=1"} toLink={"/movie/"} />
                    )}
                </Await>
                <Await resolve={data.PopularTvShows}>
                    {(PopularTvShows) => (
                        <CardSlider data={PopularTvShows.results} title={"Popular Tv Shows"} seeMore={"/tv-shows?page=1"} toLink={"/tv/"} />
                    )}
                </Await>
            </Suspense>
        </>
    )
}