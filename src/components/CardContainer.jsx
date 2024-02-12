import React from "react";
import "./cardcontainer.css";
import { Link } from "react-router-dom";
import fallbackImage from "/assets/images/Image-not-found.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function CardContainer({ data, toLink }) {
    return (
        <>
            <div className="card-container">
                {data?.map((item) => (
                    <div key={item.id} className="card-container_card">
                        <Link style={{ textDecoration: "none" }} to={toLink ? toLink + item.id : `/${item.media_type}/${item.id}`}>
                            {
                                item.poster_path ?
                                    <LazyLoadImage
                                        className='card-poster'
                                        alt="image-not-found"
                                        effect="blur"
                                        wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: { transitionDelay: "1s" },
                                        }}
                                        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                                    // <img className='card-poster' src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="image-not-found" />
                                    :
                                    <LazyLoadImage
                                        className='card-poster'
                                        alt="image-not-found"
                                        effect="blur"
                                        wrapperProps={{
                                            // If you need to, you can tweak the effect transition using the wrapper style.
                                            style: { transitionDelay: "1s" },
                                        }}
                                        src={fallbackImage} />
                                // <img className="card-poster" src={fallbackImage} alt="" />
                            }
                            <div className="card-info">
                                <h4 className="card-name">{item.title ? item.title : item.name}</h4>
                                <p className="card-release-date">{item.release_date ? item.release_date : item.first_air_date}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}