import React, { useRef } from "react";
import "./cardslider.css";
import { Link } from "react-router-dom";
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import fallbackImage from "/assets/images/Image-not-found.png";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function CardSlider({ data, title, seeMore, toLink }) {

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
                            <div key={item.id} className="card-slider_card">
                                <Link to={toLink + item.id}>
                                    {
                                        item.poster_path ?
                                            <LazyLoadImage
                                                className="card-slider_card_image"
                                                alt="image-not-found"
                                                effect="blur"
                                                wrapperProps={{
                                                    // If you need to, you can tweak the effect transition using the wrapper style.
                                                    style: { transitionDelay: "0.3s" },
                                                }}
                                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                                            // <img className="card-slider_card_image" src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} />
                                            :
                                            <LazyLoadImage
                                                className="card-slider_card_image"
                                                alt="image-not-found"
                                                effect="blur"
                                                wrapperProps={{
                                                    // If you need to, you can tweak the effect transition using the wrapper style.
                                                    style: { transitionDelay: "0.3s" },
                                                }}
                                                src={fallbackImage} />
                                        // <img className="card-slider_card_image" src={fallbackImage} alt="" />
                                    }
                                </Link>
                            </div>
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