import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import "./filter.css"

export default function Filter({ genres }) {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleGenreChange = (id) => {
        console.log(id)
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
                                            onChange={() => handleGenreChange(genre.id)}
                                        />
                                        <span>{genre.name}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="filter-dialog-btn-div">
                            <Button variant="outline-light">Reset</Button>
                            <Button variant="outline-light">Confirm</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}