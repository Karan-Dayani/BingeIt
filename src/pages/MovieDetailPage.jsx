import React, { Suspense } from "react";
import { getMovieDetails } from "../api";
import { Await, defer, useLoaderData } from "react-router-dom";
import Loading from "../components/Loading";

export function loader({ params }) {
    return defer({ movie: getMovieDetails(params.id) })
}

export default function MovieDetailPage() {
    const data = useLoaderData()

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Await resolve={data.movie}>
                    {(movie) => (
                        <h1>{movie.title}</h1>
                    )}
                </Await>
            </Suspense>
        </>
    )
}