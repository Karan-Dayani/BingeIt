import React from "react";
import "./cardcontainer.css";
import { Link } from "react-router-dom";
import fallbackImage from "/assets/images/Image-not-found.png";

export default function CardContainer({ data, toLink }) {
    return (
        <>
            <div className="card-container">
                {data?.map((item) => (
                    <div key={item.id} className="card-container_card">
                        <Link style={{ textDecoration: "none" }} to={toLink ? toLink + item.id : `/${item.media_type}/${item.id}`}>
                            {
                                item.poster_path ?
                                    <img className='card-poster' src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="image-not-found" />
                                    :
                                    <img className="card-poster" src={fallbackImage} alt="" />
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