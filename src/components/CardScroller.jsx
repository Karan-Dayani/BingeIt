import React, { useEffect, useRef } from "react";
import "./cardscroller.css";
import fallbackImage from "/assets/images/Image-not-found.png";
import { Link } from "react-router-dom";

export default function CardScroller({ data, toLink }) {
    if (data.length === 0) {
        return
    }
    data = data.slice(0, 8)

    const divRef = useRef(null);
    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollLeft = 0;
        }
    });
    return (
        <>
            <div className="recommended-container">
                <h1>More like this</h1>
                <div className="slider-div" ref={divRef}>
                    {data?.map((item) => (
                        <Link key={item.id} to={toLink + item.id}>
                            <div className="slider-item">
                                {
                                    item.poster_path ?
                                        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
                                        :
                                        <img src={fallbackImage} alt="" />
                                }
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}