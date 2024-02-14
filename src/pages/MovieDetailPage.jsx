import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import { getMovieCredits, getMovieDetails, getMovieTrailer } from "../api";
import Loading from "../components/Loading";
import "./detailpage.css";
import fallbackImage from "/assets/images/Image-not-found.png";

export function loader({ params }) {
    return defer({
        movie: getMovieDetails(params.id),
        credits: getMovieCredits(params.id),
        trailer: getMovieTrailer(params.id)
    })
}

export default function MovieDetailPage() {
    const data = useLoaderData()
    const [listStatus, setListStatus] = useState(true);

    const handleWatchlistAdd = (id) => {
        let movieList = []
        movieList = JSON.parse(localStorage.getItem("movieList")) || [];
        if (movieList.includes(id)) {
            movieList = movieList.filter(listId => listId !== id)
        } else {
            movieList.push(id)
        }

        setListStatus(prev => !prev)
        localStorage.setItem("movieList", JSON.stringify(movieList))
    }

    // console.log(JSON.parse(localStorage.getItem("movieList")))

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Await resolve={Promise.all([data.movie, data.credits, data.trailer]).then(value => value)}>
                    {(data) => {
                        let [movie, credits, trailer] = data
                        trailer = trailer?.results?.filter(vid => vid.name.includes(`Official Trailer`))

                        useEffect(() => {
                            const movieList = JSON.parse(localStorage.getItem("movieList"));
                            if(movieList?.includes(movie.id)) {
                                setListStatus(false);
                            }
                        },[])

                        return (
                            <>
                                <div className="mob-img">
                                    <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt="" />
                                </div>
                                <div className="big-container">
                                    <div className="left-div">

                                        <div className="left-div-1">
                                            <h1 className="detail-name">{movie.title}</h1>
                                            <p className="detail-tagline">{movie.tagline}</p>
                                        </div>

                                        <div className="left-div-2">
                                            <p className="detail-date">Released : {new Date(movie.release_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                            <div className="genres-div">
                                                {movie.genres.map((genre, index) => (
                                                    <p key={index}>{genre.name}</p>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="left-div-5">
                                            <p>Directed By : {
                                                credits?.crew?.filter((person) => person.job === "Director").map((d) => (
                                                    d.job === "Director" ? d.name : ""
                                                )).join(", ")
                                            }</p>
                                        </div>

                                        <div className="left-div-3">
                                            <div className="rating-btn-div">
                                                <div className="rating-div">
                                                    <div>
                                                        <GradeRoundedIcon />
                                                    </div>
                                                    <p className="rating">{Math.round((movie.vote_average / 2) * 10) / 10}/5</p>
                                                </div>
                                                <div className="btn-div">
                                                    <Button onClick={() => handleWatchlistAdd(movie.id)} variant="outline-light">{listStatus ? "Add to Watchlist" : "Remove from watchlist"}</Button>
                                                    {
                                                        trailer.length >= 1 ?
                                                            <Link to={`https://www.youtube.com/watch?v=${trailer[trailer.length-1]?.key}`} target="_blank">
                                                                < Button variant="outline-light">
                                                                    Trailer
                                                                </Button>
                                                            </Link>
                                                            :
                                                            <></>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="left-div-4">
                                            {
                                                movie.overview &&
                                                <>
                                                    <h3>Description</h3>
                                                    <p className="description">{movie.overview}</p>
                                                </>
                                            }
                                        </div>

                                    </div>
                                    <div className="right-div">

                                        <div className="image-div">
                                            {
                                                movie.poster_path ?
                                                    <img className="detail-image" src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt="" />
                                                    :
                                                    <img className="detail-image" src={fallbackImage} alt="" />
                                            }
                                        </div>

                                    </div>
                                </div >
                            </>
                        )
                    }}
                </Await >
            </Suspense >
        </>
    )
}