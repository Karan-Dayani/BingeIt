import React from 'react';
import "./mycarousel.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

export default function MyCarousel({ data }) {
    return (
        <>
            <Carousel className='carousel' fade indicators={false}>
                {data.map((item) => (
                    <Carousel.Item key={item.id} className='carousel-slide'>
                        <div className='carousel-bg-img-div'>
                            <img className='carousel-image' src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`} alt="" />
                        </div>

                        <Carousel.Caption className='carousel-mob-info'>
                            {item.name ? <h1 className='carousel-info-name'>{item.name}</h1> : <h1 className='carousel-info-name'>{item.title}</h1>}
                        </Carousel.Caption>

                        <div className='carousel-overlay-div'>
                            <div className='carousel-overlay-poster-div'>
                                <img className='carousel-poster' src={`https://image.tmdb.org/t/p/original${item.poster_path}`} alt="" />
                            </div>
                            <div className='carousel-overlay-info-div'>
                                {item.name ? <h1 className='carousel-info-name'>{item.name}</h1> : <h1 className='carousel-info-name'>{item.title}</h1>}
                                {
                                    item.release_date ?
                                        <>
                                            <h2 className='carousel-info-heading'>Release Date</h2>
                                            <p>{item.release_date}</p>
                                        </>
                                        : <></>

                                }
                                <h2 className='carousel-info-heading'>Overview</h2>
                                <p>{item.overview}</p>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}