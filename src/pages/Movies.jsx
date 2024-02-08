import React, { Suspense } from "react";
import { Await, defer, useLoaderData, useSearchParams } from "react-router-dom";
import { getPopularMovies } from "../api";
import CardContainer from "../components/CardContainer";
import Pagination from '@mui/material/Pagination';
import Loading from "../components/Loading";

export function loader({ request }) {
    const page = new URL(request.url).searchParams.get('page');
    return defer({ movies: getPopularMovies(page) })
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