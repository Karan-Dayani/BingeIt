import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import "./filter.css"
import { useSearchParams } from "react-router-dom";

export default function Filter({ genres }) {
    const [appliedGenres, setAppliedGenres] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const genreList = searchParams.get('genres')?.split("-").map(id => Number(id))
        if (genreList) {
            setAppliedGenres(genreList)
        }
    },[])
    
    const handleGenreChange = (id) => {
        if(appliedGenres.includes(id)) {
            setAppliedGenres(prev => prev.filter(genreid => genreid !== id));
        } else {
            setAppliedGenres(prev => [...prev, id]);
        }
    }

    const handleConfirm = () => {
        if (appliedGenres.length > 0) {
            setSearchParams({ page: searchParams.get("page"), genres: appliedGenres.join("-") });
        } else {
            setSearchParams({ page: searchParams.get("page") });
        }
        handleClose();
    }

    const handleReset = () => {
        setAppliedGenres([]);
    }

    return (
        <>
            <div className="filter-div">
                <Button style={{ display: "flex", alignItems: "center" }} variant="outline-light" onClick={handleShow}>
                    <FilterListRoundedIcon sx={{ fontSize: 25, paddingRight: 1 }} />
                    Filter
                </Button>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Body style={{ backgroundColor: "var(--primary)" }}>
                    <div className="filter-dialog-div">
                        <h3>Filter</h3>
                        <div className="filter-content-div">
                            {genres?.map((genre, i) => (
                                // <p key={i}>{genre.name}</p>
                                <div key={genre.id} className='select-item'>
                                    <label>
                                        <input
                                            type="checkbox"
                                            className='genre-btn'
                                            checked={appliedGenres.includes(genre.id)}
                                            onChange={() => handleGenreChange(genre.id)}
                                        />
                                        <span>{genre.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="filter-dialog-btn-div">
                            <Button variant="outline-light" onClick={handleReset}>Reset</Button>
                            <Button variant="outline-light" onClick={handleConfirm}>Confirm</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}