import React, { Suspense } from "react";
import { getTvDetails } from "../api";
import { Await, defer, useLoaderData } from "react-router-dom";
import Loading from "../components/Loading";

export function loader({params}) {
    return defer({ tvShow: getTvDetails(params.id)})
}

export default function TvDetailPage() {
    const data = useLoaderData()

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Await resolve={data.tvShow}>
                    {(tvShow) => (
                        <h1>{tvShow.name}</h1>
                    )}
                </Await>
            </Suspense>
        </>
    )
}