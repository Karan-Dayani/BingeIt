import React, { useState } from "react";
import { getSearchResults } from "../api";
import CardContainer from "../components/CardContainer";

export default function Search() {
    const [searchRes, setSearchRes] = useState([]);

    const handleSearchChange = (event) => {
        const query = event.target.value;
        getSearchResults(query)
            .then(res => {
                setSearchRes(res.results);
            })
            .catch(err => err)
    }

    return (
        <>
            <div className="input-div" style={{display: "flex", justifyContent: "center"}}>
                <input placeholder="Search..." onChange={handleSearchChange} type="text" name="text" className="input" />
            </div>
            <CardContainer data={searchRes} />
        </>
    )
}