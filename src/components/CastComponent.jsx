import React from "react";
import "./castcontainer.css";
import fallbackImage from "/assets/images/Image-not-found.png";

export default function CastContainer({ cast }) {
    if (cast.length === 0) {
        return
    }
    cast = cast.slice(0, 9);
    return (
        <>
            <h1>Cast</h1>
            <div className="cast-container">
                {cast.map((person, i) => (
                    <div className="cast" key={i}>
                        <div className="cast-img-div">
                            {
                                person.profile_path ?
                                    <img src={`https://image.tmdb.org/t/p/w500/${person.profile_path}`} alt="" />
                                    :
                                    <img src={fallbackImage} alt="" />
                            }
                        </div>
                        <div>
                            <h5>{person.name}</h5>
                            <p>{person.character}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}