import React, { Suspense } from "react";
import { getMovieDetails } from "../api";
import { Await, defer, useLoaderData } from "react-router-dom";

export function loader({ params }) {
    return defer({ movie: getMovieDetails(params.id) })
}

export default function MovieDetailPage() {
    const data = useLoaderData()

    return (
        <>
            <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={data.movie}>
                    {(movie) => (
                        <h1>{movie.title}</h1>
                    )}
                </Await>
            </Suspense>
        </>
    )
}