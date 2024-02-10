import React, { Suspense } from "react";
import { getTvDetails } from "../api";
import { Await, defer, useLoaderData } from "react-router-dom";
import Loading from "../components/Loading";
import "./detailpage.css";
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import Button from 'react-bootstrap/Button';

export function loader({ params }) {
    return defer({ tvShow: getTvDetails(params.id) })
}

export default function TvDetailPage() {
    const data = useLoaderData()

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Await resolve={data.tvShow}>
                    {(tvShow) => (
                        <>
                            <div className="mob-img">
                                <img src={`https://image.tmdb.org/t/p/original${tvShow.backdrop_path}`} alt="" />
                            </div>
                            <div className="big-container">
                                <div className="left-div">

                                    <div className="left-div-1">
                                        <h1 className="detail-name">{tvShow.name}</h1>
                                        <p className="detail-tagline">{tvShow.tagline}</p>
                                    </div>

                                    <div className="left-div-2">
                                        <p className="detail-date">Released : {new Date(tvShow.first_air_date).toLocaleDateString('en-US',{ day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                        <div className="genres-div">
                                            {tvShow.genres.map((genre, index) => (
                                                <p key={index}>{genre.name}</p>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="left-div-3">
                                        <div className="rating-btn-div">
                                            <div className="rating-div">
                                                <div>
                                                    <GradeRoundedIcon />
                                                </div>
                                                <p className="rating">{Math.round((tvShow.vote_average / 2) * 10) / 10}/5</p>
                                            </div>
                                            <div className="btn-div">
                                                <Button variant="outline-light">Add to Watchlist</Button>
                                                <Button variant="outline-light">Trailer</Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="left-div-4">
                                        <h3>Description</h3>
                                        <p className="description">{tvShow.overview}</p>
                                    </div>

                                </div>
                                <div className="right-div">

                                    <div className="image-div">
                                        <img className="detail-image" src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`} alt="" />
                                    </div>

                                </div>
                            </div>
                        </>
                    )}
                </Await>
            </Suspense>
        </>
    )
}