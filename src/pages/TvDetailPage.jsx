import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import React, { Suspense, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import { Await, Link, defer, useLoaderData } from "react-router-dom";
import { getTvCredits, getTvDetails, getTvTrailer, getTvRecommendations } from "../api";
import Loading from "../components/Loading";
import "./detailpage.css";
import fallbackImage from "/assets/images/Image-not-found.png";
import CastContainer from '../components/CastComponent';
import CardScroller from '../components/CardScroller';

export function loader({ params }) {
    return defer({
        tvShow: getTvDetails(params.id),
        credits: getTvCredits(params.id),
        trailer: getTvTrailer(params.id),
        recom: getTvRecommendations(params.id)
    })
}

export default function TvDetailPage() {
    const data = useLoaderData()
    const [listStatus, setListStatus] = useState(true);

    const handleWatchlistAdd = (id) => {
        let tvList = [];
        tvList = JSON.parse(localStorage.getItem("tvList")) || [];
        if (tvList.includes(id)) {
            tvList = tvList.filter(listId => listId !== id)
        } else {
            tvList.push(id)
        }
        setListStatus(prev => !prev)
        localStorage.setItem("tvList", JSON.stringify(tvList))
    }

    // console.log(JSON.parse(localStorage.getItem("tvList")))

    return (
        <>
            <Suspense fallback={<Loading />}>
                <Await resolve={Promise.all([data.tvShow, data.credits, data.trailer, data.recom]).then(value => value)}>
                    {(data) => {
                        let [tvShow, credits, trailer, recom] = data
                        trailer = trailer?.results?.filter(vid => vid.name.includes(`Official Trailer`))

                        useEffect(() => {
                            const tvList = JSON.parse(localStorage.getItem("tvList"));
                            if (tvList?.includes(tvShow.id)) {
                                setListStatus(false);
                            }
                        }, [])

                        return (
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
                                            <p className="detail-date">Released : {new Date(tvShow.first_air_date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                                            <div className="genres-div">
                                                {tvShow.genres.map((genre, index) => (
                                                    <p key={index}>{genre.name}</p>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="left-div-5">
                                            {
                                                tvShow.created_by.length > 0 &&
                                                <p>Created By : {tvShow.created_by.map((person) => person.name).join(", ")}</p>
                                            }
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
                                                    <Button onClick={() => handleWatchlistAdd(tvShow.id)} variant="outline-light">{listStatus ? "Add to Watchlist" : "Remove from watchlist"}</Button>
                                                    {
                                                        trailer.length >= 1 ?
                                                            <Link to={`https://www.youtube.com/watch?v=${trailer[trailer.length - 1].key}`} target="_blank">
                                                                <Button variant="outline-light">Trailer</Button>
                                                            </Link>
                                                            :
                                                            <></>
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="left-div-4">
                                            {
                                                tvShow.overview &&
                                                <>
                                                    <h3>Description</h3>
                                                    <p className="description">{tvShow.overview}</p>
                                                </>
                                            }
                                        </div>

                                    </div>
                                    <div className="right-div">

                                        <div className="image-div">
                                            {
                                                tvShow.poster_path ?
                                                    <img className="detail-image" src={`https://image.tmdb.org/t/p/original${tvShow.poster_path}`} alt="" />
                                                    :
                                                    <img className="detail-image" src={fallbackImage} alt="" />
                                            }
                                        </div>

                                    </div>
                                </div>
                                <div className='cast-container-div'>
                                    <CastContainer cast={credits.cast} />
                                </div>
                                <div className='recommendation-div'>
                                    <CardScroller data={recom.results} toLink="/tv/" />
                                </div>
                            </>
                        )
                    }
                    }
                </Await>
            </Suspense>
        </>
    )
}