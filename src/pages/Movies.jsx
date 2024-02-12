import React, { Suspense, useState } from "react";
import { Await, defer, useLoaderData, useSearchParams } from "react-router-dom";
import { getPopularMovies, getGenres } from "../api";
import CardContainer from "../components/CardContainer";
import Pagination from '@mui/material/Pagination';
import Loading from "../components/Loading";
import Filter from "../components/Filter";

export function loader({ request }) {
    const page = new URL(request.url).searchParams.get('page');
    return defer({
        movies: getPopularMovies(page),
        genres: getGenres("movies")
    })
}

export default function Movies() {
    const data = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page'));

    const handlePageChange = (event, value) => {
        setSearchParams({ page: value });
        window.scrollTo(0, 0);
    }

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Await resolve={data.genres}>
                    {(genres) => (
                        <Filter genres={genres.genres} />
                    )}
                </Await>
                <Await resolve={data.movies}>
                    {(movies) => (
                        <CardContainer data={movies.results} toLink={"/movie/"} />
                    )}
                </Await>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBlock: "40px"
                }}>
                    <Pagination
                        count={page + 10}
                        page={page}
                        onChange={handlePageChange}
                        shape="rounded"
                        color="primary"
                    />
                </div>
            </Suspense>
        </>
    )
}