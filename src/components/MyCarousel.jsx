import React from 'react';
import "./mycarousel.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

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
                            <Link to={`/${item.media_type}/${item.id}`}>
                                <Button variant="light">View More</Button>
                            </Link>
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
                                <Link to={`/${item.media_type}/${item.id}`}>
                                    <Button variant="outline-light">View More</Button>
                                </Link>
                            </div>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    )
}