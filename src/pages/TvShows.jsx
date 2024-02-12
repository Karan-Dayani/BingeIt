import React, { Suspense } from "react";
import { getGenres, getTvShows } from "../api";
import { Await, defer, useLoaderData, useSearchParams } from "react-router-dom";
import CardContainer from "../components/CardContainer";
import { Pagination } from "@mui/material";
import Loading from "../components/Loading";
import Filter from "../components/Filter";

export function loader({ request }) {
    const page = new URL(request.url).searchParams.get('page');
    const genres = new URL(request.url).searchParams.get('genres');
    return defer({
        tvShows: getTvShows(page, genres),
        genres: getGenres("tv")
    })
}

export default function TvShows() {
    const data = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page'));

    const handlePageChange = (event, value) => {
        if (searchParams.get("genres")) {
            setSearchParams({ page: value, genres: searchParams.get("genres") });
        } else {
            setSearchParams({ page: value });
        }
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
                <Await resolve={data.tvShows}>
                    {(tvShows) => (
                        <CardContainer data={tvShows.results} toLink={"/tv/"} />
                    )}
                </Await>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBlock: "40px"
                }}>
                    <Pagination
                        count={page + 1}
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