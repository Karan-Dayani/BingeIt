import React from "react";
import "./cardslider.css";

export default function CardSlider({ data, title }) {
    console.log(data);
    return (
        <>
            <h1 className="card-slider_title">{title}</h1>
            <div className="card-slider">
                {
                    data.map((item) => (
                        <div key={item.id} className="card-slider_card">
                            <img className="card-slider_card_image" src={`https://image.tmdb.org/t/p/original${item.poster_path}`} />
                        </div>
                    ))
                }
            </div>
        </>
    )
}