import React, { Suspense } from "react";
import { getPopularTvShows } from "../api";
import { Await, defer, useLoaderData, useSearchParams } from "react-router-dom";
import CardContainer from "../components/CardContainer";
import { Pagination } from "@mui/material";

export function loader({ request }) {
    const page = new URL(request.url).searchParams.get('page');
    return defer({ tvShows: getPopularTvShows(page) })
}

export default function TvShows() {
    const data = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page'));

    const handlePageChange = (event, value) => {
        setSearchParams({ page: value });
        window.scrollTo(0, 0);
    }

    return (
        <>
            <Suspense fallback={<h1>Loading...</h1>}>
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
                        count={page+10}
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