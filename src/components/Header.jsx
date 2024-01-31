import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./header.css"

export default function Header() {
    return (
        <header>
            <div className="pc-header">
                <Link className="brand" to="/">BINGEIT</Link>
                <ul>
                    <li>
                        <NavLink>MOVIES</NavLink>
                    </li>
                    <li>
                        <NavLink>TV SHOWS</NavLink>
                    </li>
                </ul>
            </div>
        </header>
    )
}