import React from "react";
import { Link } from "react-router-dom";
import "./header.css"

export default function Header() {
    return (
        <header>
            <Link className="brand" to="/">BingeIt</Link>
        </header>
    )
}