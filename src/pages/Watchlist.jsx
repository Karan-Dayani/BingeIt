import React, { Suspense, useState } from "react";
import { getMovieListDetails, getTvListDetails } from "../api";
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import Loading from "../components/Loading";
import CardContainer from "../components/CardContainer";
import "./watchlist.css"

export function loader() {
    return defer({
        movies: getMovieListDetails(JSON.parse(localStorage?.getItem("movieList")) || []),
        tvShows: getTvListDetails(JSON.parse(localStorage?.getItem("tvList")) || [])
    })
}

export default function Watchlist() {
    const data = useLoaderData();
    const [watchlistStatus, setWatchlistStatus] = useState("movie")
    return (
        <>
            <Suspense fallback={<Loading />}>
                <Await resolve={Promise.all([data.movies, data.tvShows]).then(value => value)}>
                    {(data) => {
                        let [movies, tvShows] = data
                        return (
                            <>
                                <div className="watchlist-switch-btn-div">
                                    <button className={`watchlist-switch-btn ${watchlistStatus === "movie" ? "active-list" : null}`} onClick={() => setWatchlistStatus("movie")}>Movies</button>
                                    <button className={`watchlist-switch-btn ${watchlistStatus === "tv" ? "active-list" : null}`} onClick={() => setWatchlistStatus("tv")}>TV Shows</button>
                                </div>

                                <CardContainer data={watchlistStatus === "movie" ? movies : tvShows} toLink={`/${watchlistStatus}/`} />
                            </>
                        )
                    }}
                </Await>
            </Suspense>
        </>
    )
}