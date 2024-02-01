import React from "react";
import { getPopularMovies } from "../api";
import { Await, defer, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import CardSlider from "../components/CardSlider";

export function loader() {
    return defer({ popularMovies: getPopularMovies(1) })
}

export default function Home() {
    const data = useLoaderData();
    return (
        <>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={data.popularMovies}>
                    {(popularMovies) => (
                        <CardSlider data={popularMovies.results} title={"Popular Movies"} />
                    )}
                </Await>
            </Suspense>
        </>
    )
}