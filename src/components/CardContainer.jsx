import React from "react";
import "./cardcontainer.css";
import { Link } from "react-router-dom";

export default function CardContainer({ data, toLink }) {
    return (
        <>
            <div className="card-container">
                {data?.map((item) => (
                    <div key={item.id} className="card-container_card">
                        <Link style={{textDecoration: "none"}} to={toLink+item.id}>
                            <img className='card-poster' src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="image-not-found" />
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