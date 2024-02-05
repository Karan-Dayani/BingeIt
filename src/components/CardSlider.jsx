import React, { useRef } from "react";
import "./cardslider.css";
import { Link } from "react-router-dom";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';

export default function CardSlider({ data, title, seeMore }) {

    const ref = useRef(null);

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
    };

    return (
        <>
            <div className="card-slider-title-div">
                <h1 className="card-slider_title">{title}</h1>
                <Link to={seeMore} className="card-slider_see-more">More...</Link>
            </div>
            <div className="card-slider-w-btn">
                <button onClick={() => scroll(-200)} className="scroll-btns">
                    <ChevronLeftRoundedIcon fontSize="large" />
                </button>
                <div className="card-slider" ref={ref}>
                    {
                        data.map((item) => (
                            item.poster_path ? (
                                <div key={item.id} className="card-slider_card">
                                    <Link>
                                        <img className="card-slider_card_image" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                                    </Link>
                                </div>
                            ) : <div key={item.id}></div>
                        ))
                    }
                </div>
                <button onClick={() => scroll(200)} className="scroll-btns">
                    <ChevronRightRoundedIcon fontSize="large" />
                </button>
            </div >
        </>
    )
}